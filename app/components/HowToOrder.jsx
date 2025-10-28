"use client";
import React from "react";

function Row({ title, text }) {
  return (
    <div className="rounded-2xl card-glass p-5">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-300 mt-1">{text}</div>
    </div>
  );
}

export default function HowToOrder() {
  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Как заказать</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Row
          title="1) Напишите нам"
          text="Самый быстрый способ — WhatsApp. Клик по кнопке ниже откроет диалог с предзаполненным сообщением."
        />
        <Row
          title="2) Бриф и бюджет"
          text="Отправим короткий бриф, согласуем длительность, референсы и бюджет."
        />
        <Row
          title="3) Черновик за 24–72 часа"
          text="Присылаем черновой вариант. Вносите правки — двигаемся к финалу."
        />
        <Row
          title="4) Финал и файлы"
          text="Отдаём мастер-трек + версии под соцсети/рекламу. По запросу — исходники."
        />
      </div>

      <div className="text-center mt-6">
        <a
          href="https://wa.me/79841933792?text=Хочу%20заказать%20песню%20для%20видео"
          className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-emerald-500/90 hover:bg-emerald-500 transition text-white font-medium"
        >
          Написать в WhatsApp
        </a>
      </div>
    </section>
  );
}

export { HowToOrder };
