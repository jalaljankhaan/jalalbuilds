"use client";

import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

type SiteShellProps = {
  children: ReactNode;
};

/** Client shell: nav + main. Footer is a separate server component in root layout. */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}
