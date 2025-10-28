"use client";
export default function FAQ() {
  const qa = [
    {q:"Сколько времени занимает?",a:"Обычно 3–7 дней."},
    {q:"Можно правки?",a:"Да, до финальной записи."},
    {q:"В каком формате получу?",a:"WAV/MP3, по запросу — stems."}
  ];
  return (
    <div className="grid gap-3">
      {qa.map(i => (
        <details key={i.q} className="rounded-xl bg-white/5 border border-white/10 p-3">
          <summary className="cursor-pointer">{i.q}</summary>
          <div className="text-slate-400 mt-2">{i.a}</div>
        </details>
      ))}
    </div>
  );
}
