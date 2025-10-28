"use client";
import React from "react";

function KPI({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="reveal">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        Сколько уже сделано
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
        <KPI value="1200+" label="оживлённых фото" />
        <KPI value="350+"  label="смонтированных роликов" />
        <KPI value="98%"   label="довольных клиентов" />
      </div>
    </section>
  );
}

export { Stats };
