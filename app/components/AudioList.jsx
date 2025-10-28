"use client";
import React from "react";

export default function AudioList({ tracks = [] }) {
  return (
    <div className="grid gap-3">
      {tracks.map((t) => (
        <div
          key={t.src}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="font-medium mb-2">{t.title}</div>
          <audio controls src={t.src} className="w-full" />
        </div>
      ))}
    </div>
  );
}
