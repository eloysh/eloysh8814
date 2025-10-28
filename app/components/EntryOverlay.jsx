"use client";
import { useEffect } from "react";

export default function EntryOverlay({ auto = true, autoDelay = 800, onEnter = () => {} , audioSrc="/sounds/enter.wav"}) {
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => {
      try { localStorage.setItem("entered","1"); } catch {}
      onEnter();
      try {
        const a = new Audio(audioSrc);
        a.volume = 0.9;
        a.play().catch(()=>{});
      } catch {}
    }, autoDelay);
    return () => clearTimeout(t);
  }, [auto, autoDelay, onEnter, audioSrc]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur">
      <div className="text-center space-y-4">
        <div className="text-3xl font-semibold">AI Memories</div>
        <div className="text-slate-300">Готовим для вас волшебство…</div>
        <div className="flex items-center gap-3 justify-center">
          <button
            className="btn btn-primary"
            onClick={() => { try { localStorage.setItem("entered","1"); } catch {}; onEnter(); }}
          >Войти</button>
          <button className="btn" onClick={onEnter}>Пропустить</button>
        </div>
      </div>
    </div>
  );
}
