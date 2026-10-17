import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@/legal";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const doc = privacyPolicy(lang);
  return pageMetadata(lang, "/confidentialite", doc.title, doc.intro.slice(0, 160));
}

export default async function ConfidentialitePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return <LegalPage doc={privacyPolicy(lang)} lang={lang} />;
}
