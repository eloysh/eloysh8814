"use client";
export default function WhatsAppButton({ className = "" }) {
  const href = process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "https://wa.me/79841933792";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>
      Написать в WhatsApp
    </a>
  );
}
