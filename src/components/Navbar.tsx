"use client";
import { useState } from "react";
const items = [
  ["Services", "#services"],
  ["Work", "#projects"],
  ["Insights", "#insights"],
  ["Company", "#company"],
] as const;
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#29483b] bg-[#06110de8] backdrop-blur-md">
      <nav
        className="shell flex h-[72px] items-center justify-between"
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          className="focus-ring flex items-center gap-3 rounded-sm"
          aria-label="J Nova Systems home"
        >
          <span
            className="relative grid h-8 w-8 grid-cols-2 gap-1 border border-[#46735d] p-1"
            aria-hidden
          >
            <i className="bg-[#8cfbb0]" />
            <i className="border border-[#8cfbb0]" />
            <i className="border border-[#8cfbb0]" />
            <i className="bg-[#dfff4f]" />
          </span>
          <span className="display text-xl uppercase tracking-[.08em]">
            J Nova Systems
          </span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {items.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="focus-ring rounded-sm text-sm text-[#b8d2c2] transition-colors hover:text-[#effff5]"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            style={{ color: "#06110d" }}
            className="cta-primary focus-ring bg-[#8cfbb0] px-5 py-3 text-sm font-bold transition-colors hover:bg-[#dfff4f]"
          >
            Start a project →
          </a>
        </div>
        <button
          type="button"
          className="focus-ring grid h-11 w-11 place-items-center border border-[#46735d] md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
          >
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-[#29483b] bg-[#0a1b14] p-4 md:hidden">
          <div className="shell grid gap-1">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="focus-ring px-4 py-3 text-[#d9eee1]"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{ color: "#06110d" }}
              className="cta-primary mt-2 bg-[#8cfbb0] px-4 py-3 font-bold"
            >
              Start a project →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
