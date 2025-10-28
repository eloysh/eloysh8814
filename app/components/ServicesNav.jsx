"use client";
export default function ServicesNav() {
  const items = ["Песня на заказ", "Саундтрек", "Озвучка", "Монтаж видео"];
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(t => (
        <span key={t} className="px-3 py-1 rounded-full bg-white/10 border border-white/20">{t}</span>
      ))}
    </div>
  );
}
