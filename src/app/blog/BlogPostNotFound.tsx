"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPostNotFound({ backHref }: { backHref: string }) {
    const { t, dir } = useLanguage();
    const backArrow = dir === "rtl" ? "→" : "←";

    return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-display font-bold mb-4">
                {t("blog.postNotFound.title")}
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
                {t("blog.postNotFound.subtitle")}
            </p>
            <Link href={backHref} className="text-neon-red hover:underline">
                {dir === "rtl"
                    ? `${t("blog.backToBlog")} ${backArrow}`
                    : `${backArrow} ${t("blog.backToBlog")}`}
            </Link>
        </div>
    );
}
