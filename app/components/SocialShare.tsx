"use client";
import React from "react";

export default function SocialShare() {
  const url = typeof window !== "undefined" ? window.location.href : "https://aimemories.ru";
  const text = encodeURIComponent("AI Memories — оживление фото и песни на заказ");
  return (
    <div className="flex items-center justify-center gap-3">
      <a className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`} target="_blank" rel="noreferrer">Telegram</a>
      <a className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" href={`https://vk.com/share.php?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">VK</a>
    </div>
  );
}
