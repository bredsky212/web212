"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const navItems = [
        { nameKey: "nav.home", href: "/" },
        { nameKey: "nav.manifesto", href: "/manifesto" },
        { nameKey: "nav.history", href: "/history" },
        { nameKey: "nav.timeline", href: "/timeline" },
        { nameKey: "nav.podcasts", href: "/podcasts" },
        { nameKey: "nav.blog", href: "/blog" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 flex items-center gap-3"
                    >
                        <Link href="/" className="flex items-center gap-3">
                            <Image src="/logo.jpg" alt="Gen-Z 212" width={40} height={40} className="rounded" />
                            <span className="font-display text-xl font-bold tracking-wider text-[var(--accent)]">
                                GEN-Z <span className="text-[var(--text-secondary)]">212</span>
                            </span>
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex items-baseline space-x-4">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    className="relative group px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                >
                                    {t(item.nameKey)}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-2"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--background)] border-t border-[var(--border)]"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded transition-colors"
                                >
                                    {t(item.nameKey)}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-[var(--border)]">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
