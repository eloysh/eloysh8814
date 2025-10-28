"use client";
export default function SocialShare({ title = "AI Memories", url = typeof window !== 'undefined' ? window.location.href : '/' }) {
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch {}
    }
    try { await navigator.clipboard.writeText(`${title} — ${url}`); alert('Ссылка скопирована'); }
    catch { prompt('Скопируйте ссылку', `${title} — ${url}`); }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button className="btn-ghost" onClick={share}>Поделиться</button>
      <a className="btn-ghost" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noreferrer">Telegram</a>
      <a className="btn-ghost" href={`https://vk.com/share.php?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">VK</a>
    </div>
  );
}
