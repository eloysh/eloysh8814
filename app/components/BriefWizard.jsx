"use client";
import { useState, useMemo } from "react";
import WhatsAppButton from "./WhatsAppButton";

const steps = [
  { key: "name", label: "Имя героя песни", placeholder: "Марина, папа, бабушка..." },
  { key: "relation", label: "Кто он/она для вас", placeholder: "мама, любимый человек, друг..." },
  { key: "traits", label: "Главные качества", placeholder: "добрый, мудрый, весёлый..." },
  { key: "special", label: "Особенные черты/фишки", placeholder: "любит шутить, печёт пирожки..." },
  { key: "story", label: "Что пережили вместе", placeholder: "важное событие, поддержка..." },
  { key: "thanks", label: "За что благодарны", placeholder: "любовь, терпение, поддержку..." },
  { key: "mood", label: "Какое чувство передать", placeholder: "любовь, гордость, ностальгия..." },
  { key: "style", label: "Стиль и жанр", placeholder: "лирическая, поп-баллада, авторская..." },
];

export default function BriefWizard() {
  const [i, setI] = useState(0);
  const [data, setData] = useState(Object.fromEntries(steps.map(s=>[s.key,""])));

  const done = useMemo(()=>i>=steps.length, [i]);

  const text = useMemo(()=>{
    return [
      "Бриф на песню:",
      ...steps.map(s => s.label + ": " + (data[s.key]||"-"))
    ].join("\n");
  }, [data]);

  if (done) {
    return (
      <div className="card-glass p-6">
        <h3 className="text-xl font-semibold mb-2">Готово!</h3>
        <p className="text-slate-300 mb-4">Отправьте бриф в WhatsApp, и я свяжусь с вами.</p>
        <WhatsAppButton text={text} />
      </div>
    );
  }

  const s = steps[i];
  return (
    <div className="card-glass p-6">
      <div className="text-sm text-slate-300 mb-2">Шаг {i+1} из {steps.length}</div>
      <label className="block font-medium">{s.label}</label>
      <textarea
        className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-sky-500"
        rows={4}
        placeholder={s.placeholder}
        value={data[s.key]}
        onChange={e=>setData(v=>({ ...v, [s.key]: e.target.value }))}
      />
      <div className="mt-4 flex justify-between">
        <button className="btn-ghost" onClick={()=>setI(Math.max(0, i-1))} disabled={i===0}>← Назад</button>
        <button className="btn-primary" onClick={()=>setI(i+1)}>Далее →</button>
      </div>
    </div>
  );
}
