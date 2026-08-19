import Navbar from "@/components/Navbar";
import AIAgentWidget from "@/components/AIAgentWidget";
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
      <AIAgentWidget dict={dictionary} />
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
        <p className="mt-2">© {new Date().getFullYear()} Sahama Services (sahama-services.com). All rights reserved.</p>
      </footer>
    </div>
  );
}
