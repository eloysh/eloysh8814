export const metadata = {
  
  metadataBase: new URL("https://aimemories.ru"),
  title: { default: "AI Memories — Песня на заказ для видео", template: "%s — AI Memories" },
  description: "Студия создания песен и саундтреков на заказ: реклама, YouTube, презентации. От идеи до готового трека за 3–7 дней.",
  openGraph: {
    type: "website",
    url: "https://aimemories.ru",
    title: "AI Memories — Песня на заказ для видео",
    description: "Создание уникальных песен и саундтреков для вашего проекта",
    images: [{ url: "/images/og-cover.svg", width: 1200, height: 630 }]
  },
  // <<< Верификация для Search Console (мета)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: { canonical: "https://aimemories.ru" }
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
