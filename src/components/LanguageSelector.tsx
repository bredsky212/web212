"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSelector() {
    const { lang, setLang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentLang = languages.find((l) => l.code === lang) || languages[0];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors text-sm"
            >
                <span className="text-xs font-medium">{currentLang.code.toUpperCase()}</span>
                <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 max-h-80 overflow-y-auto bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl z-50"
                    >
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => {
                                    setLang(language.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${lang === language.code
                                        ? "bg-[var(--accent)] text-white"
                                        : "hover:bg-[var(--surface-light)]"
                                    }`}
                            >
                                {language.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
