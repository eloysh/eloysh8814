import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Memories — Оживление фото и песни на заказ",
  description: "Оживляем фото, создаём песни и саундтреки для ваших видео.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
