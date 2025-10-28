"use client";
export default function Pricing() {
  const rows = [
    {name:"Мини-ролик (до 10 фото)",price:"4 500 ₽",note:"оживление + монтаж + улучшение фото"},
    {name:"Полноценный ролик (10+ фото)",price:"от 8 000 ₽",note:"песня, монтаж, улучшение фото"},
    {name:"Песня на заказ",price:"от 2 500 ₽",note:"текст, музыка, аранжировка, запись"}
  ];
  return (
    <div className="grid gap-3">
      {rows.map(r => (
        <div key={r.name} className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.name}</div>
            <div className="text-sky-300">{r.price}</div>
          </div>
          <div className="text-slate-400 text-sm mt-1">{r.note}</div>
        </div>
      ))}
    </div>
  );
}
