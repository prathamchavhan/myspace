"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    const isDark = resolvedTheme === "dark" || theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Toggle theme"
        >
            <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
            >
                <motion.circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={false}
                    animate={{
                        r: isDark ? 9 : 5,
                        strokeWidth: isDark ? 2 : 2,
                        opacity: isDark ? 1 : 0,
                        scale: isDark ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Sun rays */}
                <motion.g
                    initial={false}
                    animate={{
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0.5 : 1,
                        rotate: isDark ? 90 : 0,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <line x1="12" y1="1" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                </motion.g>

                {/* Central circle for the sun */}
                <motion.circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="currentColor"
                    initial={false}
                    animate={{
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* Moon inner mask effect (Classic Skiper Inner Moon / Eclipse) */}
                <motion.circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="currentColor"
                    initial={false}
                    animate={{
                        opacity: isDark ? 1 : 0,
                        scale: isDark ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                />

                {/* The shadow circle that creates the crescent mask */}
                <motion.circle
                    cx="19"
                    cy="5"
                    r="8"
                    fill="var(--color-background)" /* Hides part of the background to create crescent moon */
                    initial={false}
                    animate={{
                        cx: isDark ? 17 : 25,
                        cy: isDark ? 7 : 0,
                        opacity: isDark ? 1 : 0,
                        r: isDark ? 7 : 8,
                    }}
                    className="fill-background"
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                />

            </motion.svg>
        </button>
    );
}
