"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const timelineData1 = [
  {
    id: "launch",
    year: "Sept 18",
    icon: "💬",
  },
  {
    id: "dayone",
    year: "Sept 27",
    icon: "✊",
  },
  {
    id: "expansion",
    year: "Sept 29",
    icon: "🔥",
  },
  {
    id: "escalation",
    year: "Sept 30",
    icon: "⚡",
  },
  {
    id: "tragedy",
    year: "Oct 1",
    icon: "🕯️",
  },
  {
    id: "persistence",
    year: "Oct 2-10",
    icon: "📢",
  },
  {
    id: "pause",
    year: "Oct 11",
    icon: "⏸️",
  },
  {
    id: "resumption",
    year: "Oct 18+",
    icon: "🔄",
  },
  {
    id: "response",
    year: "Oct 19",
    icon: "📋",
  },
];

const timelineData = timelineData1.reverse();

export default function TimelinePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-neon-red selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-32 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-[var(--text-primary)]">
            {t("timeline.title").split(" ")[0]}{" "}
            <span className="text-neon-red">
              {t("timeline.title").split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("timeline.subtitle")}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-red via-[var(--border)] to-transparent -translate-x-1/2 hidden md:block" />

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-16 md:mb-24 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div
                className={`w-full md:w-[45%] ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:border-neon-red/50 transition-colors duration-300 group">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <span className="text-neon-red font-display tracking-widest text-xs mb-1 block uppercase">
                    {t(`timeline.event.${item.id}.era`)}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 font-display group-hover:text-neon-red transition-colors text-[var(--foreground)]">
                    {t(`timeline.event.${item.id}.title`)}
                  </h3>
                  <p className="pb-4 text-[var(--text-secondary)] text-sm leading-relaxed">
                    {t(`timeline.event.${item.id}.desc`)}
                  </p>
                  <span className="text-neon-red font-display font-bold text-xs md:hidden">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Timeline Year Marker */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--background)] border-2 border-neon-red flex items-center justify-center z-10 shadow-[0_0_20px_rgba(139,0,0,0.3)]">
                  <span className="text-neon-red font-display font-bold text-xs">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Empty Space for alternating layout */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { labelKey: "stats.discord", value: "250K+" },
            { labelKey: "stats.arrests", value: "2,480+" },
            { labelKey: "stats.cities", value: "20+" },
            { labelKey: "stats.deaths", value: "3" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-display font-bold text-neon-red">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">
                {t(stat.labelKey)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
