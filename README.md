# Sahama Services - Plateforme Multilingue (FR/EN)

Site web professionnel pour **Sahama Services** (sahama-services.com) spécialisé en :
- Géolocalisation & Gestion de flottes (Afrique de l'Ouest)
- Sécurité & Prévention d'actifs
- Suivi Écologique du processus d'épuration (Montréal)
- Agent Assistant IA intégré

## Stack Technique
- **Framework:** Next.js 14 (App Router, I18n Fr/En)
- **Style:** Tailwind CSS (Thème Sombre, Accents Orange & Jaune)
- **Cartographie:** Google Maps API / Google Earth Engine SDK
- **Assistant IA:** Agent conversationnel interactif (API Chat)

## Instructions de Lancement (VS Code)

1. Ouvrez le dossier du projet dans **Visual Studio Code**.
2. Ouvrez le terminal (`Ctrl + ~` ou `Cmd + ~`) et installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env.local` à la racine et renseignez vos clés API :
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_cle_google_maps
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.
