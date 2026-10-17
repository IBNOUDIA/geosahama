import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import AIAgentWidget from "@/components/AIAgentWidget";
import Footer from "@/components/Footer";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { isLocale, locales, SITE_URL } from "@/i18n";
import { pageMetadata } from "@/seo";

// Self-hosted by Next.js at build time: no request to Google from visitors.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Only /fr and /en exist (pre-rendered here); any other first segment, e.g. a
// stray /something.txt, hits the isLocale check below and returns a 404
// instead of a broken copy of the home page.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const base = pageMetadata(lang, "", dict.meta.title, dict.meta.description);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: "%s | Sahama Services" },
    description: dict.meta.description,
    alternates: base.alternates,
    openGraph: { ...base.openGraph, siteName: "Sahama Services", type: "website" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <noscript>
          <style>{`.reveal-item { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-darkBg text-white antialiased font-sans">
        <div className="min-h-screen flex flex-col justify-between relative">
          <Navbar lang={lang} dict={dictionary} />
          <div className="pt-20 flex-1">{children}</div>
          <AIAgentWidget dict={dictionary} lang={lang} />
          <Footer lang={lang} dict={dictionary} />
        </div>
      </body>
    </html>
  );
}
