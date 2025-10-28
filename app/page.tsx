"use client";
import React from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import WhatsAppButton from "./components/WhatsAppButton";
import SEOJsonLd from "./components/SEOJsonLd";
import EntryOverlay from "./components/EntryOverlay";
import BrandLogo from "./components/BrandLogo";

// Хелпер: берём default, иначе именованный
const pick = (m: any, name: string) => m.default ?? m[name];

// ---------- Типы только для AudioList ----------
type Track = { title: string; src: string };
type AudioListProps = { tracks: Track[] };

// Динамические компоненты (без пропсов — тип {}), а для AudioList — с типизацией
const ServicesNav     = dynamic(() => import("./components/ServicesNav"    ).then(m => pick(m,"ServicesNav")),     { ssr:false, loading:()=>null });
const Pricing         = dynamic(() => import("./components/Pricing"        ).then(m => pick(m,"Pricing")),         { ssr:false, loading:()=> <div className="text-center text-slate-500 py-6">Загрузка цен…</div> });
const BriefWizard     = dynamic(() => import("./components/BriefWizard"    ).then(m => pick(m,"BriefWizard")),     { ssr:false, loading:()=> <div className="text-center text-slate-500 py-6">Загрузка брифа…</div> });
const ContactForm     = dynamic(() => import("./components/ContactForm"    ).then(m => pick(m,"ContactForm")),     { ssr:false, loading:()=> <div className="text-center text-slate-500 py-6">Загрузка формы…</div> });
const SocialShare     = dynamic(() => import("./components/SocialShare"    ).then(m => pick(m,"SocialShare")),     { ssr:false, loading:()=>null });
const BeforeAfterHero = dynamic(() => import("./components/BeforeAfterHero").then(m => pick(m,"BeforeAfterHero")), { ssr:false });
const Stats           = dynamic(() => import("./components/Stats"          ).then(m => pick(m,"Stats")),           { ssr:false });
const HowToOrder      = dynamic(() => import("./components/HowToOrder"     ).then(m => pick(m,"HowToOrder")),      { ssr:false });
const TwoWorksVideo   = dynamic(() => import("./components/TwoWorksVideo"  ).then(m => pick(m,"TwoWorksVideo")),   { ssr:false });
const Scenes          = dynamic(() => import("./components/Scenes"         ).then(m => pick(m,"Scenes")),          { ssr:false });
const Showcase        = dynamic(() => import("./components/Showcase"       ).then(m => pick(m,"Showcase")),        { ssr:false, loading:()=>null });
const Calculator      = dynamic(() => import("./components/Calculator"     ).then(m => pick(m,"Calculator")),      { ssr:false, loading:()=>null });
const FAQ             = dynamic(() => import("./components/FAQ"            ).then(m => pick(m,"FAQ")),             { ssr:false, loading:()=>null });
const BackgroundFX    = dynamic(() => import("./components/BackgroundFX"   ).then(m => pick(m,"BackgroundFX")),    { ssr:false });

// ВАЖНО: типизируем динамический импорт AudioList, чтобы проп "tracks" принимался
const AudioList = dynamic<AudioListProps>(
  () =>
    import("./components/AudioList").then((m) =>
      (pick(m, "AudioList") as unknown) as React.ComponentType<AudioListProps>
    ),
  { ssr: false, loading: () => <div className="text-center text-slate-500 py-6">Загрузка треков…</div> }
);

export default function Page() {
  const [entered, setEntered] = useState(false);

  // Плавное появление секций через IntersectionObserver
  useEffect(() => {
    if (!entered) return;
    const targets = Array.from(document.querySelectorAll(".reveal"));

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("show");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      targets.forEach((el) => io.observe(el));
      return () => io.disconnect();
    } else {
      targets.forEach((el) => el.classList.add("show"));
    }
  }, [entered]);

  const tracks: Track[] = [
    { title: "С днем рождения, Вика", src: "/songs/song1.mp3" },
    { title: "Ромашковая любовь",     src: "/songs/song2.mp3" },
      { title: "Креповая свадьба",     src: "/songs/song3.mp3" },
  ];

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AI Memories",
      url: base,
      logo: base + "/images/og-cover.svg",
      description: "Студия создания песен на заказ для видео, рекламы и личных событий",
      email: "info@aimemories.ru",
      telephone: "+79841933792",
      contactPoint: { "@type": "ContactPoint", telephone: "+79841933792", contactType: "customer service" }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AI Memories — Создание песен на заказ",
      url: base,
      potentialAction: { "@type": "SearchAction", target: base + "/search?q={search_term_string}", "query-input": "required name=search_term_string" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Создание песни на заказ для видео",
      description: "Профессиональное создание уникальных песен и саундтреков для видео, рекламы и роликов.",
      provider: { "@type": "Organization", name: "AI Memories", url: base },
      areaServed: "RU"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Сколько времени занимает создание песни на заказ?", acceptedAnswer: { "@type": "Answer", text: "Стандартный срок — от 3 до 7 дней." } },
        { "@type": "Question", name: "Можно ли внести правки?", acceptedAnswer: { "@type": "Answer", text: "Да, до финальной записи." } }
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      <SEOJsonLd data={schema} />

      {!entered && (
        <EntryOverlay auto autoDelay={800} onEnter={() => setEntered(true)} />
      )}

      {entered && (
        <>
          <BackgroundFX />

          <section className="container mx-auto px-4 py-16 reveal">
            <BrandLogo size={160} withWordmark className="mx-auto mb-6" />
            <h1 className="text-3xl md:text-5xl font-semibold text-center">
             Оживление ваших фотографии 
            
              Создание песни на заказ 
            </h1>
            <p className="text-center text-slate-300 mt-3 max-w-3xl mx-auto">
              Профессиональное создание уникальных песен и саундтреков для вашего видео: реклама, YouTube, презентации, для семейного видео-фльбома.
            </p>

            <div className="mt-8">
              <ServicesNav />
            </div>
            <div className="mt-6 text-center">
              <WhatsAppButton className="mx-auto" />
            </div>
          </section>

          <div className="container mx-auto px-4 py-12 reveal">
            <BeforeAfterHero />
          </div>

          <Stats />

          <div className="container mx-auto px-4 py-12 reveal">
            <TwoWorksVideo />
          </div>

          <div className="container mx-auto px-4 py-12 reveal">
            <Showcase />
          </div>

          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Примеры авторских песен и саундтреков</h2>
            <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
              Послушайте примеры наших работ — уникальные песни и композиции
            </p>
            <AudioList tracks={tracks} />
          </section>

          <div className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Процесс создания</h2>
            <Scenes />
          </div>

          <section className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Стоимость</h2>
            <Pricing />
          </section>

          <div className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Калькулятор</h2>
            <Calculator />
          </div>

          <div className="container mx-auto px-4 py-12 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Как заказать</h2>
            <HowToOrder />
          </div>

          <section className="container mx-auto px-4 py-16 reveal">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Бриф для заказа песни</h2>
            <p className="text-center text-slate-300 mb-8 max-w-3xl mx-auto">
              Расскажите о вашей будующей песни 
            </p>
            <BriefWizard />
          </section>

          <div className="container mx-auto px-4 py-12 reveal">
            <FAQ />
          </div>

          <footer className="container mx-auto px-4 py-16 text-center text-slate-400">
            <div>Почта: <a className="text-sky-300" href="mailto:info@aimemories.ru">info@aimemories.ru</a></div>
            <div className="mt-1">WhatsApp: <a className="text-sky-300" href="https://wa.me/79841933792">+7 984 193-37-92</a></div>
            <div className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</div>
          </footer>
        </>
      )}
    </main>
  );
}
