"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TIMELINE_EVENTS, type LocalizedText, type TimelineEvent } from "@/data/timelineEvents";

function pickText(text: LocalizedText | undefined, lang: string): string {
  if (!text) return "";
  // try exact lang, then EN, then AR, then first available
  const direct = (text as Record<string, string | undefined>)[lang];
  if (direct) return direct;
  if (text.en) return text.en;
  if (text.ar) return text.ar;
  const first = Object.values(text).find(Boolean);
  return first ?? "";
}

function hasExtraContent(e: TimelineEvent): boolean {
  const hasDetails = Boolean(e.details && (e.details.en || e.details.ar || e.details.fr));
  const hasPoints = Boolean(e.keyPoints && e.keyPoints.length);
  const hasSources = Boolean(e.sources && e.sources.length);
  return hasDetails || hasPoints || hasSources;
}

export default function TimelinePage() {
  const { lang, t } = useLanguage();

  // Keep "latest first" to match the existing site behavior
  const timelineData = [...TIMELINE_EVENTS].sort((a, b) => b.order - a.order);

  const stats = [
    { value: "250K+", label: t("stats.discord") },
    { value: "2,068+", label: t("stats.arrests") },
    { value: "11+", label: t("stats.cities") },
    { value: "3", label: t("stats.deaths") },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 bg-neon-red rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/2 right-10 w-60 h-60 bg-neon-red rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-neon-red rounded-full filter blur-[100px] opacity-20"></div>
      </div>

      <Navbar />

      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--text)]">
              {t("timeline.title")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              {t("timeline.subtitle")}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card px-8 py-6 rounded-xl text-center min-w-[160px]"
              >
                <div className="font-display text-3xl font-bold text-neon-red mb-2">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-neon-red opacity-30"></div>

            <div className="space-y-12">
              {timelineData.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass-card p-6 pt-14 md:pt-6 rounded-xl relative group">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
                        <div className="w-20 h-20 rounded-full bg-[var(--background)] border-2 border-neon-red flex items-center justify-center z-20 shadow-[0_0_20px_rgba(139,0,0,0.3)] px-2">
                          <span className="text-neon-red font-display font-bold text-[10px] leading-tight text-center">
                            {pickText(event.dateLabel, lang)}
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-neon-red to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>

                      <div className="relative flex items-center mb-4">
                        <span className="text-neon-red text-2xl [margin-inline-end:0.75rem]">{event.icon}</span>
                        <span className="text-neon-red text-xs uppercase tracking-widest font-display">
                          {pickText(event.era, lang)}
                        </span>
                      </div>

                      <h3 className="relative font-display text-xl font-bold mb-2 text-[var(--text)]">
                        {pickText(event.title, lang)}
                      </h3>

                      {!!event.location && (
                        <div className="relative text-xs text-[var(--text-secondary)] mb-3">
                          <span className="text-neon-red/80">{t("timeline.event.location")}:</span>{" "}
                          <span>{pickText(event.location, lang)}</span>
                        </div>
                      )}

                      <p className="relative text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-line">
                        {pickText(event.summary, lang)}
                      </p>

                      {hasExtraContent(event) && (
                        <div className="relative mt-4">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`details-${event.id}`} className="border-none">
                              <AccordionTrigger className="py-2 text-sm text-neon-red hover:no-underline">
                                {t("timeline.event.details")}
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                {!!event.details && (
                                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-line">
                                    {pickText(event.details, lang)}
                                  </p>
                                )}

                                {!!event.keyPoints?.length && (
                                  <div className="mt-4">
                                    <div className="text-xs uppercase tracking-widest font-display text-neon-red mb-2">
                                      {t("timeline.event.keyPoints")}
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                                      {event.keyPoints.map((kp, i) => (
                                        <li key={i}>{pickText(kp, lang)}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {!!event.sources?.length && (
                                  <div className="mt-4">
                                    <div className="text-xs uppercase tracking-widest font-display text-neon-red mb-2">
                                      {t("timeline.event.sources")}
                                    </div>
                                    <ul className="space-y-2">
                                      {event.sources.map((src, i) => (
                                        <li key={i} className="text-sm">
                                          <a
                                            href={src.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[var(--text-secondary)] hover:text-neon-red transition-colors underline decoration-neon-red/30 hover:decoration-neon-red break-all"
                                            dir="ltr"
                                          >
                                            {src.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--card-background)] border-2 border-neon-red flex items-center justify-center z-10 relative">
                      <span className="text-neon-red text-lg font-bold">{event.icon}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex w-full md:w-5/12 justify-center md:justify-start mt-4 md:mt-0">
                    <div
                      className={`text-sm font-display text-neon-red px-4 py-2 rounded-lg bg-[var(--card-background)] border border-neon-red/30 ${
                        index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      {pickText(event.dateLabel, lang)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
