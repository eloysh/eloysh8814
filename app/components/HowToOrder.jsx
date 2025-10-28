"use client";

import React from "react";

const steps = [
  {
    n: 1,
    title: "Напишите в WhatsApp",
    text:
      "Кликните по кнопке — пришлите пару слов о задаче и ссылку на видео/референсы.",
    action: {
      label: "Открыть WhatsApp",
      href: "https://wa.me/79841933792?text=Здравствуйте!%20Нужна%20песня%20для%20видео%20(описание%20задачи)…",
    },
  },
  {
    n: 2,
    title: "Утверждаем ТЗ",
    text:
      "За 5–10 минут уточняем цель, жанр, длительность, сроки и формат отдачи. Фиксируем стоимость.",
  },
  {
    n: 3,
    title: "Аванс и работа",
    text:
      "Вносите 30% аванса — запускаем продакшн. Присылаем превью и вносим правки до финала.",
  },
  {
    n: 4,
    title: "Финал и материалы",
    text:
      "После оплаты отправляем WAV/MP3 + стемы (по запросу), версии под соцсети и акт выполненных работ.",
  },
];

function HowToOrder() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((s) => (
        <div
          key={s.n}
          className="rounded-2xl p-6 card-glass border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-300">
              {s.n}
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
          </div>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">{s.text}</p>
          {"action" in s && s.action && (
            <a
              href={s.action.href}
              className="inline-flex mt-4 items-center justify-center px-4 py-2 rounded-xl bg-sky-500/80 hover:bg-sky-500 text-white text-sm transition"
            >
              {s.action.label}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default HowToOrder;
export { HowToOrder };
