// app/components/BackgroundFX.jsx
"use client";

export default function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 to-slate-950">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 50% 0%, rgba(56, 189, 248, .25), transparent 70%)",
        }}
      />
    </div>
  );
}
