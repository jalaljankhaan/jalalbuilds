import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "../components/SiteFooter";
import { SiteShell } from "../components/SiteShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jalal Builds",
  description: "Personal branding site for Jalal – building in public.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-white text-slate-900">
          <SiteShell>{children}</SiteShell>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
