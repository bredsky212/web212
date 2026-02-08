"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <main className="min-h-screen bg-background text-foreground selection:bg-neon-red selection:text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-32 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-[var(--text-primary)]">
            {t("manifesto.title").split(" ")[0]}{" "}
            <span className="text-neon-red">
              {t("manifesto.title").split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("manifesto.subtitle")}
          </p>
        </motion.div>

        {/* ================= MOBILE (< md) ================= */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="space-y-4">
            {sections.map((section, index) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="">
                    <span className="text-xs text-[var(--text-muted)] block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-sm text-[var(--text-primary)]">
                      {t(`manifesto.section.${section.id}.title`)}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-4 pb-6">
                  <span className="text-neon-red font-display tracking-widest text-xs mb-2 block uppercase">
                    {t(`manifesto.section.${section.id}.subtitle`)}
                  </span>

                  <div className="prose prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)]">
                    {t(`manifesto.section.${section.id}.content`)
                      .split("\n\n")
                      .map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-[var(--text-secondary)] leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ================= DESKTOP (≥ md) ================= */}
        <div className="hidden md:flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-start px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-[var(--accent)]/15 border border-[var(--accent)]/50 text-[var(--accent)]"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40"
                  }`}
                >
                  <span className="text-xs text-[var(--text-muted)] block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm">
                    {t(`manifesto.section.${section.id}.title`)}
                  </span>
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Content */}
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
                className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-8 lg:p-12"
              >
                <span className="text-neon-red font-display tracking-widest text-xs mb-2 block uppercase">
                  {t(`manifesto.section.${section.id}.subtitle`)}
                </span>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
                  {t(`manifesto.section.${section.id}.title`)}
                </h2>

                <div className="prose prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)]">
                  {t(`manifesto.section.${section.id}.content`)
                    .split("\n\n")
                    .map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-[var(--text-secondary)] leading-relaxed mb-6"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center border-t border-[var(--border)] pt-16"
        >
          <blockquote className="text-2xl md:text-3xl font-display italic text-[var(--text-secondary)] mb-6 max-w-3xl mx-auto">
            &ldquo;{t("manifesto.quote")}&rdquo;
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
