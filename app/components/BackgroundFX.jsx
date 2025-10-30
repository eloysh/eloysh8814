"use client";

export default function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      {/* тёмный градиент по всей странице */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      {/* мягкое светящееся пятно */}
      <div
        className="absolute -top-1/3 left-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, #60a5fa, transparent 70%)" }}
      />
    </div>
  );
}
