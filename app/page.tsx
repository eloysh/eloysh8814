"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import SocialShare from "./components/SocialShare";
import EntryOverlay from "./components/EntryOverlay";
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

// формы — синхронно
import BriefWizard from "./components/BriefWizard";
import Calculator from "./components/Calculator";

// тяжёлые блоки — динамически
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

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // при загрузке проверяем, входил ли уже
  useEffect(() => {
    try {
      const was = localStorage.getItem("entered") === "1";
      setEntered(was);
      setOverlayVisible(!was);
    } catch {
      setOverlayVisible(true);
    }
  }, []);

  const handleEnter = () => {
    setEntered(true);
    setOverlayVisible(false);
  };

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
    <main className="relative min-h-screen">
      {/* Оверлей с ручным входом */}
      {overlayVisible && (
        <EntryOverlay auto={false} onEnter={handleEnter} audioSrc="/sounds/enter.wav" />
      )}

      {/* Контент — только ПОСЛЕ входа */}
      {entered && (
        <>
          <SEOJsonLd data={schema} />
          <BackgroundFX /> {/* убедись, что у корня внутри -z-10 и pointer-events-none */}

          {/* Hero */}
          <section className="container mx-auto px-4 py-16 reveal">
            <BrandLogo size={160} withWordmark className="mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-semibold text-center">
              Оживление ваших фотографий · Создание песен на заказ
            </h1>
            <p className="text-center text-slate-300 mt-3 max-w-3xl mx-auto">
              Профессионально оживляем фото и пишем уникальные саундтреки для рекламы, YouTube,
              презентаций и семейных видео-альбомов.
            </p>

            <div className="mt-8">
              <ServicesNav />
            </div>
            <div className="mt-6 text-center">
              <WhatsAppButton className="mx-auto" />
            </div>

            <div className="mt-4">
              <SocialShare text="Оживление фото и песни на заказ — AI Memories" className="justify-center" />
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
              <SocialShare text="Оживление фото и песни на заказ — AI Memories" className="justify-center" />
            </div>
          </section>

          {/* Кейсы */}
          <section className="container mx-auto px-4 py-12 reveal">
            <Showcase />
            <div className="mt-4">
              <SocialShare text="Оживление фото и песни на заказ — AI Memories" className="justify-center" />
            </div>
          </section>

          {/* Процесс */}
          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6" />
            <Scenes />
          </section>

          {/* Стоимость */}
          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Стоимость</h2>
            <Pricing />
          </section>

          {/* Песни */}
          <section className="container mx-auto px-4 py-12 reveal songs">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Примеры песен</h2>
            <Songs />
            <div className="mt-4">
              <SocialShare text="Оживление фото и песни на заказ — AI Memories" className="justify-center" />
            </div>
          </section>

          {/* Калькулятор */}
          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Калькулятор</h2>
            <Calculator />
          </section>

          {/* Как заказать */}
          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6" />
            <HowToOrder />
          </section>

          {/* Отзывы */}
          <div className="container mx-auto px-4 py-12 reveal">
            <Reviews />
          </div>

          {/* Бриф */}
          <section className="container mx-auto px-4 py-16 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Бриф для заказа песни</h2>
            <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
              Расскажите о вашей будущей песне — и мы предложим лучший вариант
            </p>
            <BriefWizard />
          </section>

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

          {/* фиксы для аудио/iframe */}
          <style jsx global>{`
            .songs iframe,
            .songs audio {
              width: 100%;
              border: 0;
              display: block;
              min-height: 232px;
            }
          `}</style>
        </>
      )}
    </main>
  );
}
