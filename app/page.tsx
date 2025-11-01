"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SocialShare from "./components/SocialShare";

import BackgroundFX from "./components/BackgroundFX";
import WhatsAppButton from "./components/WhatsAppButton";
import SEOJsonLd from "./components/SEOJsonLd";
import BrandLogo from "./components/BrandLogo";
import ServicesNav from "./components/ServicesNav";
import Pricing from "./components/Pricing";
import Stats from "./components/Stats";
import HowToOrder from "./components/HowToOrder";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import BeforeAfterHero from "./components/BeforeAfterHero";

/** ТЯЖЁЛЫЕ блоки — dynamic */
const TwoWorksVideo = dynamic(() => import("./components/TwoWorksVideo"), {
  ssr: false,
  loading: () => <div className="text-center text-slate-400">Загружаем видео…</div>,
});
const Showcase = dynamic(() => import("./components/Showcase"), {
  ssr: false,
  loading: () => <div className="text-center text-slate-400">Загружаем кейсы…</div>,
});
 const Songs = dynamic(() => import("./components/Songs"), {
  ssr: false,
  loading: () => <div className="text-center text-slate-400">Загружаем песни…</div>,
});



const Scenes = dynamic(() => import("./components/Scenes"), {
  ssr: false,
  loading: () => <div className="text-center text-slate-400">Загружаем процесс…</div>,
});

/** ФОРМЫ — СИНХРОННО (для стабильной работы на мобилках) */
import BriefWizard from "./components/BriefWizard";
import Calculator from "./components/Calculator";

/** Простой хук определения мобильной ширины (без TS-типов) */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`);
    const handler = (ev: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in ev ? ev.matches : mq.matches);

    // первичный вызов
    handler(mq);

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else if (typeof mq.addListener === "function") {
      // старый Safari
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, [breakpoint]);

  return isMobile;
}

export default function Page() {
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();

  // На мобилке — сразу показываем элементы (без «ленивых» анимаций)
  useEffect(() => {
    setEntered(true);
  }, [isMobile]);

  // Reveal-анимации
  useEffect(() => {
    if (!entered) return;

    const els = document.querySelectorAll<HTMLElement>(".reveal");
    els.forEach((el) => el.classList.add("show"));

    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [entered]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AI Memories",
      url: siteUrl,
      logo: siteUrl + "/images/og-cover.svg",
      description:
        "Студия создания песен на заказ для видео, рекламы и личных событий",
      email: "info@aimemories.ru",
      telephone: "+79841933792",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+79841933792",
        contactType: "customer service",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AI Memories — Создание песен на заказ",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: siteUrl + "/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Создание песни на заказ для видео",
      description:
        "Профессиональное создание уникальных песен и саундтреков для видео, рекламы и роликов.",
      provider: { "@type": "Organization", name: "AI Memories", url: siteUrl },
      areaServed: "RU",
    },
  ];

  return (
    <main className="relative z-10 min-h-screen">
      <SEOJsonLd data={schema} />
      <BackgroundFX />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 reveal">
        <BrandLogo size={160} withWordmark className="mx-auto mb-6" />
        <h1 className="text-3xl md:text-5xl font-semibold text-center">
          Оживление ваших фотографий · Создание песен на заказ
        </h1>
        <p className="text-center text-slate-300 mt-3 max-w-3xl mx-auto">
          Профессионально оживляем фото и пишем уникальные саундтреки для
          рекламы, YouTube, презентаций и семейных видео-альбомов.
        </p>

        <div className="mt-8">
          <ServicesNav />
        </div>
        <div className="mt-6 text-center">
          <WhatsAppButton className="mx-auto" />
        </div>

        {/* Шэр на Hero */}
        <div className="mt-4">
          <SocialShare
            text="Оживление фото и песни на заказ — AI Memories"
            className="justify-center"
          />
        </div>
      </section>

      {/* До/после */}
      <div className="container mx-auto px-4 py-12 reveal">
        <BeforeAfterHero />
      </div>

      {/* KPI */}
      <Stats />

      {/* Видео-блок */}
      <section className="container mx-auto px-4 py-12 reveal">
        <TwoWorksVideo />
        
        <div className="mt-4">
          <SocialShare
            text="Оживление фото и песни на заказ — AI Memories"
            className="justify-center"
          />
        </div>
      </section>

      {/* Кейсы */}
      <section className="container mx-auto px-4 py-12 reveal">
        <Showcase />
        <div className="mt-4">
          <SocialShare
            text="Оживление фото и песни на заказ — AI Memories"
            className="justify-center"
          />
        </div>
      </section>

      {/* Процесс */}
      <section className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
         
        </h2>
        <Scenes />
      </section>

      {/* Стоимость */}
      <section className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Стоимость
        </h2>
        <Pricing />
      </section>

      {/* Песни */}
      <section className="container mx-auto px-4 py-12 reveal songs">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Примеры песен
        </h2>
        <Songs />
        <div className="mt-4">
          <SocialShare
            text="Оживление фото и песни на заказ — AI Memories"
            className="justify-center"
          />
        </div>
      </section>

      {/* Калькулятор */}
      <section className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Калькулятор
        </h2>
        <Calculator />
      </section>

      {/* Как заказать */}
      <section className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        
        </h2>
        <HowToOrder />
      </section>

      {/* Отзывы */}
      <div className="container mx-auto px-4 py-12 reveal">
        <Reviews />
      </div>

      {/* Бриф */}
      <section className="container mx-auto px-4 py-16 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Бриф для заказа песни
        </h2>
        <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
          Расскажите о вашей будущей песне — и мы предложим лучший вариант
        </p>
        <BriefWizard />
      </section>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-12 reveal">
        <FAQ />
      </div>

      {/* Футер */}
      <footer className="container mx-auto px-4 py-16 text-center text-slate-400">
        <div>
          Почта:{" "}
          <a className="text-sky-300" href="mailto:info@aimemories.ru">
            info@aimemories.ru
          </a>
        </div>
        <div className="mt-1">
          WhatsApp:{" "}
          <a className="text-sky-300" href="https://wa.me/79841933792">
            +7 984 193-37-92
          </a>
        </div>
        <div className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</div>
      </footer>

      {/* Глобальные фиксы для мобильной видимости плееров */}
      <style jsx global>{`
        .songs iframe,
        .songs audio {
          width: 100%;
          border: 0;
          display: block;
          min-height: 232px;
        }
        @media (max-width: 560px) {
          .songs iframe,
          .songs audio {
            min-height: 232px;
          }
        }
      `}</style>
    </main>
  );
}
