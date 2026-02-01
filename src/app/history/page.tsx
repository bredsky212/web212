"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
    { id: "background", year: "Pre-2025" },
    { id: "spark", year: "September 2025" },
    { id: "movement", year: "27 September 2025" },
];

export default function HistoryPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-[var(--text-primary)]">
                        {t("history.title").split(" & ")[0]} & <span className="text-neon-red">{t("history.title").split(" & ")[1]}</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        {t("history.subtitle")}
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } gap-12 items-center`}
                        >
                            <div className="flex-1">
                                <div className="border-l-2 border-neon-red pl-6 py-2">
                                    <span className="text-neon-red font-display tracking-widest text-sm mb-2 block">
                                        {section.year}
                                    </span>
                                    <h2 className="text-3xl font-bold mb-4 font-display text-[var(--foreground)]">{t(`history.section.${section.id}.title`)}</h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                                        {t(`history.section.${section.id}.content`)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="w-full h-64 md:h-80 bg-[var(--surface)] border border-[var(--border)] rounded-lg relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-neon-red/5 group-hover:bg-neon-red/10 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-1 bg-neon-red/50 blur-lg group-hover:w-48 transition-all duration-700" />
                                    </div>
                                    <div className="absolute font-mono text-xs text-[var(--text-secondary)] bottom-4 right-4">
                                        FIG.0{index + 1}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 p-8 border border-[var(--border)] bg-[var(--surface)]/5 rounded-lg"
                >
                    <h3 className="text-2xl font-display mb-4 text-[var(--foreground)]">{t("history.discord.title")}</h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                        {t("history.discord.content")}
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm italic">
                        {t("history.discord.footer")}
                    </p>
                </motion.div>

            </div>

            <Footer />
        </main>
    );
}
