"use client";

import { useEffect, useState } from "react";

type ApiProject = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  url: string | null;
  tags: string[];
};

function cardBody(project: ApiProject): string {
  const d = project.description?.trim();
  if (d) return d;
  return project.summary;
}

function ImagePlaceholder() {
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-slate-100">
      {/* Subtle radial “sunburst” */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 8deg, rgb(226 232 240) 8deg 9deg)",
        }}
      />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 shadow-sm">
        <svg
          className="h-9 w-9 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008H12V8.25z"
          />
        </svg>
      </div>
    </div>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5M10 14L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();

    (async () => {
      try {
        const res = await fetch("/api/projects", {
          signal: ac.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        const text = await res.text();
        let parsed: { projects?: unknown; error?: string } = {};
        try {
          parsed = text ? (JSON.parse(text) as typeof parsed) : {};
        } catch {
          if (!cancelled) {
            setProjects([]);
            setLoadError("Could not load projects. The server returned an unexpected response.");
          }
          return;
        }

        if (cancelled) return;

        const list = parsed.projects;
        setProjects(Array.isArray(list) ? (list as ApiProject[]) : []);

        if (parsed.error === "failed_to_load") {
          setLoadError(
            "Could not load projects. Run scripts/sql/projects_portfolio.sql in Supabase and check env vars.",
          );
        } else {
          setLoadError(null);
        }
      } catch (e) {
        if (cancelled) return;
        if (e instanceof DOMException && e.name === "AbortError") return;
        setProjects([]);
        setLoadError("Could not load projects. Check your connection.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  const cardWidth =
    "w-[min(22rem,calc(100vw-3rem))] shrink-0 snap-start sm:w-[24rem]";

  return (
    <section id="projects" className="scroll-mt-24 bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            My Portfolio Projects
          </h2>
          <p className="mt-4 text-base text-slate-500 sm:text-lg">
            A selection of mobile applications I&apos;ve crafted for clients and personal projects.
          </p>
        </header>

        {loadError && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-amber-700" role="status">
            {loadError}
          </p>
        )}

        {loading ? (
          <div
            className="mt-16 -mx-6 overflow-x-auto overflow-y-visible px-6 pb-4 [scrollbar-width:thin] snap-x snap-mandatory scroll-smooth"
            aria-busy
            aria-label="Loading projects"
          >
            <div className="flex w-max gap-6 pr-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${cardWidth}`}
                >
                  <div className="aspect-[16/10] animate-pulse bg-slate-100" />
                  <div className="space-y-3 p-6">
                    <div className="h-7 w-2/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <p className="mt-16 text-center text-sm text-slate-500">
            No projects yet. Add rows in Supabase in the{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">projects</code> table.
          </p>
        ) : (
          <div
            className="mt-16 -mx-6 overflow-x-auto overflow-y-visible px-6 pb-4 [scrollbar-width:thin] snap-x snap-mandatory scroll-smooth touch-pan-x"
            role="region"
            aria-label="Portfolio projects"
          >
            <ul className="flex w-max list-none gap-6 p-0 pr-6">
              {projects.map((project) => (
                <li key={project.id} className={cardWidth}>
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative">
                    <ImagePlaceholder />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {cardBody(project)}
                    </p>

                    {project.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                      >
                        View Case Study
                        <ExternalLinkIcon className="h-4 w-4 shrink-0" />
                      </a>
                    ) : null}
                  </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
