import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Memories — Оживление фото и песни на заказ",
  description:
    "Профессионально оживляем ваши фотографии и создаём уникальные песни для роликов, рекламы и личных событий.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* ВАЖНО: meta viewport для мобильной адаптации */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0b0f17] text-white antialiased">{children}</body>
    </html>
  );
}
