"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const demands = [
    { icon: "🏥", titleKey: "demands.healthcare", descKey: "demands.healthcare.desc" },
    { icon: "📚", titleKey: "demands.education", descKey: "demands.education.desc" },
    { icon: "🏠", titleKey: "demands.housing", descKey: "demands.housing.desc" },
    { icon: "💼", titleKey: "demands.employment", descKey: "demands.employment.desc" },
    { icon: "🚌", titleKey: "demands.transport", descKey: "demands.transport.desc" },
    { icon: "⚖️", titleKey: "demands.accountability", descKey: "demands.accountability.desc" },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-neon-red selection:text-white">
      <Navbar />

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-red/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-neon-red font-display tracking-[0.2em] text-sm md:text-base mb-4 uppercase">
              {t("hero.subtitle")}
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tighter"
          >
            {t("hero.title")} <span className="text-neon-red">212</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-[var(--text-secondary)] text-lg md:text-xl mb-10 leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/timeline">
              <Button variant="neon" size="lg">
                {t("hero.cta.timeline")}
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                {t("hero.cta.blog")}
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-neon-red to-transparent opacity-50" />
        </motion.div>
      </section>

      <section className="py-24 border-t border-[var(--border)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
          >
            {t("demands.title").split(" ")[0]} <span className="text-neon-red">{t("demands.title").split(" ").slice(1).join(" ")}</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demands.map((demand, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-lg p-6 hover:border-neon-red/50 transition-colors"
              >
                <span className="text-3xl mb-4 block">{demand.icon}</span>
                <h3 className="font-display font-bold text-lg mb-2">{t(demand.titleKey)}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{t(demand.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-[var(--border)]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-display italic text-[var(--text-secondary)] mb-6"
          >
            &ldquo;{t("quote")}&rdquo;
          </motion.blockquote>
          <p className="text-neon-red font-display tracking-widest text-sm">
            — GEN-Z 212
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
