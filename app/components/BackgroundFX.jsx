"use client";

export default function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Градиентная подложка */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020] via-[#0a0f1c] to-[#060913]" />

      {/* Шумовой слой */}
      <div
        className="absolute inset-0 opacity-[.06] mix-blend-soft-light"
        style={{
          backgroundImage: 'url(/noise.png)', // из public
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px'
        }}
      />

      {/* Мягкое свечение */}
      <div
        className="absolute -inset-40 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 20%, rgba(99,102,241,.35), transparent 60%)'
        }}
      />
    </div>
  );
}
