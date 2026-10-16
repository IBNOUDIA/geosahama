import { ImageResponse } from "next/og";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { isLocale } from "@/i18n";

// Preview card shown when the site is shared (WhatsApp, Facebook, LinkedIn…).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahama Services";

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(isLocale(lang) ? lang : "fr");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 25% 110%, #1a3f5c 0%, #0d2436 40%, #0b1220 75%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "48px" }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "22px",
              background: "linear-gradient(135deg, #FF7A00, #FFC700)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 40 40">
              <path d="M20 4c-6.6 0-12 5.2-12 11.8C8 24.6 20 38 20 38s12-13.4 12-22.2C32 9.2 26.6 4 20 4z" fill="#0B0B0B" />
              <circle cx="20" cy="15.8" r="4.6" fill="#FFC700" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: "56px", fontWeight: 800, letterSpacing: "2px" }}>
            SAHAMA<span style={{ color: "#FF7A00" }}>.SERVICES</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, lineHeight: 1.15, maxWidth: "1000px" }}>
          {dict.hero.title1.trim().replace(/&$/, "").trim()}
        </div>
        <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, color: "#FFC700", lineHeight: 1.15 }}>
          {dict.hero.title2}
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#cbd5e1", marginTop: "36px" }}>
          {lang === "en" ? "West Africa · Montreal — sahama-services.com" : "Afrique de l'Ouest · Montréal — sahama-services.com"}
        </div>
      </div>
    ),
    size
  );
}
