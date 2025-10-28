"use client";
export default function BrandLogo({ size=120, withWordmark=false, className="" }) {
  return (
    <div className={className} style={{ width: size, height: size }} aria-label="AI Memories">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#g)" stroke="white" strokeOpacity="0.2" />
        <text x="50" y="57" textAnchor="middle" fontSize="34" fill="white" fontFamily="sans-serif">AM</text>
      </svg>
      {withWordmark && <div className="mt-2 text-center">AI Memories</div>}
    </div>
  );
}
