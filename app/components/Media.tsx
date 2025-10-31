"use client";

export default function Media() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Картинка через <picture> */}
      <figure className="responsive-media mb-8">
        <picture>
          <source srcSet="/media/hero.webp" type="image/webp" />
          <img
            src="/media/hero.jpg"
            alt="Audora / PRISM — визуальный баннер"
            width={1024}
            height={320}
            loading="eager"
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </picture>
      </figure>

      {/* Видео без скрывающих классов */}
      <figure className="responsive-media">
        <video
          playsInline
          controls
          preload="metadata"
          poster="/media/clip-poster.jpg"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <source src="/media/clip.mp4" type="video/mp4" />
          <source src="/media/clip.webm" type="video/webm" />
          Ваш браузер не поддерживает видео.
        </video>
      </figure>
    </section>
  );
}
