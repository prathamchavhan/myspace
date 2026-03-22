"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useTheme } from "next-themes";
import IPodWidget from "./IPodWidget";
import ResumeWidget from "./ResumeWidget";


function StarField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        // Generate stars
        const STAR_COUNT = 220;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.4 + 0.3,
            baseAlpha: Math.random() * 0.6 + 0.25,
            alpha: 0,
            twinkleSpeed: Math.random() * 0.008 + 0.003,
            twinkleOffset: Math.random() * Math.PI * 2,
        }));

        let frame = 0;
        let rafId;

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            frame += 0.016;

            stars.forEach((s) => {
                // Sine-based twinkle
                s.alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(frame / s.twinkleSpeed + s.twinkleOffset));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(3)})`;
                ctx.fill();
            });

            rafId = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            stars.forEach((s) => {
                s.x = Math.random() * W;
                s.y = Math.random() * H;
            });
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full hidden dark:block"
        />
    );
}

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const badges = [
    { label: "Full Stack Developer", light: "bg-orange-70 text-orange-700", dark: "dark:bg-orange-500/15 dark:text-orange-200" },
    { label: "AI Enthusiast", light: "bg-sky-90 text-sky-700", dark: "dark:bg-sky-500/15 dark:text-sky-300" },
    { label: "SaaS Builder", light: "bg-pink-90 text-pink-700", dark: "dark:bg-pink-500/15 dark:text-pink-300" },
];

export default function Hero() {
    const imageCardRef = useRef(null);
    const floatTl = useRef(null);

    // Auto-restart the text assembly animation every 8 seconds
    const [playKey, setPlayKey] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayKey(prev => prev + 1);
        }, 10000); // 5s animation + 5s rest
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-white dark:bg-[#0a0a0f] transition-colors duration-500 font-mono">

            {/* ── Light mode: subtle dot grid ───────────────────────────────── */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{
                    backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    opacity: 0.5,
                }}
            />


            <StarField />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #f5f5f3 100%)" }}
            />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, #000000 100%)" }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-16 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">


                <motion.div
                    className="flex flex-col gap-5 order-2 lg:order-1 max-w-2xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        variants={fadeUp}
                        className="text-[1.2rem] sm:text-[2rem] font-medium text-[#0f172a] dark:text-white/80 tracking-normal select-none pl-6 sm:pl-10"
                    >
                        Hi 👋
                    </motion.p>

                    <motion.h1
                        variants={fadeUp}
                        className="text-[1.9rem] sm:text-[2.4rem] xl:text-[2.9rem] font-semibold leading-[1.15] tracking-[-0.01em] text-[#0f172a] dark:text-white pl-6 sm:pl-10"
                    >
                        I'm{" "}
                        <motion.span
                            drag
                            dragMomentum={false}
                            className="relative inline-flex h-[1.2em] overflow-visible align-bottom pr-2 cursor-grab active:cursor-grabbing z-[100] origin-[0_0] bg-transparent"
                            whileHover={{ scale: 2.05 }}
                            whileDrag={{ scale: 1.1, rotate: "-2deg" }}
                        >
                            <span key={playKey} className="relative inline-flex h-[1.2em] pointer-events-none">
                                {/* Animated Fake Cursor that 'fixes' the letters */}
                                <motion.svg
                                    width="32" height="32" viewBox="0 0 24 24"
                                    className="absolute pointer-events-none z-[200] text-[#0f172a] dark:text-gray-300 drop-shadow-xl"
                                    initial={{ left: "150%", top: "150%", opacity: 0 }}
                                    animate={{
                                        left: ["150%", "2%", "16%", "30%", "48%", "62%", "76%", "91%", "150%"],
                                        top: ["150%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "150%"],
                                        opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
                                        scale: [1, 1, 0.85, 1, 0.85, 1, 0.85, 1, 0.85, 1, 0.85, 1, 0.85, 1, 0.85, 1, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        times: [
                                            0,    // Start
                                            0.3,  // reaches P
                                            0.38, // reaches r
                                            0.46, // reaches a
                                            0.54, // reaches t
                                            0.62, // reaches h
                                            0.70, // reaches a
                                            0.78, // reaches m
                                            1.0   // Flies away
                                        ],
                                        ease: "easeInOut",
                                    }}
                                >
                                    <path fill="currentColor" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" d="M2.5 1 L2.5 22 L9 15 L14 24 L17 22 L11.5 13 L21 13 Z" />
                                </motion.svg>

                                {"Pratham".split("").map((char, index) => {
                                    // Specific broken scattering to make it look manually scattered
                                    const misalignments = [
                                        { y: -18, rotate: -35, x: -8 }, // P
                                        { y: 14, rotate: 25, x: 6 },    // r
                                        { y: -12, rotate: -15, x: -4 }, // a
                                        { y: 22, rotate: 32, x: 10 },   // t
                                        { y: -8, rotate: -20, x: -5 },  // h
                                        { y: 16, rotate: 28, x: 7 },    // a
                                        { y: -22, rotate: 15, x: -3 }   // m
                                    ];
                                    const start = misalignments[index];

                                    return (
                                        <span key={index} className="relative inline-flex flex-col h-[1.2em]">
                                            <motion.span
                                                initial={{ y: start.y, x: start.x, rotate: start.rotate, opacity: 0 }}
                                                animate={{
                                                    y: [start.y, start.y, 0],
                                                    x: [start.x, start.x, 0],
                                                    rotate: [start.rotate, start.rotate, 0],
                                                    opacity: [0, 1, 1]
                                                }}
                                                transition={{
                                                    duration: 1.5 + index * 0.4 + 0.3,
                                                    times: [
                                                        0,
                                                        (1.5 + index * 0.4 - 0.1) / (1.5 + index * 0.4 + 0.3), // Wait perfectly broken until cursor touches
                                                        1 // Snap into right alignment
                                                    ],
                                                    ease: "backOut"
                                                }}
                                                className="flex flex-col"
                                            >
                                                <span className="h-[1.2em] flex items-center justify-center relative z-10">{char}</span>
                                            </motion.span>
                                        </span>
                                    );
                                })}
                            </span>

                            <motion.span
                                className="absolute bottom-1 left-0 h-[3px] rounded-full bg-[#0f172a] dark:bg-white pointer-events-none"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </motion.span>
                        , and I love crafting fun things with passionate people!
                    </motion.h1>

                    {/* Badges */}

                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mt-1 pl-6 sm:pl-10">
                        {badges.map((badge, i) => (
                            <motion.span
                                key={badge.label}
                                initial={{ opacity: 0, scale: 1.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + i * 0.9, duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ scale: 1.07, y: -2 }}
                                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold cursor-default select-none ${badge.light} ${badge.dark}`}
                            >
                                <span className="text-base leading-none">{badge.icon}</span>
                                {badge.label}
                            </motion.span>
                        ))}
                    </motion.div>


                    <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-3 pl-6 sm:pl-10">
                        <motion.a
                            href="#work"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-8 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 shadow-md"
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            View My Work →
                        </motion.a>


                    </motion.div>
                </motion.div>

                {/* RIGHT ────────────────────────────────────────────────────── */}
                <motion.div
                    className="flex justify-center flex-shrink-0 order-1 lg:order-2"
                    initial={{ opacity: 0, scale: 0.88, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                    <div ref={imageCardRef} className="relative group" style={{ perspective: "800px" }}>
                        <motion.div
                            drag
                            dragMomentum={false}
                            className="relative w-72 sm:w-40 xl:w-96 rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_25px_70px_rgba(255,255,255,0.06)]"
                            style={{ rotate: "5deg", transformStyle: "preserve-3d" }}
                            whileHover={{
                                rotate: "0deg", scale: 1.03,
                                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                            }}
                            whileDrag={{ scale: 1.05, rotate: "0deg", boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
                        >
                            <div className="relative w-full aspect-[1/1] bg-gray-100 dark:bg-neutral-900 pointer-events-none">
                                <Image
                                    src="/assets/newside.jpeg"
                                    alt="Pratham Chavhan"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>

                        </motion.div>


                        {/* Decorative ring */}
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full border-4 border-gray-300 dark:border-white/20 opacity-60"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

            </div>

            {/* ── Scroll hint ───────────────────────────────────────────────── */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-white/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
            >
                <span className="text-xs tracking-widest uppercase font-semibold">Scroll</span>
                <motion.div
                    className="w-px h-8 bg-gradient-to-b from-gray-400 dark:from-white/30 to-transparent"
                    animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* iPod Interactive Widget */}
            <IPodWidget />

            {/* Resume Interactive Widget */}
            <ResumeWidget />
        </section>
    );
}
