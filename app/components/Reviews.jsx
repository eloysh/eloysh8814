"use client";
import React, { useState } from "react";

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#7c3aed"/>
        </linearGradient>
      </defs>
      <rect width="320" height="320" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial" font-size="18">AI Memories</text>
    </svg>`
  );

function ImgFallback({ src, alt = "", className = "" }) {
  const [err, setErr] = useState(false);
  const s = !src || err ? FALLBACK : src;
  return <img src={s} alt={alt} className={className} onError={() => setErr(true)} loading="lazy" />;
}

function ReviewCard({ name, role, text, img, date, rating = 5 }) {
  return (
    <div className="rounded-2xl card-glass p-5 flex flex-col gap-3 shrink-0 w-[85vw] sm:w-auto">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10">
          <ImgFallback src={img} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-medium leading-tight">{name}</div>
          <div className="text-xs text-slate-300">
            {role}
            {date ? ` • ${date}` : ""}
          </div>
        </div>
      </div>
      <div className="text-sm text-slate-200">{text}</div>
      <div className="text-yellow-400" aria-label={`Оценка ${rating} из 5`}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
    </div>
  );
}

export default function Reviews() {
  const items = [
    {
      name: "Анна К.",
      role: "Свадебный клип",
      text: "Сделали песню с нуля под наш клип — получилось трогательно и в срок!",
      img: "/reviews/anna.jpg",
      date: "июнь 2025",
      rating: 5,
    },
    {
      name: "Студия «Маркет+»",
      role: "Реклама",
      text: "Нужен был короткий саундтрек — попали в тон. CTR вырос.",
      img: "/reviews/market.jpg",
      date: "май 2025",
      rating: 5,
    },
    {
      name: "Игорь С.",
      role: "YouTube",
      text: "Титульная заставка звучит мощно. Спасибо!",
      img: "/reviews/igor.jpg",
      date: "апрель 2025",
      rating: 5,
    },
  ];

  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Отзывы</h2>

      <div className="block sm:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          {items.map((r, i) => (
            <div key={i} className="snap-center">
              <ReviewCard {...r} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
      </div>
    </section>
  );
}
