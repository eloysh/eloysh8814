"use client";
import React from "react";

export default function ContactForm() {
  return (
    <form className="max-w-xl mx-auto grid gap-4 p-4 rounded-2xl card-glass">
      <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Ваше имя" />
      <input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Телефон или WhatsApp" />
      <textarea className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" rows={4} placeholder="Опишите задачу" />
      <button type="submit" className="px-4 py-2 rounded-lg bg-sky-500/90 hover:bg-sky-500 transition">
        Отправить
      </button>
    </form>
  );
}
