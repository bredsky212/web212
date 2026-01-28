"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const podcasts = [
    { id: "2IcBRSdQczA", key: "1", date: "22 October 2025" },
    { id: "jvybpaZEkMU", key: "2", date: "October 2025" },
    { id: "5uKtMI3Nav8", key: "3", date: "Saturday 11" },
    { id: "RIo8NcvYIGU", key: "4", date: "Tuesday 9PM" },
    { id: "qpuTM0iFuGU", key: "5", date: "Friday 21:00-23:00" },
    { id: "1YpwtsBg_YA", key: "6", date: "October 2025" },
    { id: "xtWw0s5g5QM", key: "7", date: "October 2025" },
    { id: "mFVuA8i3DHU", key: "8", date: "October 2025" },
    { id: "5lZ12X2kAqI", key: "9", date: "October 2025" },
    { id: "mSx3j7E-X4M", key: "10", date: "October 2025" },
];

export default function PodcastsPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-neon-red selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-32 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-[var(--text-secondary)]">
                        <span className="text-neon-red">{t("podcasts.title").split(" ")[0]}</span> {t("podcasts.title").split(" ").slice(1).join(" ")}
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        {t("podcasts.subtitle")}
                    </p>
                </motion.div>

                {/* Podcast Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {podcasts.map((podcast, index) => (
                        <motion.div
                            key={podcast.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-neon-red/50 transition-colors group"
                        >
                            {/* YouTube Embed */}
                            <div className="relative w-full pt-[56.25%]">
                                <iframe
                                    src={`https://www.youtube.com/embed/${podcast.id}`}
                                    title={t(`podcasts.item.${podcast.key}.title`)}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <span className="text-neon-red font-display tracking-widest text-xs mb-2 block uppercase">
                                    {podcast.date}
                                </span>
                                <h3 className="text-xl font-bold mb-2 font-display group-hover:text-neon-red transition-colors text-[var(--foreground)]">
                                    {t(`podcasts.item.${podcast.key}.title`)}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm">
                                    {t(`podcasts.item.${podcast.key}.desc`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-[var(--text-secondary)] mb-4">{t("podcasts.cta.subtext")}</p>
                    <a
                        href="https://www.youtube.com/@GENZ212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-neon-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                        {t("podcasts.cta.button")}
                    </a>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
