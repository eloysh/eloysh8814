"use client";
import React from "react";

/** Файлы положи в:
 * public/works/videos/review_01.mp4
 * public/works/videos/review_01.webm   (по желанию, как fallback)
 * public/works/videos/review_01_poster.jpg
 * public/works/videos/full_01.mp4
 * public/works/videos/full_01.webm     (по желанию)
 * public/works/videos/full_01_poster.jpg
 */

export default function TwoWorksVideo() {
  return (
    <section>
      {/* Мобильный вертикальный блок — виден только на мобилке */}
      <div className="md:hidden grid gap-4">
        <VideoCard
          title="Послание себе из прошлого"
          note="Вертикальный формат 9:16"
          aspect="mobile"
          sources={[
            { src: "/works/videos/review_01.webm", type: "video/webm" },
            { src: "/works/videos/review_01.mp4",  type: "video/mp4"  },
          ]}
          poster="/works/videos/review_01_poster.jpg"
        />
        <VideoCard
          title="Пример полного ролика"
          note="Вертикальный формат 9:16"
          aspect="mobile"
          sources={[
            { src: "/works/videos/full_01.webm", type: "video/webm" },
            { src: "/works/videos/full_01.mp4",  type: "video/mp4"  },
          ]}
          poster="/works/videos/full_01_poster.jpg"
        />
      </div>

      {/* Десктопная сетка — видна только на md+ */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <VideoCard
          title="Пример работы"
        
          aspect="desktop"
          sources={[
            { src: "/works/videos/review_01.webm", type: "video/webm" },
            { src: "/works/videos/review_01.mp4",  type: "video/mp4"  },
          ]}
          poster="/works/videos/review_01_poster.jpg"
        />
        <VideoCard
          title="Видео-отзыв"
          
          aspect="desktop"
          sources={[
            { src: "/works/videos/full_01.webm", type: "video/webm" },
            { src: "/works/videos/full_01.mp4",  type: "video/mp4"  },
          ]}
          poster="/works/videos/full_01_poster.jpg"
        />
      </div>
    </section>
  );
}

function VideoCard({ title, note, poster, sources, aspect = "desktop" }) {
  // aspect: "mobile" => 9/16, "desktop" => 16/9
  const aspectClass = aspect === "mobile" ? "aspect-[9/16]" : "aspect-video";

  return (
    <figure className="rounded-2xl p-4 bg-white/5 border border-white/10">
      <div className={`${aspectClass} overflow-hidden rounded-xl`}>
        <video
          controls               /* по тапу со звуком */
          preload="metadata"
          poster={poster}
          className="w-full h-full block"
          playsInline            /* iOS inline */
          webkit-playsinline="true"
          x5-playsinline="true" /* WeChat/MIUI */
        >
          {sources.map(s => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          Ваш браузер не поддерживает видео.
        </video>
      </div>
      <figcaption className="text-sm mt-2">
        <div className="text-slate-100 font-medium">{title}</div>
        <div className="text-slate-400">{note}</div>
      </figcaption>
    </figure>
  );
}
