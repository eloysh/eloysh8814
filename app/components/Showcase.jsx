"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

/** Безопасная картинка с фолбэком */
function ImgFallback({ src, fallback = "/images/og-cover.svg", alt = "", className = "" }) {
  const [err, setErr] = useState(false);
  const s = err ? fallback : src;
  return <img src={s} alt={alt} className={className} onError={() => setErr(true)} />;
}

/** Контейнер фиксированного соотношения сторон */
function Frame({ ratio = "1/1", className = "", children }) {
  return (
    <div className={className} style={{ aspectRatio: ratio }}>
      {children}
    </div>
  );
}

/** Слайдер До/После (картинка/видео) со звуком */
function Slider({
  before = "/images/demo_before.svg",
  after = "/images/demo_after.svg",
  afterVideo,            // опционально
  afterPoster,           // опционально
  beforeAlt = "До",
  afterAlt = "После",
  ratio = "1/1",
  label,
}) {
  const [x, setX] = useState(50);      // процент разделителя
  const [videoError, setVideoError] = useState(false);
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);

  const onMove = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setX(pct);
  }, []);

  useEffect(() => {
    const up = () => (draggingRef.current = false);
    const move = (e) => {
      if (!draggingRef.current) return;
      if (e.touches?.[0]) onMove(e.touches[0].clientX);
      else onMove(e.clientX);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: false });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, [onMove]);

  return (
    <div className="space-y-2">
      <div ref={wrapRef} className="relative group rounded-2xl overflow-hidden card-glass select-none">
        <Frame ratio={ratio}>
          {/* слой ДО */}
          <ImgFallback src={before} alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover" />

          {/* слой ПОСЛЕ (клип по маске) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
            {afterVideo && !videoError ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={afterVideo}
                poster={afterPoster || after}
                playsInline              // iOS: остаёмся в странице
                controls                 // звук доступен пользователю
                preload="metadata"
                onError={() => setVideoError(true)}
              />
            ) : (
              <ImgFallback src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>

          {/* бегунок */}
          <div
            className="absolute inset-y-0"
            style={{ left: `${x}%`, transform: "translateX(-50%)`" }}
            onMouseDown={(e) => { draggingRef.current = true; onMove(e.clientX); }}
            onTouchStart={(e) => { draggingRef.current = true; if (e.touches[0]) onMove(e.touches[0].clientX); }}
            role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(x)} tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft")  setX((v) => Math.max(0, v - 2));
              if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 2));
            }}
          >
            <div className="h-full w-px bg-white/60 shadow-[0_0_0_1px_rgba(255,255,255,.6)]" />
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-white/80 border border-white/60" />
          </div>

          {/* подписи */}
          <div className="absolute left-3 top-3 text-xs font-medium bg-black/40 px-2 py-1 rounded">{beforeAlt}</div>
          <div className="absolute right-3 top-3 text-xs font-medium bg-black/40 px-2 py-1 rounded">{afterAlt}</div>
        </Frame>
      </div>

      {label && <div className="text-sm text-slate-300">{label}</div>}
    </div>
  );
}

export default function Showcase() {
  // === твои данные ===
  const items = [
    { before: "/works/01_before.jpg", after: "/works/01_after.jpg", label: "Цветная фотография", beforeAlt: "До", afterAlt: "После" },
    { before: "/works/02_before.jpg", after: "/works/02_after.jpg", label: "Улучшение качества фотографии", beforeAlt: "До", afterAlt: "После" },
    { before: "/works/03_before.jpg", after: "/works/03_after.jpg", label: "Смена эмоций на фотографии", beforeAlt: "До", afterAlt: "После" },
    { before: "/works/04_before.jpg", after: "/works/04_after.jpg", label: "Реставрация старых фотографий", beforeAlt: "До", afterAlt: "После" },
    { before: "/works/05_before.jpg", after: "/works/05_after.jpg", label: "Как выглядело бы фото сегодня", beforeAlt: "До", afterAlt: "После" },
    { before: "/works/011_before.jpg", after: "/works/011_after.jpg", label: "Реставрация старого снимка", beforeAlt: "До", afterAlt: "После" },
  ];

  const vertical = [
    {
      before: "/works/talk_before.jpg",
      after: "/works/talk_after.jpg",
      afterVideo: "/works/talk_after.mp4",
      afterPoster: "/works/talk_after_poster.jpg",
      label: "Послание себе из прошлого. Оживление фото.",
      beforeAlt: "До",
      afterAlt: "После",
    },
    {
      before: "/works/06_before.jpg",
      after: "/works/06_after.jpg",
      afterVideo: "/works/06_after.mp4",
      afterPoster: "/works/06_after_poster.jpg",
      label: "Оживление фотографии и эмоций",
      beforeAlt: "До",
      afterAlt: "После",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 grid gap-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">До/После</h2>

      {/* Горизонтальные примеры */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <Slider
            key={`h-${i}`}
            before={it.before}
            after={it.after}
            beforeAlt={it.beforeAlt}
            afterAlt={it.afterAlt}
            label={it.label}
            ratio="1/1"
          />
        ))}
      </div>

      {/* Вертикальные (мобильные) примеры с ВИДЕО СО ЗВУКОМ */}
      {vertical.length > 0 && (
        <>
          <h3 className="text-xl md:text-2xl font-semibold text-center">Вертикальные / мобильные</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {vertical.map((it, i) => (
              <Slider
                key={`v-${i}`}
                before={it.before}
                after={it.after}
                afterVideo={it.afterVideo}
                afterPoster={it.afterPoster}
                beforeAlt={it.beforeAlt}
                afterAlt={it.afterAlt}
                label={it.label}
                ratio="9/16"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
