"use client";
import React, { useEffect, useRef, useState } from "react";

/** Безопасная видео-карточка с постером по умолчанию */
function VideoCard({ src, poster, title = "", badge = "AI Memories" }) {
  const [posterErr, setPosterErr] = useState(false);
  const safePoster = posterErr ? "/images/og-cover.svg" : poster;

  return (
    <div className="relative aspect-[9/16] rounded-3xl overflow-hidden card-glass">
      <video
        src={src}
        poster={safePoster}
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
        /* на всякий случай, если файла нет — не ломаем верстку */
        onError={(e) => {
          // Если видео не найдено, показываем просто постер
          e.currentTarget.removeAttribute("src");
          e.currentTarget.load();
        }}
      />

      <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
        {badge}
      </div>

      {title && (
        <div className="absolute bottom-0 inset-x-0 text-center text-sm py-2 bg-black/50 backdrop-blur-sm">
          {title}
        </div>
      )}

      {/* если постер сломан — подменяем на дефолт */}
      {/* img, чтобы поймать onError — видео не даёт события про постер */}
      {poster && (
        <img
          src={poster}
          alt=""
          className="hidden"
          onError={() => setPosterErr(true)}
        />
      )}
    </div>
  );
}

/** Секция с двумя видео. Гарантированно делает reveal->show на маунте */
export default function TwoWorksVideo() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // если у тебя есть класс .reveal {opacity:0;...} — принудительно «покажем»
    el.classList.add("show");
  }, []);

  return (
    <section ref={rootRef} className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Видео-отзыв и пример работы
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto">
       
        <VideoCard
          src="/works/videos/review_01.mp4"
          poster="/works/videos/review_01_poster.jpg"
          title="Пример работы"
        />
         <VideoCard
          src="/works/videos/full_01.mp4"
          poster="/works/videos/full_01_poster.jpg"
          title="Видео-отзыв"
        />
      </div>

      <noscript>
        Включите JavaScript, чтобы просматривать видео.
      </noscript>
    </section>
  );
}

export { TwoWorksVideo };
