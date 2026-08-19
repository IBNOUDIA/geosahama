"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  const menuItems = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.geoloc, href: `/${lang}/geolocalisation` },
    { name: dict.nav.security, href: `/${lang}/securite` },
    { name: dict.nav.prevention, href: `/${lang}/prevention` },
    { name: dict.nav.epuration, href: `/${lang}/epuration` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-darkBg/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider text-white">
              SAHAMA<span className="text-sahamaOrange">.SERVICES</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
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
            </button>
            
            {/* Espace Client Button */}
            <Link
              href={`/${lang}/espace-client`}
              className="bg-gradient-to-r from-sahamaOrange to-sahamaYellow text-black font-semibold px-5 py-2.5 rounded-lg shadow-lg hover:brightness-110 transition-all text-sm"
            >
              {dict.nav.clientSpace}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-700 text-xs text-sahamaYellow"
            >
              <Globe size={14} />
              <span>{lang === "fr" ? "EN" : "FR"}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden bg-cardBg border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
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
