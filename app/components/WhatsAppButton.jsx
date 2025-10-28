"use client";
export default function WhatsAppButton({ className = "" }) {
  return (
    <a
      href="https://wa.me/79841933792"
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${className}`}
      aria-label="Написать в WhatsApp"
    >
      Написать в WhatsApp
    </a>
  );
}
