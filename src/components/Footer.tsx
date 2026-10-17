import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { BogolanTexture, KenteBand } from "./AfricanPatterns";
import { CONTACT_EMAIL, type Locale } from "@/i18n";

export default function Footer({ lang, dict }: { lang: Locale; dict: any }) {
  const f = dict.footer;
  const services = [
    { label: dict.nav.geoloc, href: "/geolocalisation" },
    { label: dict.nav.security, href: "/securite" },
    { label: dict.nav.prevention, href: "/prevention" },
    { label: dict.nav.epuration, href: "/epuration" },
  ];
  const company = [
    { label: dict.nav.news, href: "/actualites" },
    { label: dict.nav.contact, href: "/contact" },
    { label: dict.nav.clientSpace, href: "/espace-client" },
  ];

  return (
    <footer className="relative mt-8 bg-[#080C1C] overflow-hidden">
      <KenteBand className="h-2" />
      <BogolanTexture opacity={0.03} />

      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr,1fr,1.3fr]">
          <div>
            <Link href={`/${lang}`} className="flex items-center gap-2.5 mb-4">
              <Logo size={32} />
              <span className="font-display text-xl font-bold tracking-wide text-cream">
                SAHAMA<span className="text-sahamaOrange">.SERVICES</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{f.tagline}</p>
            <SocialLinks className="mt-5 !justify-start" />
          </div>

          <FooterColumn title={f.servicesTitle} links={services} lang={lang} />
          <FooterColumn title={f.companyTitle} links={company} lang={lang} />

          <div>
            <h3 className="text-cream font-semibold text-sm mb-4">{f.contactTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-gray-400">
                <Mail size={16} className="text-sahamaOrange mt-0.5 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-sahamaYellow transition break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={16} className="text-sahamaOrange mt-0.5 shrink-0" />
                <span>{f.zones}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Sahama Services — sahama-services.com. {f.rights}
          </p>
          <p>
            {f.developedBy}{" "}
            <a href="https://amardia.ca" target="_blank" rel="noopener noreferrer" className="hover:text-sahamaYellow hover:underline">
              amardia.ca
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, lang }: { title: string; links: Array<{ label: string; href: string }>; lang: Locale }) {
  return (
    <div>
      <h3 className="text-cream font-semibold text-sm mb-4">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={`/${lang}${link.href}`} className="text-gray-400 hover:text-sahamaYellow transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
