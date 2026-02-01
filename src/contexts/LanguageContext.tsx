"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/i18n";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isSupportedLocale } from "@/lib/i18n/locales";

export const languages = [
    { code: "en", name: "English", dir: "ltr" },
    { code: "ar", name: "العربية", dir: "rtl" },
    { code: "fr", name: "Français", dir: "ltr" },
    { code: "es", name: "Español", dir: "ltr" },
    { code: "de", name: "Deutsch", dir: "ltr" },
    { code: "it", name: "Italiano", dir: "ltr" },
    { code: "pt", name: "Português", dir: "ltr" },
    { code: "nl", name: "Nederlands", dir: "ltr" },
    { code: "ru", name: "Русский", dir: "ltr" },
    { code: "zh", name: "中文", dir: "ltr" },
    { code: "ja", name: "日本語", dir: "ltr" },
    { code: "ko", name: "한국어", dir: "ltr" },
    { code: "tr", name: "Türkçe", dir: "ltr" },
    { code: "pl", name: "Polski", dir: "ltr" },
    { code: "hi", name: "हिन्दी", dir: "ltr" },
    { code: "bn", name: "বাংলা", dir: "ltr" },
    { code: "id", name: "Bahasa Indonesia", dir: "ltr" },
    { code: "ms", name: "Bahasa Melayu", dir: "ltr" },
    { code: "th", name: "ไทย", dir: "ltr" },
    { code: "vi", name: "Tiếng Việt", dir: "ltr" },
    { code: "sw", name: "Kiswahili", dir: "ltr" },
    { code: "ur", name: "اردو", dir: "rtl" },
];

interface LanguageContextType {
    lang: string;
    setLang: (code: string) => void;
    t: (key: string) => string;
    dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState(DEFAULT_LOCALE);

    useEffect(() => {
        const cookieMatch = document.cookie.match(
            new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`)
        );
        const cookieLocale = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;

        if (cookieLocale && translations[cookieLocale]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLangState(cookieLocale);
            return;
        }

        const stored = localStorage.getItem("genz212-lang");
        if (stored && translations[stored]) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLangState(stored);
        }
    }, []);

    const currentLang = languages.find((l) => l.code === lang) || languages[0];

    const setLang = (code: string) => {
        setLangState(code);
        localStorage.setItem("genz212-lang", code);
        if (isSupportedLocale(code)) {
            document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(code)}; path=/; max-age=31536000; samesite=lax`;
        }
    };

    const t = (key: string): string => {
        return translations[lang]?.[key] || translations["en"]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir: currentLang.dir as "ltr" | "rtl" }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
};
