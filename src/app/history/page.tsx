"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
    { id: "background", year: "Pre-2025", figure: "fig01-background" },
    { id: "spark", year: "September 2025", figure: "fig02-spark" },
    { id: "movement", year: "27 September 2025", figure: "fig03-movement" },
];

type FigureLocale = "ar" | "en" | "fr";

const sectionFigureAlt: Record<string, Record<FigureLocale, string>> = {
    background: {
        en: "Context snapshot infographic",
        fr: "Infographie du contexte",
        ar: "إنفوجرافيك لقطة الخلفية",
    },
    spark: {
        en: "Spark timeline and growth infographic",
        fr: "Infographie de la chronologie et de la croissance",
        ar: "إنفوجرافيك الشرارة والخط الزمني والنمو",
    },
    movement: {
        en: "Movement map and coordination channels infographic",
        fr: "Infographie de la carte du mouvement et des canaux de coordination",
        ar: "إنفوجرافيك خريطة الحركة وقنوات التنسيق",
    },
};

const discordFigureAlt: Record<FigureLocale, string> = {
    en: "Decentralized coordination and anonymity infographic",
    fr: "Infographie de coordination decentralisee et anonymat",
    ar: "إنفوجرافيك التنسيق اللامركزي وإخفاء الهوية",
};

export default function HistoryPage() {
    const { t, lang } = useLanguage();
    const historyTitle = t("history.title");
    const historyTitleParts = historyTitle.split(" & ");
    const hasAccentTitle = historyTitleParts.length > 1;
    const historyTitlePrimary = hasAccentTitle ? historyTitleParts[0] : historyTitle;
    const historyTitleAccent = hasAccentTitle ? historyTitleParts.slice(1).join(" & ") : "";
    const figureLocale: FigureLocale =
        lang === "ar" || lang === "fr" || lang === "en" ? lang : "en";

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
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-[var(--text-primary)] leading-tight break-words">
                        {historyTitlePrimary}
                        {historyTitleAccent ? (
                            <>
                                {" "}
                                <span className="text-neon-red">&amp; {historyTitleAccent}</span>
                            </>
                        ) : null}
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
                                } gap-12 items-center w-full`}
                        >
                            <div className="flex-1 w-full min-w-0">
                                <div className="border-s-2 border-neon-red ps-6 py-2">
                                    <span
                                        dir="ltr"
                                        className="text-neon-red font-display tracking-widest text-sm mb-2 block w-fit"
                                    >
                                        {section.year}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-display text-[var(--foreground)] break-words">
                                        {t(`history.section.${section.id}.title`)}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed text-lg break-words">
                                        {t(`history.section.${section.id}.content`)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 w-full min-w-0 flex justify-center">
                                <figure className="w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                                    {section.id === "movement" ? (
                                        <object
                                            data={`/figures/history/${section.figure}.${figureLocale}.svg`}
                                            type="image/svg+xml"
                                            className="block w-full"
                                            style={{ aspectRatio: "3 / 2" }}
                                            aria-label={
                                                sectionFigureAlt[section.id]?.[figureLocale] ??
                                                sectionFigureAlt[section.id]?.en ??
                                                "History figure"
                                            }
                                        >
                                            <Image
                                                src={`/figures/history/${section.figure}.${figureLocale}.svg`}
                                                alt={sectionFigureAlt[section.id]?.[figureLocale] ?? sectionFigureAlt[section.id]?.en ?? "History figure"}
                                                width={1200}
                                                height={800}
                                                className="block h-auto w-full"
                                                sizes="(min-width: 768px) 50vw, 100vw"
                                            />
                                        </object>
                                    ) : (
                                        <Image
                                            src={`/figures/history/${section.figure}.${figureLocale}.svg`}
                                            alt={sectionFigureAlt[section.id]?.[figureLocale] ?? sectionFigureAlt[section.id]?.en ?? "History figure"}
                                            width={1200}
                                            height={800}
                                            className="block h-auto w-full"
                                            sizes="(min-width: 768px) 50vw, 100vw"
                                        />
                                    )}
                                    <figcaption className="border-t border-[var(--border)] bg-[var(--surface)]/60 px-3 py-2 text-end font-mono text-xs text-[var(--text-muted)]">
                                        FIG.0{index + 1}
                                    </figcaption>
                                </figure>
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
                    <figure className="mt-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                        <Image
                            src={`/figures/history/fig04-why-discord.${figureLocale}.svg`}
                            alt={discordFigureAlt[figureLocale]}
                            width={1200}
                            height={800}
                            className="block h-auto w-full"
                            sizes="(min-width: 768px) 896px, 100vw"
                        />
                        <figcaption className="border-t border-[var(--border)] bg-[var(--surface)]/60 px-3 py-2 text-end font-mono text-xs text-[var(--text-muted)]">
                            FIG.04
                        </figcaption>
                    </figure>
                </motion.div>

            </div>

            <Footer />
        </main>
    );
}
