// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aimemories.ru"),
  title: "AI Memories — оживление фото и песни на заказ",
  description:
    "Оживляем фотографии, создаём авторские песни и саундтреки для роликов, рекламы и семейных видео-альбомов.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.aimemories.ru/",
    title: "AI Memories — оживление фото и песни на заказ",
    description: "Оживляем фото и пишем уникальные саундтреки.",
    images: [{ url: "/images/og-cover.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Memories",
    description: "Оживляем фото и пишем уникальные саундтреки.",
    images: ["/images/og-cover.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
