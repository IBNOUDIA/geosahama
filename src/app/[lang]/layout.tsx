import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import AIAgentWidget from "@/components/AIAgentWidget";
import SocialLinks from "@/components/SocialLinks";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { CONTACT_EMAIL, isLocale, locales, SITE_URL } from "@/i18n";
import { pageMetadata } from "@/seo";

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
    <html lang={lang}>
      <head>
        <noscript>
          <style>{`.reveal-item { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-darkBg text-white antialiased">
        <div className="min-h-screen flex flex-col justify-between relative">
          <Navbar lang={lang} dict={dictionary} />
          <div className="pt-20 flex-1">{children}</div>
          <AIAgentWidget dict={dictionary} lang={lang} />
          <footer className="border-t border-zinc-800 py-8 text-center text-gray-500 text-xs sm:text-sm">
            <p>
              {dictionary.contact.emailLabel}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sahamaYellow hover:underline font-semibold">
                {CONTACT_EMAIL}
              </a>
            </p>

            <SocialLinks className="mt-5" />

            <p className="mt-5">
              © {new Date().getFullYear()} Sahama Services (sahama-services.com).{" "}
              {lang === "fr" ? "Tous droits réservés." : "All rights reserved."}
            </p>
            <p className="mt-1.5 text-gray-600">
              {lang === "fr" ? "Développé par" : "Developed by"}{" "}
              <a
                href="https://amardia.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-sahamaYellow hover:underline"
              >
                amardia.ca
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
