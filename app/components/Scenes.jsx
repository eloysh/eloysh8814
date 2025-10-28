"use client";
import React from "react";

function Step({ n, title, text }) {
  return (
    <div className="rounded-2xl card-glass p-5 flex gap-4 items-start">
      <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sm font-semibold">
        {n}
      </div>
      <div>
        <div className="font-medium text-base">{title}</div>
        <div className="text-sm text-slate-300 mt-1">{text}</div>
      </div>
    </div>
  );
}

export default function Scenes() {
  const steps = [
    {
      title: "Бриф",
      text:
        "Заполняете короткий бриф: зачем музыка, длительность, настроение, примеры. Мы уточняем детали в WhatsApp.",
    },
    {
      title: "Черновая идея",
      text:
        "Присылаем 1–2 эскиза мелодии и референс аранжировки. Выбираете направление, вносим правки.",
    },
    {
      title: "Аранжировка и вокал",
      text:
        "Собираем полноценный трек (интро, куплет, припев), накладываем вокал/бэки по задаче.",
    },
    {
      title: "Сведение и мастеринг",
      text:
        "Чистим шумы, балансируем инструменты, делаем финальный мастер под ваш формат (mp3/wav).",
    },
    {
      title: "Доставка",
      text:
        "Отправляем файл(ы) и версии под соцсети/рекламу. По запросу — исходники и безвокальная версия.",
    },
  ];

  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Процесс создания</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Step key={i} n={i + 1} title={s.title} text={s.text} />
        ))}
      </div>
    </section>
  );
}

export { Scenes };
