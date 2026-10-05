"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
type Project = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  url: string | null;
  tags: string[];
};
const visuals = ["/assets/jnova/work-platform.webp", "/assets/jnova/work-mobile.webp"];
export function Projects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/projects", { signal: ac.signal, cache: "no-store" })
      .then((r) => r.json() as Promise<{ projects?: Project[]; error?: string }>)
      .then((d) => {
        setItems(Array.isArray(d.projects) ? d.projects : []);
        setError(Boolean(d.error));
      })
      .catch((e) => {
        if (!(e instanceof DOMException && e.name === "AbortError")) setError(true);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, []);
  return (
    <section id="projects" className="section-pad bg-[#e5f7eb] text-[#06110d]">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[.4fr_1.6fr]">
          <div>
            <h2 className="section-title">Proof, not promises.</h2>
            <p className="mt-7 max-w-sm leading-7 text-[#305244]">
              Selected products and systems from our active project archive.
            </p>
          </div>
          <div>
            {error && (
              <p role="status" className="border border-[#6e8b79] p-4">
                Project data is temporarily unavailable.
              </p>
            )}
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2" aria-busy="true">
                <div className="h-80 animate-pulse bg-[#c8f1d6]" />
                <div className="h-80 animate-pulse bg-[#d7ef9d]" />
              </div>
            ) : items.length ? (
              <div className="grid gap-4 md:grid-cols-[1.35fr_.65fr]">
                {items.slice(0, 3).map((item, index) => (
                  <article
                    key={item.id}
                    className={`group relative overflow-hidden bg-[#0a1b14] text-[#effff5] ${index === 0 ? "min-h-[34rem] md:row-span-2" : "min-h-[16.5rem]"}`}
                  >
                    <Image
                      src={visuals[index % visuals.length]}
                      alt={`Abstract product-system visual for ${item.title}`}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 768px) 55vw, 100vw"
                          : "(min-width: 768px) 28vw, 100vw"
                      }
                      className="object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06110df2] via-[#06110d4d] to-transparent" />
                    <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6">
                      <h3 className="display max-w-[13ch] text-4xl leading-none">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 max-w-[56ch] text-sm leading-6 text-[#d0e5d8]">
                        {item.description?.trim() || item.summary}
                      </p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-ring mt-5 w-fit border-b border-[#8cfbb0] pb-1 text-sm font-bold text-[#8cfbb0]"
                        >
                          View project ↗
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="border border-[#8cb49b] p-8">
                <p className="display text-4xl">Project archive syncing.</p>
                <p className="mt-3 text-[#305244]">
                  Published project records will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
