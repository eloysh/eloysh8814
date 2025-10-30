// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://www.aimemories.ru";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/admin/*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
