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

const REASONS = [
  {
    title: "Freedom & Impact",
    description:
      "I wanted the freedom to directly help entrepreneurs and businesses bring their app ideas to life. I thrive on turning complex problems into simple, elegant digital solutions that make a real difference in people's lives.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    featured: true,
  },
  {
    title: "Quality First",
    description:
      "Every line of code is crafted with attention to detail, performance, and user experience in mind.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    featured: false,
  },
  {
    title: "Client Partnership",
    description:
      "I work closely with clients to understand their vision and deliver solutions that exceed expectations.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    featured: false,
  },
] as const;

export function About() {
  const story = useInView();
  const reasons = useInView();

  return (
    <section id="about" className="px-6 py-24 sm:py-32">
      {/* "This Is My Story." */}
      <div
        ref={story.ref}
        className={`mx-auto max-w-5xl text-center transition-all duration-700 ${
          story.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          This Is My Story.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-slate-500 sm:text-lg">
          I am a passionate Software Engineer specializing in mobile technologies.
          My journey began with Native Android development, and I have since expanded
          my expertise to include Flutter for cross-platform solutions. I believe in
          writing clean, maintainable code and creating apps that provide real value
          to users. When I&apos;m not coding, I&apos;m often writing blog posts to
          share my knowledge with the community.
        </p>
      </div>

      {/* "Why I Freelance" */}
      <div
        ref={reasons.ref}
        className={`mx-auto mt-20 max-w-5xl transition-all duration-700 delay-150 ${
          reasons.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h3 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Why I Freelance
        </h3>

        <div className="mt-10 flex flex-col gap-5">
          {/* Featured card — full width */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                {REASONS[0].icon}
              </span>
              <div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {REASONS[0].title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {REASONS[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Two smaller cards side-by-side */}
          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.slice(1).map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  {reason.icon}
                </span>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">
                  {reason.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
