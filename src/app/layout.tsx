import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.role} — AI & Web Products`,
  description: siteConfig.tagline,
  keywords: [
    "Freelance Full-Stack Developer",
    "AI Application Engineer",
    "Next.js Developer",
    "FastAPI Python Developer",
    "Supabase Expert",
    "SaaS Product Engineering",
    "B2B Enterprise Dashboards",
    "Sharanya Developer Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sharanya.dev",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-background text-slate-100 min-h-screen selection:bg-accent-cyan/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
