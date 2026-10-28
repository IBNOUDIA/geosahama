"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo, { Wordmark } from "./Logo";
import { KenteBand } from "./AfricanPatterns";

interface NavbarProps {
  lang: "fr" | "en";
  dict: any;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    const newPath = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${newLang}`);
    router.push(newPath);
  };

  const menuItems = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.geoloc, href: `/${lang}/geolocalisation` },
    { name: dict.nav.security, href: `/${lang}/securite` },
    { name: dict.nav.energy, href: `/${lang}/energie` },
    { name: dict.nav.cases, href: `/${lang}/realisations` },
    { name: dict.nav.news, href: `/${lang}/actualites` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-darkBg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5">
            <Logo size={44} />
            <Wordmark className="text-lg sm:text-xl" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-sahamaYellow transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Switch Lang */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 text-xs text-sahamaYellow hover:bg-zinc-800 transition"
            >
              <Globe size={14} />
              <span>{lang === "fr" ? "EN" : "FR"}</span>
              <span className="sr-only">{dict.nav.switchLang}</span>
            </button>
            
            {/* Espace Client Button */}
            <Link
              href={`/${lang}/espace-client`}
              className="bg-sahamaOrange text-darkBg font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-sahamaOrange/20 hover:bg-[#ff8c24] transition-all text-sm"
            >
              {dict.nav.clientSpace}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-700 text-xs text-sahamaYellow"
            >
              <Globe size={14} />
              <span>{lang === "fr" ? "EN" : "FR"}</span>
              <span className="sr-only">{dict.nav.switchLang}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={isOpen}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <KenteBand className="h-[3px] opacity-90" />

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="xl:hidden bg-cardBg border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-sahamaYellow py-2"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={`/${lang}/espace-client`}
            onClick={() => setIsOpen(false)}
            className="block text-center bg-sahamaOrange text-black font-bold py-2.5 rounded-lg mt-4"
          >
            {dict.nav.clientSpace}
          </Link>
        </div>
      )}
    </nav>
  );
}
