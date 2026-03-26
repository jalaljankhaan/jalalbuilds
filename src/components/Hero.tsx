"use client";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Subtle bottom gradient matching the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-indigo-100/50 via-purple-50/30 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        {/* Headline */}
        <h1
          className="text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          style={{ animation: "fade-in-up 0.7s ease-out both" }}
        >
          Crafting Exceptional{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Native
          </span>{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            &amp; Cross-Platform
          </span>{" "}
          Mobile Apps
        </h1>

        {/* Tagline */}
        <p
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg"
          style={{ animation: "fade-in-up 0.7s ease-out 0.15s both" }}
        >
          I transform ideas into high-performance, user-friendly Android and iOS
          applications using Kotlin, Jetpack Compose, and Flutter.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: "fade-in-up 0.7s ease-out 0.3s both" }}
        >
          <button
            type="button"
            onClick={() => scrollTo("#projects")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            View My Work
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Get In Touch
          </button>
        </div>

        {/* Portfolio links */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-500"
          style={{ animation: "fade-in-up 0.7s ease-out 0.45s both" }}
        >
          <a
            href="https://play.google.com/store/apps/developer?id=your-handle"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600"
          >
            Google Play Portfolio
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://apps.apple.com/developer/your-handle"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-indigo-600"
          >
            App Store Portfolio
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
