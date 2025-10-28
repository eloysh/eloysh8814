"use client";
import { useEffect, useRef, useState } from "react";

export default function BeforeAfterHero({
  before = "/works/hero_before.jpg",
  after = "/works/hero_after.jpg",
  afterVideo = "/works/hero_after.mp4",
  aspectClass = "aspect-[21/9]",
}) {
  const boxRef = useRef(null);
  const [x, setX] = useState(50);
  const [drag, setDrag] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  // Pointer Events для десктопа и мобильных
  useEffect(() => {
    if (!boxRef.current) return;
    
    const onMove = (e) => {
      if (!drag) return;
      e.preventDefault();
      const box = boxRef.current.getBoundingClientRect();
      const px = Math.max(0, Math.min(100, ((e.clientX - box.left) / box.width) * 100));
      setX(px);
    };
    
    const onUp = () => setDrag(false);
    
    if (drag) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }
  }, [drag]);

  return (
    <div className="card-glass">
      <div 
        ref={boxRef}
        className={`relative select-none ${aspectClass} rounded-2xl overflow-hidden bg-slate-900`}
        onPointerDown={(e) => {
          const box = boxRef.current.getBoundingClientRect();
          setX(((e.clientX - box.left) / box.width) * 100);
          setDrag(true);
        }}
      >
        {/* After (правая часть) */}
        <div className="absolute inset-0 select-none">
          {videoOk && afterVideo ? (
            <video
              src={afterVideo}
              poster={after}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoOk(false)}
            />
          ) : (
            <img src={after} className="w-full h-full object-cover" alt="После" />
          )}
        </div>

        {/* Before (левая часть) */}
        <div 
          className="absolute inset-0 select-none"
          style={{ clipPath: `inset(0 ${100-x}% 0 0)` }}
        >
          <img src={before} className="w-full h-full object-cover" alt="До" />
        </div>

        {/* Слайдер */}
        <div 
          className="absolute inset-y-0 select-none"
          style={{ left: `${x}%` }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDrag(true);
          }}
        >
          <div className="absolute inset-y-4 w-1 bg-white rounded-full shadow-lg" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg grid place-items-center cursor-ew-resize">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-600">
              <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
