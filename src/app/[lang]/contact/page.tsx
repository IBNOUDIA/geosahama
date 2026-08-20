import { Mail, MapPin } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({ params }: { params: { lang: "fr" | "en" } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 pb-28">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{dict.contact.title}</h1>
        <p className="text-gray-400">{dict.contact.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-cardBg p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6 text-sahamaYellow">Coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sahamaOrange/10 rounded-lg text-sahamaOrange">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Courriel direct</p>
                  <a href="mailto:Souleymane.Diallo@sahama-services.com" className="text-white font-semibold hover:text-sahamaOrange transition">
                    Souleymane.Diallo@sahama-services.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-sahamaYellow/10 rounded-lg text-sahamaYellow">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Bureaux & Zones d'activités</p>
                  <p className="text-white font-semibold">Afrique de l'Ouest & Montréal (QC, Canada)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs text-gray-400">
            Nom de domaine officiel : <span className="text-sahamaYellow font-mono">sahama.services.com</span> / <span className="text-sahamaYellow font-mono">sahama-services.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm dict={dict} />
      </div>
    </div>
  );
}
