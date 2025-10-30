export default function Media(){
  return (
    <section className="media">
      <figure className="responsive-media">
        <picture>
          <source srcSet="/path/to/image.webp" type="image/webp" />
          <source srcSet="/path/to/image.svg"  type="image/svg+xml" />
          <img src="/path/to/image.jpg" alt="Audora" width={1024} height={320} loading="eager" decoding="async" />
        </picture>
      </figure>

      <figure className="responsive-media">
        <video className="hidden-mobile" playsInline muted controls preload="metadata" poster="/path/to/poster.jpg">
          <source src="/path/to/video.mp4" type="video/mp4" />
          <source src="/path/to/video.webm" type="video/webm" />
        </video>
      </figure>
    </section>
  );
}
