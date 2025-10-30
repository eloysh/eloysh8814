// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.aimemories.ru";
  const now = new Date();

  // Без #якорей — в sitemap они не нужны
  const routes = [
    "",
    "/services",
    "/pricing",
    "/calculator",
    "/how-to-order",
    "/faq",
  ];

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
}
