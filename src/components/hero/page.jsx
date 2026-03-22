





"use client";

import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    AnimatePresence
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch } from 'react-redux';

gsap.registerPlugin(ScrollTrigger);

// Language list for the greeting
const GREETINGS = ["HELLO", "NAMASTE", "HOLA", "BONJOUR", "CIAO", "KONNICHIWA", "SALAM"];

export default function Home() {
    const dispatch = useDispatch();
    const containerRef = useRef(null);
    const heroTextRef = useRef(null);

    // State for cycling languages
    const [index, setIndex] = useState(0);

    // Language cycling effect
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % GREETINGS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // ─── Lenis → Framer Motion sync ────────────────────────────────────────────
    // We create a raw MotionValue for scrollY, then feed Lenis scroll events into it.
    // This makes ALL useTransform hooks respond to Lenis inertia, not native scroll.
    const lenisScrollY = useMotionValue(0);

    useEffect(() => {
        // Lenis is initialised in ClientProvider and exposed as window.__lenis
        const tryBind = () => {
            if (window.__lenis) {
                window.__lenis.on('scroll', ({ scroll }) => {
                    lenisScrollY.set(scroll);
                });
                return true;
            }
            return false;
        };

        if (!tryBind()) {
            // Retry until Lenis is ready (max ~500 ms)
            const timer = setInterval(() => {
                if (tryBind()) clearInterval(timer);
            }, 50);
            return () => clearInterval(timer);
        }
    }, [lenisScrollY]);

    // ─── Framer Motion scroll (for section-relative tracking) ──────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Sky / clouds parallax
    const skyScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const skyOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    // City parallax (zoom-out as you scroll)
    const cityScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

    // ─── GSAP entrance animations ─────────────────────────────────────────────
    useEffect(() => {
        if (heroTextRef.current) {
            gsap.fromTo(
                heroTextRef.current,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
            );
        }

        gsap.utils.toArray('.gsap-card').forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* ── City Parallax Background ─────────────────────────────────────── */}
            <motion.div
                className="fixed inset-0 z-[-2] w-full h-full pointer-events-none"
                style={{ scale: cityScale }}
            >
                {/* Replaced copy.png with blue background div */}
                <div
                    className="w-full h-full"
                    style={{ background: "#4F97C2" }}
                />
            </motion.div>

            {/* ── Sky / Clouds Overlay (Lenis-driven parallax) ──────────────────── */}
            <motion.div
                id="clouds"
                className="fixed inset-0 z-[-1] w-full h-full pointer-events-none will-change-transform"
                style={{
                    scale: skyScale,
                    opacity: skyOpacity,
                    transformOrigin: 'center center',
                }}
            >
                <div
                    style={{
                        transform: "perspective(1200px)",
                        width: "100%",
                        height: "100%",
                        background: "rgba(16, 137, 198, 1)",
                    }}
                >
                    <video
                        src="https://framerusercontent.com/assets/vByUTRpjIKiQC9dZga6fw6PQLM.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{
                            cursor: "auto",
                            borderRadius: "0px",
                            display: "block",
                            objectPosition: "50% 50%",
                            backgroundColor: "transparent",
                            mixBlendMode: "screen",
                        }}
                    />
                </div>
                {/* Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/1 via-blue-300/40 to-blue-100 pointer-events-none" />
            </motion.div>

            {/* ── Hero Text Section ─────────────────────────────────────────────── */}
            <section ref={heroTextRef} className="px-6 max-w-7xl mx-auto relative z-10 flex flex-col justify-center min-h-[50vh] xl:min-h-[55vh]">

                {/* 1. PHONE DESIGN (Visible on screens smaller than 768px) */}
                <div className="block md:hidden pt-24 pb-12">
                    <div className="mb-8 h-16 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`phone-${GREETINGS[index]}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
                            >
                                {GREETINGS[index]}.
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <p className="text-xl sm:text-2xl font-medium text-white max-w-sm leading-relaxed drop-shadow-md">
                                I am Pratham Chavhan a <span className="text-white font-bold">Full Stack Developer</span> dedicated to crafting robust backends and seamless digital experiences.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 2. TABLET DESIGN (Visible between 768px and 1024px) */}
                <div className="hidden md:block lg:hidden pt-32 pb-16">
                    <div className="mb-10 h-20 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`tablet-${GREETINGS[index]}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-7xl font-bold tracking-tight text-white drop-shadow-lg"
                            >
                                {GREETINGS[index]}.
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <p className="text-3xl font-medium text-white max-w-2xl leading-relaxed drop-shadow-md">
                                I am Pratham Chavhan a <span className="text-white font-bold">Full Stack Developer</span> dedicated to crafting robust backends and seamless digital experiences.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 3. STANDARD LAPTOP DESIGN (Visible between 1024px and 1280px) */}
                <div className="hidden lg:block xl:hidden pt-40 pb-20">
                    <div className="mb-12 h-24 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`laptop-${GREETINGS[index]}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-8xl font-bold tracking-tight text-white drop-shadow-lg"
                            >
                                {GREETINGS[index]}.
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <p className="text-4xl font-medium text-white max-w-3xl leading-relaxed drop-shadow-md">
                                I am Pratham Chavhan a <span className="text-white font-bold">Full Stack Developer</span> dedicated to crafting robust backends and seamless digital experiences.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 4. MAC M4 / LARGE DISPLAY DESIGN (Visible on 1280px and above) */}
                <div className="hidden xl:block pt-28 pb-16">
                    <div className="mb-16 h-32 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={`mac-${GREETINGS[index]}`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-9xl font-bold tracking-tight text-white drop-shadow-xl"
                            >
                                {GREETINGS[index]}.
                            </motion.h2>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <p className="text-5xl font-medium text-white max-w-5xl leading-relaxed drop-shadow-lg">
                                <br />
                                <br />
                                <br />
                            </p>
                        </motion.div>
                    </div>
                </div>

            </section>

            {/* ── Contact CTA Section ──── ───────────────────────────────────────── */}
            <section className="px-6 max-w-3xl mx-auto relative z-10 text-center">

                {/* 1. PHONE DESIGN (Visible on screens smaller than 768px) */}
                <div className="block md:hidden pb-10 pt-4">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-4 rounded-2xl flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter drop-shadow-md">
                            Let me take you on<br /> a journey
                        </h2>
                    </motion.div>
                </div>

                {/* 2. TABLET DESIGN (Visible between 768px and 1024px) */}
                <div className="hidden md:block lg:hidden mt-8 pb-20">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl flex flex-col items-center justify-center">
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter drop-shadow-md">
                            Let me take you on<br /> a journey
                        </h2>
                    </motion.div>
                </div>

                {/* 3. STANDARD LAPTOP DESIGN (Visible between 1024px and 1280px) */}
                <div className="hidden lg:block xl:hidden mt-16 pb-32">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 rounded-3xl flex flex-col items-center justify-center">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter drop-shadow-md">
                            Let me take you on<br /> a journey
                        </h2>
                    </motion.div>
                </div>

                {/* 4. MAC M4 / LARGE DISPLAY DESIGN (Visible on 1280px and above) */}
                <div className="hidden xl:block mt-16 pb-[18vh]">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-20 rounded-3xl flex flex-col items-center justify-center">
                        <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter drop-shadow-md">
                            Let me take you on<br /> a journey
                        </h2>
                    </motion.div>
                </div>

            </section>
        </div>
    );
}



