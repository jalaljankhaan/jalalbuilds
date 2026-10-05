import type { Metadata } from "next";
import { Archivo_Narrow, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteShell } from "../components/SiteShell";

const display = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "J Nova Systems | Product Engineering",
  description:
    "J Nova Systems designs and builds web apps, mobile apps, SaaS platforms, APIs, and cloud systems for ambitious product teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <template
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              "<!-- THESIS: Connected product engineering shown as a living system, refusing the generic agency card stack. OWN-WORLD: Deep forest infrastructure, mint signal paths, acid status points, precise modular geometry. STORY: Founders see one team connect strategy, design, engineering, and cloud delivery, then start a project. FIRST VIEWPORT: Large left-aligned promise and CTA face a dimensional node network that reveals the delivery system. FORM: Asymmetric Network, first composition, seed 8deae7ff. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->",
          }}
        />
        <div className="site-frame">
          <SiteShell>{children}</SiteShell>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
