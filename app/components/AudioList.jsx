"use client";
export default function AudioList({ tracks = [] }) {
  return (
    <div className="grid gap-3">
      {tracks.map((t, i) => (
        <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="font-medium">{t.title}</div>
          <audio className="w-full mt-1" src={t.src} controls preload="none" />
        </div>
      ))}
    </div>
  );
}
