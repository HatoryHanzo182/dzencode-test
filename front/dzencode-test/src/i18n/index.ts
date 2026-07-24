import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ru } from "@/i18n/locales/ru";
import { en } from "@/i18n/locales/en";

i18n
    .use(initReactI18next)
    .init(
    {
        resources: { ru, en },
        lng: "ru",
        fallbackLng: "ru",
        interpolation: { escapeValue: false }
    });

export default i18n;