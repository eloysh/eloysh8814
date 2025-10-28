"use client";
import { useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

export default function ContactForm() {
  const [state, setState] = useState({ name: "", phone: "", email: "", message: "", budget: "" });
  const [sent, setSent] = useState(false);

  const body = () => {
    return [
      `Имя: ${state.name || "-"}`,
      `Телефон: ${state.phone || "-"}`,
      `Email: ${state.email || "-"}`,
      `Бюджет: ${state.budget || "-"}`,
      "Сообщение:",
      state.message || "-",
    ].join("\n");
  };

  const submit = (e) => {
    e.preventDefault();
    // open whatsapp with prefilled message (no backend)
    setSent(true);
  };

  return (
    <div className="card-glass p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-2">Заказать песню / связаться</h3>
      {!sent ? (
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input aria-label="Ваше имя" className="p-3 rounded-xl bg-white/5 border border-white/10" placeholder="Ваше имя" value={state.name} onChange={e=>setState(s=>({ ...s, name: e.target.value }))} />
            <input aria-label="Телефон" className="p-3 rounded-xl bg-white/5 border border-white/10" placeholder="Телефон" value={state.phone} onChange={e=>setState(s=>({ ...s, phone: e.target.value }))} />
          </div>
          <input aria-label="Email" className="w-full p-3 rounded-xl bg-white/5 border border-white/10" placeholder="Email (по желанию)" value={state.email} onChange={e=>setState(s=>({ ...s, email: e.target.value }))} />
          <input aria-label="Бюджет" className="w-full p-3 rounded-xl bg-white/5 border border-white/10" placeholder="Бюджет (от)" value={state.budget} onChange={e=>setState(s=>({ ...s, budget: e.target.value }))} />
          <textarea aria-label="Сообщение" className="w-full p-3 rounded-xl bg-white/5 border border-white/10" rows={4} placeholder="Коротко о заказе / истории" value={state.message} onChange={e=>setState(s=>({ ...s, message: e.target.value }))} />

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="btn-primary w-full sm:w-auto">Отправить в WhatsApp</button>
            <WhatsAppButton text={body()} className="w-full sm:w-auto" />
          </div>
        </form>
      ) : (
        <div>
          <div className="font-medium">Готово — спасибо!</div>
          <div className="text-slate-300 mt-2">Я свяжусь с вами в ближайшее время. Вы также можете отправить бриф вручную.</div>
          <div className="mt-3">
            <WhatsAppButton text={body()} />
          </div>
        </div>
      )}
    </div>
  );
}
