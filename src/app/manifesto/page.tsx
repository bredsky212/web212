"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
    { id: "identity" },
    { id: "vision" },
    { id: "values" },
    { id: "political" },
    { id: "generational" },
    { id: "causes" },
    { id: "organization" },
    { id: "strategy" },
    { id: "communication" },
    { id: "ethics" },
    { id: "legacy" },
];

export default function ManifestoPage() {
    const [activeSection, setActiveSection] = useState("identity");
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        {t("manifesto.title").split(" ")[0]} <span className="text-neon-red">{t("manifesto.title").split(" ").slice(1).join(" ")}</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t("manifesto.subtitle")}
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <nav className="lg:w-64 flex-shrink-0">
                        <div className="lg:sticky lg:top-24 space-y-2">
                            {sections.map((section, index) => (
                                <motion.button
                                    key={section.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeSection === section.id
                                        ? "bg-neon-red/20 border border-neon-red/50 text-neon-red"
                                        : "bg-gray-900/50 border border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                                        }`}
                                >
                                    <span className="text-xs text-gray-600 block">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-display text-sm">{t(`manifesto.section.${section.id}.title`)}</span>
                                </motion.button>
                            ))}
                        </div>
                    </nav>

                    <div className="flex-1">
                        {sections.map((section) => (
                            <motion.article
                                key={section.id}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeSection === section.id ? 1 : 0,
                                    display: activeSection === section.id ? "block" : "none",
                                }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-900/30 border border-white/10 rounded-lg p-8 lg:p-12"
                            >
                                <span className="text-neon-red font-display tracking-widest text-xs mb-2 block uppercase">
                                    {t(`manifesto.section.${section.id}.subtitle`)}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                                    {t(`manifesto.section.${section.id}.title`)}
                                </h2>
                                <div className="prose prose-invert prose-lg max-w-none">
                                    {t(`manifesto.section.${section.id}.content`).split("\n\n").map((paragraph, i) => (
                                        <p key={i} className="text-gray-300 leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center border-t border-white/10 pt-16"
                >
                    <blockquote className="text-2xl md:text-3xl font-display italic text-gray-300 mb-6 max-w-3xl mx-auto">
                        "{t("manifesto.quote")}"
                    </blockquote>
                    <p className="text-neon-red font-display tracking-widest text-sm">
                        — GEN-Z 212
                    </p>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
