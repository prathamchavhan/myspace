"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useAnimation, useMotionValueEvent, useSpring, useMotionValue } from "framer-motion";

export function RocketSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end end"]
    });

    const [step, setStep] = useState(1);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.3) setStep(1);
        else if (latest < 0.6) setStep(2);
        else if (latest < 0.85) setStep(3);
        else setStep(4);
    });

    const opacity1 = useTransform(scrollYProgress, [0.25, 0.45], [1, 0]);

    const clip2 = useTransform(scrollYProgress, [0.25, 0.45], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
    const scanner2Y = useTransform(scrollYProgress, [0.25, 0.45], ["0%", "100%"]);
    const scanner2Opacity = useTransform(scrollYProgress, [0.24, 0.25, 0.44, 0.45], [0, 1, 1, 0]);

    // Scanner Sweep Reveal 2: Titanium -> Full Painted Red/Gold
    const clip3 = useTransform(scrollYProgress, [0.55, 0.75], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
    const scanner3Y = useTransform(scrollYProgress, [0.55, 0.75], ["0%", "100%"]);
    const scanner3Opacity = useTransform(scrollYProgress, [0.54, 0.55, 0.74, 0.75], [0, 1, 1, 0]);

    // Launch effects for State 4 (Repulsor Blasts)
    const fireOp = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 1, 1]);
    const fireScale = useTransform(scrollYProgress, [0.85, 1], [0.5, 1.5]);
    const suitY = useTransform(scrollYProgress, [0.85, 1], [0, -60]);

    const shakeControls = useAnimation();

    useEffect(() => {
        if (step === 4) {
            shakeControls.start({
                x: [0, -0.5, 0.5, -0.25, 0.25, 0],
                y: [0, 0.25, -0.25, 0.1, -0.1, 0],
                transition: { repeat: Infinity, duration: 0.15, ease: "linear" }
            });
        } else {
            shakeControls.stop();
            shakeControls.set({ x: 0, y: 0 });
        }
    }, [step, shakeControls]);

    const cards = [
        {
            title: "Mark I: Neural Wireframe",
            desc: "Every complex armor starts with a blueprint. We map the biometric structural integrity and cybernetic pathways, drafting a flawless wireframe for the core suit.",
        },
        {
            title: "Mark II: Exoskeleton Assembly",
            desc: "Fusing raw titanium and advanced alloys. The core structural plates lock into place, building a high-durability chassis ready to house the arc reactor.",
        },
        {
            title: "Mark III: Hot Rod Polish",
            desc: "Applying the iconic gold and hot-rod red aerodynamic plating. Fully shielded, pressurized, and polished to perfection for maximum atmospheric dominance.",
        },
        {
            title: "Mark IV: Flight Systems Online",
            desc: "Arc reactor at 100% capacity. Repulsors initialized. Deploying anti-gravity thrusters for immediate vertical takeoff. You are cleared for flight.",
        }
    ];

    // CSS 3D Depth Transform
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // The single realistic image of Iron Man uploaded by you
    const IMAGE_SRC = "/assets/ironman.png";

    return (
        <section ref={sectionRef} className="relative w-full bg-white text-foreground pt-12 z-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative">

                {/* Visual Left - Realistic Single-Image Morph */}
                <div
                    className="relative md:sticky top-32 h-[450px] md:h-[600px] flex items-center justify-center pointer-events-auto"
                    style={{ perspective: "1000px" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        className="relative w-full max-w-sm h-full flex justify-center items-center"
                        animate={shakeControls}
                        style={{ y: suitY, rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        {/* Glow Behind Suit when running */}
                        <motion.div style={{ opacity: fireOp, transform: "translateZ(-20px)" }} className="absolute center w-64 h-64 bg-cyan-400/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />

                        {/* Thrust Repulsors from bottom / feet */}
                        <motion.div className="absolute -bottom-8 w-40 flex justify-between px-6 pointer-events-none" style={{ opacity: fireOp, scaleY: fireScale, originY: "top", transform: "translateZ(-10px)" }}>
                            <div className="w-8 h-48 bg-gradient-to-b from-white via-cyan-400 to-transparent blur-[12px] opacity-90 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
                            <div className="w-8 h-48 bg-gradient-to-b from-white via-cyan-400 to-transparent blur-[12px] opacity-90 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
                        </motion.div>

                        {/* --- Layer 1: White Schematics Paper & Pencil Drawing --- */}
                        <motion.div
                            className="absolute inset-0 w-full h-full flex items-center justify-center bg-white pointer-events-none rounded-[2rem]   overflow-hidden"
                            style={{
                                transform: "translateZ(10px)",
                                opacity: opacity1
                            }}
                        >
                            {/* Dashed background grid lines exactly like the reference image */}
                            <div
                                className="absolute inset-0 w-full h-full opacity-60"
                                style={{
                                    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><line x1=%220%22 y1=%2240%22 x2=%2240%22 y2=%2240%22 stroke=%22%2394a3b8%22 stroke-width=%221%22 stroke-dasharray=%225 5%22/><line x1=%2240%22 y1=%220%22 x2=%2240%22 y2=%2240%22 stroke=%22%2394a3b8%22 stroke-width=%221%22 stroke-dasharray=%225 5%22/></svg>')",

                                }}
                            />

                            {/* Extreme filters turn the photorealistic image into black ink outlines */}
                            <motion.img
                                src={IMAGE_SRC}
                                alt="Schematic Outline"
                                className="relative z-10 w-full max-w-[380px] h-auto object-contain pointer-events-none"
                                style={{
                                    // High contrast forces shadows to black and rest to white, multiply strips the white
                                    filter: "brightness(1.5) grayscale(100%) contrast(1500%)",
                                    mixBlendMode: "multiply",
                                    opacity: 0.85
                                }}
                            />
                        </motion.div>

                        {/* Scanner Beam 1 (Blueprint -> Titanium) */}
                        <motion.div
                            className="absolute left-0 right-0 h-[3px] z-10"
                            style={{ top: scanner2Y, opacity: scanner2Opacity, transform: "translateZ(50px)" }}
                        />

                        {/* --- Layer 2: Raw Titanum / Exoskeleton Assembly --- */}
                        <motion.img
                            src={IMAGE_SRC}
                            alt="Mark Exoskeleton"
                            className="absolute inset-0 m-auto w-full max-w-[380px] h-auto object-contain pointer-events-none filter grayscale brightness-[1.2] contrast-[1.1] saturate-0 drop-shadow-lg"
                            style={{ clipPath: clip2, transform: "translateZ(20px)" }}
                        />

                        {/* Scanner Beam 2 (Titanium -> Fully Painted) */}
                        <motion.div
                            className="absolute left-0 right-0 h-[3px] bg-white drop-shadow-[0_0_15px_rgba(239,68,68,1)] z-10 w-full"
                            style={{ top: scanner3Y, opacity: scanner3Opacity, transform: "translateZ(50px)" }}
                        />

                        {/* --- Layer 3 & 4: Fully Painted Red/Gold Image --- */}
                        <motion.img
                            src={IMAGE_SRC}
                            alt="Mark Fully Assembled"
                            className="absolute inset-0 m-auto w-full max-w-[380px] h-auto object-contain pointer-events-none drop-shadow-2xl"
                            style={{ clipPath: clip3, transform: "translateZ(30px)" }}
                        />

                        {/* --- Layer 4: Glowing Arc Reactor Overlays --- */}
                        {/* Glows fade in on step 4 */}
                        <motion.div
                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-start pointer-events-none"
                            style={{ opacity: fireOp, transform: "translateZ(45px)" }}
                        >
                            {/* Chest Arc Reactor High-Glow Flare - positioned based on the iron man chest */}
                            <div className="absolute top-[28%] w-12 h-12 bg-white rounded-full blur-[8px] drop-shadow-[0_0_30px_rgba(103,232,249,1)] shadow-[0_0_60px_25px_rgba(34,211,238,0.8)] mix-blend-screen" />

                            {/* Eye socket glows */}
                            <div className="absolute top-[13%] flex gap-4">
                                <div className="w-4 h-2 bg-white rounded-full blur-[4px] shadow-[0_0_15px_5px_rgba(103,232,249,0.8)]" />
                                <div className="w-4 h-2 bg-white rounded-full blur-[4px] shadow-[0_0_15px_5px_rgba(103,232,249,0.8)]" />
                            </div>
                        </motion.div>

                    </motion.div>
                </div>

                {/* Content Right - Scroll Cards */}
                <div className="flex flex-col gap-[30vh] pb-[30vh] md:pb-[40vh] relative z-10 w-full pt-10 md:pt-40">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-zinc-100/80 dark:bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-cyan-500/10 dark:border-cyan-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_0_25px_rgba(6,182,212,0.05)] flex flex-col justify-center min-h-[45vh] transition-transform duration-300 relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                        >
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />

                            <div className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-4 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                <span className="w-8 h-[2px] bg-cyan-500 inline-block drop-shadow-md" /> {idx === 0 ? "JARVIS:" : "SYSTEM:"} PROTOCOL 0{idx + 1}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                                {card.title}
                            </h3>
                            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RocketSection;