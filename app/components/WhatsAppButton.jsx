"use client";
export default function WhatsAppButton({
  className = "",
  text = "",
  phone = "79841933792",        // можно переопределить
  children = "Написать в WhatsApp",
}) {
  const encoded = encodeURIComponent(text);
  const envLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK?.trim(); // можно хранить полный wa.me в .env
  const href = envLink
    ? `${envLink}${envLink.includes("?") ? "&" : "?"}text=${encoded}`
    : `https://wa.me/${phone}?text=${encoded}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className}`}>
      {children}
    </a>
  );
}
