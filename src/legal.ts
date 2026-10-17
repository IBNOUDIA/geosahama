import { CONTACT_EMAIL, SITE_URL, type Locale } from "@/i18n";

// Company details shown in the legal notice. Fields left empty are simply
// not displayed (fill them in once confirmed: registered address, NEQ…).
export const COMPANY = {
  name: "Sahama Services",
  address: "",
  registration: "",
};

export const LEGAL_UPDATED = "2026-10-16";

export type LegalSection = { title: string; paragraphs: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

const companyLines = (fr: boolean) =>
  [
    `${fr ? "Raison sociale" : "Company name"} : ${COMPANY.name}`,
    COMPANY.address && `${fr ? "Siège" : "Head office"} : ${COMPANY.address}`,
    COMPANY.registration && `${fr ? "Immatriculation" : "Registration"} : ${COMPANY.registration}`,
    `${fr ? "Courriel" : "Email"} : ${CONTACT_EMAIL}`,
    `${fr ? "Site" : "Website"} : ${SITE_URL.replace("https://", "")}`,
  ].filter(Boolean) as string[];

export function legalNotice(lang: Locale): LegalDoc {
  const fr = lang === "fr";
  return fr
    ? {
        title: "Mentions légales",
        intro: "Informations relatives à l'éditeur, à l'hébergement et aux conditions d'utilisation du site sahama-services.com.",
        sections: [
          { title: "Éditeur du site", paragraphs: companyLines(true) },
          {
            title: "Conception et développement",
            paragraphs: ["Architecte Web : www.amardia.ca"],
          },
          {
            title: "Hébergement",
            paragraphs: ["Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com"],
          },
          {
            title: "Propriété intellectuelle",
            paragraphs: [
              "L'ensemble des contenus de ce site (textes, illustrations, logos, éléments graphiques et code) est la propriété de Sahama Services ou de ses partenaires. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
            ],
          },
          {
            title: "Nature des informations",
            paragraphs: [
              "Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer sans préavis. Elles ne constituent pas une offre contractuelle : seul un devis écrit émis par Sahama Services engage l'entreprise.",
              "Les tableaux de bord, cartes, indicateurs et illustrations présentés sur le site sont des représentations destinées à illustrer nos services ; ils ne reflètent pas des données opérationnelles en temps réel.",
            ],
          },
          {
            title: "Responsabilité et liens externes",
            paragraphs: [
              "Sahama Services s'efforce d'assurer l'exactitude des informations publiées mais ne peut garantir l'absence d'erreurs ou d'interruptions du service. Le site contient des liens vers des services tiers (notamment la plateforme Wialon pour l'Espace Client) dont Sahama Services ne contrôle pas le contenu ni les pratiques.",
            ],
          },
          {
            title: "Assistant virtuel",
            paragraphs: [
              "L'assistant « Sahama AI » génère ses réponses automatiquement à l'aide d'un modèle d'intelligence artificielle. Ses réponses sont informatives, peuvent comporter des inexactitudes et n'engagent pas Sahama Services. Pour toute décision, contactez directement notre équipe.",
            ],
          },
          {
            title: "Droit applicable",
            paragraphs: [
              "Les présentes mentions sont régies par les lois en vigueur au Québec et les lois fédérales du Canada qui s'y appliquent.",
            ],
          },
        ],
      }
    : {
        title: "Legal notice",
        intro: "Information about the publisher, hosting and terms of use of the sahama-services.com website.",
        sections: [
          { title: "Publisher", paragraphs: companyLines(false) },
          { title: "Design and development", paragraphs: ["Web Architect: www.amardia.ca"] },
          {
            title: "Hosting",
            paragraphs: ["Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States — vercel.com"],
          },
          {
            title: "Intellectual property",
            paragraphs: [
              "All content on this website (text, illustrations, logos, graphics and code) belongs to Sahama Services or its partners. Any full or partial reproduction, display or distribution without prior written permission is prohibited.",
            ],
          },
          {
            title: "Nature of the information",
            paragraphs: [
              "Information published on this website is provided for guidance and may change without notice. It is not a contractual offer: only a written quote issued by Sahama Services is binding.",
              "Dashboards, maps, indicators and illustrations shown on the website are representations of our services; they do not reflect real-time operational data.",
            ],
          },
          {
            title: "Liability and external links",
            paragraphs: [
              "Sahama Services strives to keep the information accurate but cannot guarantee it is error-free or that the service is uninterrupted. The website links to third-party services (including the Wialon platform for the Client Portal) whose content and practices Sahama Services does not control.",
            ],
          },
          {
            title: "Virtual assistant",
            paragraphs: [
              "The “Sahama AI” assistant generates its answers automatically using an artificial intelligence model. Its answers are informational, may contain inaccuracies and do not bind Sahama Services. For any decision, please contact our team directly.",
            ],
          },
          {
            title: "Governing law",
            paragraphs: ["This notice is governed by the laws in force in Québec and the federal laws of Canada applicable therein."],
          },
        ],
      };
}

export function privacyPolicy(lang: Locale): LegalDoc {
  const fr = lang === "fr";
  return fr
    ? {
        title: "Politique de confidentialité",
        intro:
          "Sahama Services accorde une grande importance à la protection de vos renseignements personnels. Cette politique explique quels renseignements nous recueillons sur ce site, pourquoi, avec qui ils sont partagés et quels sont vos droits, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et aux lois applicables.",
        sections: [
          {
            title: "Responsable de la protection des renseignements personnels",
            paragraphs: [
              `Pour toute question ou demande relative à vos renseignements personnels, écrivez à notre responsable de la protection des renseignements personnels : ${CONTACT_EMAIL}.`,
            ],
          },
          {
            title: "Renseignements recueillis",
            paragraphs: [
              "Formulaires de contact et de devis : nom, adresse courriel et, si vous les fournissez, entreprise, téléphone, services souhaités, taille de flotte, zone géographique et message.",
              "Assistant virtuel : le contenu des messages que vous lui adressez. Si vous utilisez le micro, la reconnaissance vocale est effectuée par votre navigateur.",
              "Carte interactive : les adresses recherchées et, si vous l'autorisez, votre position, utilisées uniquement pour afficher la carte et calculer un itinéraire.",
              "Données techniques : adresse IP et informations de navigation enregistrées par notre hébergeur pour la sécurité et le bon fonctionnement du site (notamment la prévention des abus).",
            ],
          },
          {
            title: "Finalités",
            paragraphs: [
              "Nous utilisons ces renseignements uniquement pour répondre à vos demandes, établir des devis, assurer le suivi de la relation commerciale, protéger le site contre les abus et en améliorer le fonctionnement. Nous ne vendons ni ne louons vos renseignements personnels.",
            ],
          },
          {
            title: "Consentement",
            paragraphs: [
              "En soumettant un formulaire ou en utilisant l'assistant, vous consentez à la collecte et à l'utilisation de vos renseignements aux fins décrites ci-dessus. Vous pouvez retirer votre consentement à tout moment en nous écrivant.",
            ],
          },
          {
            title: "Prestataires et communication hors du Québec",
            paragraphs: [
              "Pour exploiter ce site, nous faisons appel à des prestataires qui traitent certains renseignements pour notre compte, principalement aux États-Unis : Vercel (hébergement), Resend (envoi des courriels des formulaires), Google (assistant Gemini et cartes Google Maps). Ces prestataires sont tenus de protéger les renseignements et de ne les utiliser que pour fournir leurs services.",
              "L'Espace Client redirige vers la plateforme Wialon, exploitée par un tiers selon sa propre politique de confidentialité.",
            ],
          },
          {
            title: "Témoins (cookies)",
            paragraphs: [
              "Ce site n'utilise pas de témoins publicitaires ni d'outils de mesure d'audience. Les cartes Google Maps peuvent déposer des témoins techniques propres à Google lorsqu'elles sont affichées.",
            ],
          },
          {
            title: "Conservation et sécurité",
            paragraphs: [
              "Les renseignements sont conservés uniquement le temps nécessaire aux finalités indiquées, puis supprimés ou anonymisés. Les échanges avec le site sont chiffrés (HTTPS) et l'accès aux renseignements est limité aux personnes qui en ont besoin.",
            ],
          },
          {
            title: "Vos droits",
            paragraphs: [
              `Vous pouvez demander l'accès à vos renseignements personnels, leur rectification, leur suppression ou la limitation de leur utilisation en écrivant à ${CONTACT_EMAIL}. Nous répondons dans un délai de 30 jours.`,
              "Si vous n'êtes pas satisfait de notre réponse, vous pouvez vous adresser à la Commission d'accès à l'information du Québec, ou à l'autorité de protection des données de votre pays (par exemple la CDP au Sénégal ou l'ARTCI en Côte d'Ivoire).",
            ],
          },
          {
            title: "Mises à jour",
            paragraphs: ["Cette politique peut être modifiée ; la date de dernière mise à jour figure en bas de page."],
          },
        ],
      }
    : {
        title: "Privacy policy",
        intro:
          "Sahama Services takes the protection of your personal information seriously. This policy explains what information we collect on this website, why, who it is shared with and what your rights are, in accordance with Québec's Act respecting the protection of personal information in the private sector (Law 25) and other applicable laws.",
        sections: [
          {
            title: "Person in charge of personal information",
            paragraphs: [`For any question or request about your personal information, write to our person in charge of the protection of personal information: ${CONTACT_EMAIL}.`],
          },
          {
            title: "Information we collect",
            paragraphs: [
              "Contact and quote forms: name, email address and, if you provide them, company, phone, requested services, fleet size, geographic area and message.",
              "Virtual assistant: the content of the messages you send it. If you use the microphone, speech recognition is performed by your browser.",
              "Interactive map: the addresses you search for and, if you allow it, your location, used only to display the map and calculate a route.",
              "Technical data: IP address and browsing information logged by our host for security and proper operation of the website (including abuse prevention).",
            ],
          },
          {
            title: "Purposes",
            paragraphs: [
              "We use this information only to answer your requests, prepare quotes, follow up on the business relationship, protect the website against abuse and improve how it works. We do not sell or rent your personal information.",
            ],
          },
          {
            title: "Consent",
            paragraphs: [
              "By submitting a form or using the assistant, you consent to the collection and use of your information for the purposes described above. You may withdraw your consent at any time by writing to us.",
            ],
          },
          {
            title: "Service providers and transfers outside Québec",
            paragraphs: [
              "To run this website we rely on providers that process some information on our behalf, mainly in the United States: Vercel (hosting), Resend (sending form emails), Google (Gemini assistant and Google Maps). These providers must protect the information and use it only to deliver their services.",
              "The Client Portal redirects to the Wialon platform, operated by a third party under its own privacy policy.",
            ],
          },
          {
            title: "Cookies",
            paragraphs: [
              "This website does not use advertising cookies or audience measurement tools. Google Maps may set its own technical cookies when a map is displayed.",
            ],
          },
          {
            title: "Retention and security",
            paragraphs: [
              "Information is kept only as long as needed for the stated purposes, then deleted or anonymized. Communications with the website are encrypted (HTTPS) and access to information is limited to the people who need it.",
            ],
          },
          {
            title: "Your rights",
            paragraphs: [
              `You may request access to, correction or deletion of your personal information, or limit its use, by writing to ${CONTACT_EMAIL}. We reply within 30 days.`,
              "If you are not satisfied with our answer, you may contact the Commission d'accès à l'information du Québec, or the data protection authority of your country (for example the CDP in Senegal or ARTCI in Côte d'Ivoire).",
            ],
          },
          { title: "Updates", paragraphs: ["This policy may change; the last update date is shown at the bottom of the page."] },
        ],
      };
}
