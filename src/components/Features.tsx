"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const FEATURES = [
  {
    title: "Native Android Development",
    description:
      "Building robust, performant apps using Kotlin, XML, and modern Jetpack libraries like Compose and Room for a seamless Android experience.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
  },
  {
    title: "Cross-Platform Solutions",
    description:
      "Developing beautiful, single-codebase apps for both iOS and Android using Google's Flutter framework, ensuring consistency and faster time-to-market.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0l4.179 2.25L12 22.5 2.25 17.25l4.179-2.25"
        />
      </svg>
    ),
  },
  {
    title: "Full-Cycle Development",
    description:
      "From concept and UI/UX design to development, testing, deployment, and maintenance. I handle the entire process.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17l-5.1-3.06a1.5 1.5 0 01-.42-.61L3.75 6a1.5 1.5 0 011.06-1.83l6.56-1.64a1.5 1.5 0 011.16.2l5.1 3.06a1.5 1.5 0 01.42.61l2.15 5.5a1.5 1.5 0 01-1.06 1.83l-6.56 1.64a1.5 1.5 0 01-1.16-.2zM6.75 15l5.1 3.06a1.5 1.5 0 001.16.2l6.56-1.64a1.5 1.5 0 001.06-1.83L18.48 9.3"
        />
      </svg>
    ),
  },
] as const;

export function Features() {
  const section = useInView(0.1);

  return (
    <section id="features" className="px-6 py-24 sm:py-32">
      <div
        ref={section.ref}
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          section.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            My Development Approach
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Combining technical expertise with modern best practices to deliver
            exceptional mobile experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 transition-all duration-700 ${
                section.visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: section.visible ? `${(i + 1) * 100}ms` : "0ms" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {feature.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
