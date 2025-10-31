"use client";
import React from "react";

function VideoCard({ src, poster, title = "", badge = "AI Memories" }) {
  return (
    <div className="relative aspect-[9/16] rounded-3xl overflow-hidden card-glass">
      <video
        src={src}
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        controls
        playsInline
      />
      <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
        {badge}
      </div>
      {title && (
        <div className="absolute bottom-0 inset-x-0 text-center text-sm py-2 bg-black/50 backdrop-blur-sm">
          {title}
        </div>
      )}
    </div>
  );
}

export default function TwoWorksVideo() {
  return (
    <section className="reveal">
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
    </section>
  );
}
