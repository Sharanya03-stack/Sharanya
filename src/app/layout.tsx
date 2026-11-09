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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-white min-h-screen selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
