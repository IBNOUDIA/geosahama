import Navbar from "@/components/Navbar";
import AIAgentWidget from "@/components/AIAgentWidget";
import SocialLinks from "@/components/SocialLinks";
import { getDictionary } from "@/dictionaries/get-dictionary";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "fr" | "en" };
}) {
  const dict = async () => getDictionary(params.lang);
  const dictionary = await dict();

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <Navbar lang={params.lang} dict={dictionary} />
      <div className="pt-20 flex-1">{children}</div>
      <AIAgentWidget dict={dictionary} lang={params.lang} />
      <footer className="border-t border-zinc-800 py-8 text-center text-gray-500 text-xs sm:text-sm">
        <p>
          {dictionary.contact.emailLabel}{" "}
          <a
            href="mailto:Souleymane.Diallo@sahama-services.com"
            className="text-sahamaYellow hover:underline font-semibold"
          >
            Souleymane.Diallo@sahama-services.com
          </a>
        </p>

        <SocialLinks className="mt-5" />

        <p className="mt-5">© {new Date().getFullYear()} Sahama Services (sahama-services.com). All rights reserved.</p>
        <p className="mt-1.5 text-gray-600">
          Développé par{" "}
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
  );
}
