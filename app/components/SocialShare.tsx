"use client";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  url?: string;
  text?: string;
  utm?: string;
  compact?: boolean;
  className?: string;
  /** Включи, если ХОЧЕШЬ использовать текущий адрес окна на клиенте (может дать расхождение в dev) */
  useCurrentUrl?: boolean;
};

const BTN =
  "px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition";

/**
 * По умолчанию берём домен из NEXT_PUBLIC_SITE_URL — это стабильно и совпадает на сервере и клиенте.
 * Если нужно именно текущее окно (например, для шеринга подстраниц), передай useCurrentUrl={true}
 * — тогда на клиенте после гидратации URL обновится.
 */
export default function SocialShare({
  url,
  text = "AI Memories — оживление фото и песни на заказ",
  utm = "utm_source=social&utm_medium=share&utm_campaign=site",
  compact = false,
  className = "",
  useCurrentUrl = false,
}: Props) {
  const HOST =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://aimemories.ru";

  // Стабильное начальное значение и (опционально) обновление на клиенте
  const [base, setBase] = useState<string>(url || HOST);

  useEffect(() => {
    if (url) {
      setBase(url);
    } else if (useCurrentUrl && typeof window !== "undefined") {
      setBase(window.location.href);
    } else {
      setBase(HOST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, useCurrentUrl]);

  const shareUrl = useMemo(() => {
    try {
      const u = new URL(base);
      if (utm) {
        utm.split("&").forEach((p) => {
          const [k, v] = p.split("=");
          if (k && v && !u.searchParams.has(k)) u.searchParams.set(k, v);
        });
      }
      return u.toString();
    } catch {
      return base;
    }
  }, [base, utm]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(text);

  const share = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: "AI Memories",
          text,
          url: shareUrl,
        });
        return;
      } catch {
        // Игнорируем cancel
      }
    }
    // fallback — Telegram
    window.open(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className={`flex items-center justify-center flex-wrap ${
        compact ? "gap-2" : "gap-3"
      } ${className}`}
    >
      <button type="button" className={BTN} onClick={share} aria-label="Поделиться">
        Поделиться
      </button>
      {/* suppressHydrationWarning — на случай, если URL обновится после гидратации при useCurrentUrl */}
      <a
        className={BTN}
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noreferrer"
        suppressHydrationWarning
      >
        Telegram
      </a>
      <a
        className={BTN}
        href={`https://wa.me/?text=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        suppressHydrationWarning
      >
        WhatsApp
      </a>
      <a
        className={BTN}
        href={`https://vk.com/share.php?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        suppressHydrationWarning
      >
        VK
      </a>
    </div>
  );
}
