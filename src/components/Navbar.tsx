"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("#home")}
          className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-opacity hover:opacity-80"
        >
          Jalal Builds
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => scrollTo(item.href)}
                className="transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-sm"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-6 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
