const HERO_VIDEO =
  "https://customer-assets.emergentagent.com/job_jovial-wright-4/artifacts/zq18r7du_watermark_removed_fcc3a0fa-b72c-453b-ae85-0c702902c3c1.mp4";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/55"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-28 sm:py-32 lg:py-40">
        <div className="max-w-[800px] mx-auto animate-fade-in-up">
          <h1
            data-testid="hero-headline"
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.2] tracking-tight"
          >
            Trusted Insurance for Southern California
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed max-w-[620px] mx-auto"
          >
            Serving families and businesses with care and expertise since 1993
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              data-testid="hero-get-quote-btn"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white hover:text-black hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Quote
            </a>
            <a
              href="#services"
              data-testid="hero-learn-more-btn"
              className="inline-flex items-center text-white text-base font-medium underline underline-offset-4 decoration-white/50 hover:decoration-white transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
