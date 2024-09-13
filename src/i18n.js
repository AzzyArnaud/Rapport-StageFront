import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/en.json';
import frJSON from './locale/fr.json';
import kiJSON from './locale/ki.json';

i18next
  .use(initReactI18next)
  .init({
    resources: { // Correction de "ressources" à "resources"
      en: { translation: enJSON }, // Utilisation de "translation" comme clé
      fr: { translation: frJSON },
      ki: { translation: kiJSON },
    },
    lng: "fr", // Langue par défaut
    fallbackLng: "fr", // Langue de secours
    interpolation: {
      escapeValue: false, // React se charge de l'échappement
    },
  });

export default i18next;