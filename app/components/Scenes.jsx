"use client";
import React from "react";

const steps = [
  {
    title: "Бриф",
    desc: "Опишите задачу: цель, жанр, настроение, длительность, где будет использоваться трек.",
    tag: "Шаг 1",
    time: "10–15 минут",
    icon: "📝",
  },
  {
    title: "Черновая идея",
    desc: "Подбираем тональность/темп, эскиз мелодии/бит. Утверждаем направление.",
    tag: "Шаг 2",
    time: "24–48 часов",
    icon: "🎼",
  },
  {
    title: "Продакшн",
    desc: "Аранжировка, текст (если нужен), запись. Присылаем превью, учитываем правки.",
    tag: "Шаг 3",
    time: "2–5 дней",
    icon: "🎙️",
  },
  {
    title: "Сведение и сдача",
    desc: "Микс/мастер. Отдаём WAV/MP3 + стемы (по запросу), версии под соцсети.",
    tag: "Шаг 4",
    time: "до 1 дня",
    icon: "✅",
  },
];

export default function Scenes() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 card-glass border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm px-2 py-1 rounded bg-white/10">{s.tag}</div>
            <div className="text-lg" aria-hidden>{s.icon}</div>
          </div>
          <h3 className="text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">{s.desc}</p>
          {s.time && (
            <div className="mt-3 text-xs text-slate-400">Срок: {s.time}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export { Scenes };
