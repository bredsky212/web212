"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "neon";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-white text-black hover:bg-gray-200 border border-transparent",
            secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-transparent",
            outline: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5",
            ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
            neon: "bg-neon-red/10 text-neon-red border border-neon-red shadow-[0_0_10px_rgba(255,26,26,0.2)] hover:shadow-[0_0_20px_rgba(255,26,26,0.5)] hover:bg-neon-red/20",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-11 px-6 text-sm",
            lg: "h-14 px-8 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest font-display",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
