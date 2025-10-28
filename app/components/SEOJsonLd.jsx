"use client";
export default function SEOJsonLd({ data }) {
  if (!data) return null;
  const arr = Array.isArray(data) ? data : [data];
  return arr.map((node, i) => (
    <script key={i} type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
  ));
}
