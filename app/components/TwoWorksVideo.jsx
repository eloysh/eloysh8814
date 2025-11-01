"use client";
import React from "react";

const vids = [
  {
    id: "review",
    titleMobile: "Послание себе из прошлого",
    titleDesktop: "Видео-отзыв",
    src: "/works/videos/review_01.mp4",
    poster: "/works/videos/review_01_poster.jpg",
  },
  {
    id: "full",
    titleMobile: "Пример полного ролика",
    titleDesktop: "Пример работы",
    src: "/works/videos/full_01.mp4",
    poster: "/works/videos/full_01_poster.jpg",
  },
];

export default function TwoWorksVideo() {
  return (
    <section>
      {/* Мобильный: 9:16, со звуком */}
      <div className="md:hidden grid gap-4">
        {vids.map((v) => (
          <VideoCard
            key={`m-${v.id}`}
            title={v.titleMobile}
            src={v.src}
            poster={v.poster}
            note="Вертикальный формат 9:16"
            muted={false}
            playsInline={true}
          />
        ))}
      </div>

      {/* Десктоп: две карточки, тоже 9:16 */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {vids.map((v) => (
          <VideoCard
            key={`d-${v.id}`}
            title={v.titleDesktop}
            src={v.src}
            poster={v.poster}
            note="Горизонтальный 9:16"
            muted={false}
            playsInline={true}
          />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ title, src, poster, note, muted = false, playsInline = false }) {
  return (
    <figure className="rounded-2xl p-4 bg-white/5 border border-white/10">
      <div className="aspect-[9/16] overflow-hidden rounded-xl">
        <video
          controls
          preload="metadata"
          poster={poster}
          className="w-full h-full block"
          muted={muted}
          playsInline={playsInline}
        >
          <source src={src} type="video/mp4" />
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
