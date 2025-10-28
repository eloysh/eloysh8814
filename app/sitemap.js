export default function sitemap() {
  const base = "https://aimemories.ru";
  const now = new Date().toISOString();
  return [{ url: base + "/", lastModified: now, changeFrequency: "weekly", priority: 1 }];
}
