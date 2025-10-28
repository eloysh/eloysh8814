"use client";
import React from "react";

/** Лёгкий градиентный фон. Не мешает кликам и не перекрывает контент. */
export default function BackgroundFX({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 opacity-40 ${className}`}
    >
      <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />
    </div>
  );
}
