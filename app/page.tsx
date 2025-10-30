// app/page.tsx
"use client";
import React, { useEffect } from "react";

import SEOJsonLd from "./components/SEOJsonLd";
import BackgroundFX from "./components/BackgroundFX";
import BeforeAfterHero from "./components/BeforeAfterHero";
import Showcase from "./components/Showcase";
import TwoWorksVideo from "./components/TwoWorksVideo";
import Songs from "./components/Songs";          // <- используем Songs
import WhatsAppButton from "./components/WhatsAppButton";
import Stats from "./components/Stats";
import Scenes from "./components/Scenes";
import Calculator from "./components/Calculator";
import Pricing from "./components/Pricing";

import HowToOrder from "./components/HowToOrder";
import FAQ from "./components/FAQ";
import BrandLogo from "./components/BrandLogo";

export default function Page() {
  // Плавное появление секций
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // JSON-LD
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AI Memories",
      url: base,
      logo: base + "/opengraph-image.jpg",
      sameAs: [base],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: base,
      name: "AI Memories",
      potentialAction: {
        "@type": "SearchAction",
        target: base + "/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Оживление фото в видео / Песня на заказ / Реставрация фото",
      areaServed: "RU",
      provider: { "@type": "LocalBusiness", name: "AI Memories" },
      url: base,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <SEOJsonLd data={schema} />
      <BackgroundFX />

      <section className="container py-16 space-y-16">
        {/* Hero */}
        <header className="text-center reveal">
          <BrandLogo size={160} withWordmark />
          <p className="text-slate-700 mt-4 max-w-2xl mx-auto">
            Оживлю ваши фото и соберу трогательное видео-историю. Бесплатный тест — «Оживить фото».
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <WhatsAppButton />
            <a className="btn-ghost" href="/animate">Оживить фото бесплатно</a>
          </div>
        </header>

        {/* До/После */}
        <div className="mx-auto mt-8 w-full max-w-6xl reveal">
          <BeforeAfterHero
            before="/works/hero_before.jpg"
            after="/works/hero_after.jpg"
            afterVideo="/works/hero_after.mp4"
          />
        </div>

        {/* Кейсы/шоукейс */}
        <div className="reveal">
          <Showcase />
        </div>

        {/* Мобилка: 2 вертикальных ролика рядом */}
        <div className="reveal md:hidden">
          <TwoWorksVideo />
        </div>

        {/* ПК: одиночный ролик 9:16 */}
        <section className="reveal hidden md:block">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Пример работы</h2>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[420px] max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-black/30">
            <video
              className="absolute inset-0 w-full h-full object-contain bg-black"
              src="/works/videos/review_01.mp4"
              poster="/works/videos/review_01_poster.jpg"
              controls
              playsInline
            />
            <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
              AI Memories
            </div>
          </div>
        </section>

        {/* Песни / аудио-примеры */}
        <Songs />  {/* <- простой вызов, без пропов */}

        {/* Остальные блоки */}
        <Stats />
        <Scenes />
        <Calculator />
        <Pricing />
    
        <HowToOrder />
        <FAQ />

        {/* Футер */}
        <footer className="text-slate-600 reveal pt-8 pb-16 text-center">
          <p>Почта: <a className="text-sky-700" href="mailto:info@aimemories.ru">info@aimemories.ru</a></p>
          <p>WhatsApp: <a className="text-sky-700" href="https://wa.me/79841933792">+7 984 193-37-92</a></p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</p>
        </footer>
      </section>
    </div>
  );
}
