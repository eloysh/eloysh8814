"use client";
import React, { useEffect, useState } from "react";

function useCounter(target, durationMs = 800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let t = 0;
    const steps = Math.max(16, Math.floor(durationMs / 16));
    const inc = target / steps;
    const id = setInterval(() => {
      t++;
      setN((v) => (t >= steps ? target : Math.round(v + inc)));
      if (t >= steps) clearInterval(id);
    }, 16);

    // «живой» прирост +1 каждые 60 сек
    const live = setInterval(() => setN((v) => v + 1), 60000);
    return () => { clearInterval(id); clearInterval(live); };
  }, [target, durationMs]);
  return n;
}

function KPI({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">{value.toLocaleString("ru-RU")}+</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

export default function Stats() {
  const photos = useCounter(250);
  const videos = useCounter(140);
  const happy  = useCounter(74);

  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Сколько уже сделано</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
        <KPI value={photos} label="оживлённых фото" />
        <KPI value={videos} label="смонтированных роликов" />
        <KPI value={happy}  label="довольных клиентов" />
      </div>
    </section>
  );
}
