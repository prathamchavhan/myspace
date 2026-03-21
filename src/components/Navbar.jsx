"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
        );

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-4 flex items-center justify-between transition-all duration-500 font-mono ${scrolled
                ? "bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-white/[0.06]"
                : "bg-transparent"
                }`}
        >
            {/* Left: Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
                <span className="text-sm font-semibold tracking-widest text-[#0f172a] dark:text-white uppercase">
                    Portfolio{" "}
                    <span className="text-gray-400 font-light">'26</span>
                </span>
            </motion.div>

            {/* Right: links + toggle */}
            <motion.div
                className="flex items-center gap-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
                <a
                    href="#work"
                    className="text-sm text-[#0f172a]/60 dark:text-white/50 hover:text-[#0f172a] dark:hover:text-white transition-colors duration-200 font-medium"
                >
                    Work
                </a>
                <a
                    href="/resume"
                    className="text-sm text-[#0f172a]/60 dark:text-white/50 hover:text-[#0f172a] dark:hover:text-white transition-colors duration-200 font-medium"
                >
                    Resume
                </a>

                {/* Skipper-style theme toggle */}
                <ThemeToggle />

                <motion.a
                    href="mailto:pratham@example.com"
                    className="relative text-sm font-semibold px-5 py-2.5 rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] overflow-hidden group"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10">Let's Talk</span>
                </motion.a>
            </motion.div>
        </nav>
    );
}
