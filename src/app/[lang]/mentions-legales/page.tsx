import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legalNotice } from "@/legal";
import type { Locale } from "@/i18n";
import { pageMetadata } from "@/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const doc = legalNotice(lang);
  return pageMetadata(lang, "/mentions-legales", doc.title, doc.intro);
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  return <LegalPage doc={legalNotice(lang)} lang={lang} />;
}
