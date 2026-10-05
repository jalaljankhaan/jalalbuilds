"use client";
import { useEffect, useState } from "react";
type Post = {
  id: string;
  title: string;
  summary: string;
  description: string | null;
  url: string | null;
  tags: string[];
};
export function Blog() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/blog-posts", { signal: ac.signal, cache: "no-store" })
      .then((r) => r.json() as Promise<{ posts?: Post[]; error?: string }>)
      .then((d: { posts?: Post[]; error?: string }) => {
        setItems(Array.isArray(d.posts) ? d.posts : []);
        setError(Boolean(d.error));
      })
      .catch((e) => {
        if (!(e instanceof DOMException && e.name === "AbortError")) setError(true);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, []);
  return (
    <section id="insights" className="bg-[#0a1b14]">
      <div className="shell grid border-l border-[#29483b] lg:grid-cols-[.72fr_1.28fr]">
        <div className="border-r border-[#29483b] p-7 lg:p-10">
          <h2 className="display text-6xl leading-[.88]">
            Engineering notes for builders.
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-[#b8d2c2]">
            Technical decisions, product lessons, and practical notes from building real
            systems.
          </p>
        </div>
        <div className="border-r border-[#29483b] px-7 lg:px-10">
          {loading ? (
            <p className="py-8 text-[#b8d2c2]" aria-busy="true">
              Loading insights…
            </p>
          ) : error ? (
            <p className="py-8 text-[#b8d2c2]">Insights are temporarily unavailable.</p>
          ) : items.length ? (
            items.slice(0, 5).map((post, index) => (
              <article
                key={post.id}
                className="grid gap-4 border-b border-[#29483b] py-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start"
              >
                <span className="text-xs text-[#8cfbb0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-3xl leading-none">{post.title}</h3>
                  <p className="mt-3 max-w-[62ch] text-sm leading-6 text-[#b8d2c2]">
                    {post.description?.trim() || post.summary}
                  </p>
                </div>
                {post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-bold text-[#8cfbb0]"
                  >
                    Read ↗
                  </a>
                )}
              </article>
            ))
          ) : (
            <p className="py-8 text-[#b8d2c2]">
              New engineering notes are being prepared.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
