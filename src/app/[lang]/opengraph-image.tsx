import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
  const logoMark = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/logo-mark.png"))).toString("base64")}`;

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
              background: "#F6EEE1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
            <img src={logoMark} width={68} height={68} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "50px", fontWeight: 800, lineHeight: 0.95 }}>
            <span>Sahama</span>
            <span style={{ color: "#FF7A00" }}>Services</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, lineHeight: 1.15, maxWidth: "1000px" }}>
          {dict.hero.title1.trim().replace(/&$/, "").trim()}
        </div>
        <div style={{ display: "flex", fontSize: "60px", fontWeight: 800, color: "#FFC700", lineHeight: 1.15 }}>
          {dict.hero.title2}
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#cbd5e1", marginTop: "36px" }}>
          Dakar · Abidjan · Conakry · Bamako — sahama-services.com
        </div>
      </div>
    ),
    size
  );
}
