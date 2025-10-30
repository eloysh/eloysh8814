"use client";
import React, { useEffect, useState } from "react";
import BackgroundFX from "./components/BackgroundFX";
import WhatsAppButton from "./components/WhatsAppButton";
import SEOJsonLd from "./components/SEOJsonLd";
import BrandLogo from "./components/BrandLogo";
import ServicesNav from "./components/ServicesNav";
import Pricing from "./components/Pricing";
import BriefWizard from "./components/BriefWizard";
import ContactForm from "./components/ContactForm";
import SocialShare from "./components/SocialShare";
import BeforeAfterHero from "./components/BeforeAfterHero";
import Stats from "./components/Stats";
import HowToOrder from "./components/HowToOrder";
import TwoWorksVideo from "./components/TwoWorksVideo";
import Scenes from "./components/Scenes";
import Showcase from "./components/Showcase";
import Calculator from "./components/Calculator";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";

// простой хук: считаем мобильным всё до 768px
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as MediaQueryList).matches);
    handler(mq);
    mq.addEventListener?.("change", handler as any);
    // @ts-ignore для старых браузеров
    mq.addListener?.(handler);
    return () => {
      mq.removeEventListener?.("change", handler as any);
      // @ts-ignore
      mq.removeListener?.(handler);
    };
  }, [breakpoint]);
  return isMobile;
}

export default function Page() {
  const [entered, setEntered] = useState(false);
  const isMobile = useIsMobile();

  // На мобилке — сразу внутри
  useEffect(() => {
    setEntered(true);
  }, [isMobile]);

  // После "входа" принудительно показать все .reveal
  useEffect(() => {
    if (!entered) return;
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("show"));

    // параллельно запускаем IntersectionObserver (для десктопа — плавно)
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
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
      </section>

      {/* До/после */}
      <div className="container mx-auto px-4 py-12 reveal">
        <BeforeAfterHero />
      </div>

      {/* KPI */}
      <Stats />

      {/* Видео-блок */}
      <div className="container mx-auto px-4 py-12 reveal">
        <TwoWorksVideo />
      </div>

      {/* Кейсы/шоукейс */}
      <div className="container mx-auto px-4 py-12 reveal">
        <Showcase />
      </div>

      {/* Процесс */}
      <div className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Процесс создания
        </h2>
        <Scenes />
      </div>

      {/* Стоимость */}
      <section className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Стоимость
        </h2>
        <Pricing />
      </section>

      {/* Калькулятор */}
      <div className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Калькулятор
        </h2>
        <Calculator />
      </div>

      {/* Как заказать */}
      <div className="container mx-auto px-4 py-12 reveal">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          
        </h2>
        <HowToOrder />
      </div>

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
    </main>
  );
}
