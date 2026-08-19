import "@/app/globals.css";

export const metadata = {
  title: "Sahama Services - Géolocalisation & Suivi Écologique",
  description: "Solutions de géolocalisation en Afrique de l'Ouest et suivi écologique d'épuration à Montréal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          <style>{`.reveal-item { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="bg-darkBg text-white antialiased">{children}</body>
    </html>
  );
}
