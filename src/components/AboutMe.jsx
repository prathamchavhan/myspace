"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const col1Images = [
    "/assets/newside.jpeg",
    "/assets/intern.jpeg", // Kayaking
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&fit=crop", // Dog
    "/assets/nashik.png", // Friends
];

const col2Images = [
    "/assets/pra.jpeg", // Portrait
    "/assets/smile.png", // Scenery
    "/assets/3.png", // Friends 2
    "/assets/manali.png", // Motorcycle
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=400&fit=crop", // Nature
];

export default function AboutMe() {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate text sliding up as it enters viewport
            gsap.fromTo(
                textRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%", // Starts animation when container's top hits 75% of viewport
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => ctx.revert(); // Cleanup GSAP
    }, []);

    return (
        <section className="relative w-full py-16 md:py-24 px-6 sm:px-10 bg-[#f5f5f3] dark:bg-black transition-colors duration-500 font-sans">
            <div
                ref={containerRef}
                className="max-w-5xl mx-auto bg-[#f8f9fa] dark:bg-black rounded-[2rem] grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 items-stretch overflow-hidden border-2 sm:border-4 border-white dark:border-white shadow-sm"
            >

                {/* Left Column: Text */}
                <div ref={textRef} className="flex flex-col justify-center gap-6 p-8 md:p-12 lg:p-16 lg:pr-8">
                    <h2 className="text-[20px] font-semibold text-[#102737] dark:text-white mb-1" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
                        About me
                    </h2>

                    <p className="text-[16px] leading-[24px] text-[#47525a] dark:text-white" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
                        Hi, I’m Pratham Chavhan — a passionate Full Stack Developer and Designer who loves building modern, user-friendly web applications.
                    </p>

                    <p className="text-[16px] leading-[24px] text-[#47525a] dark:text-white" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
                        I enjoy turning ideas into real-world products using technologies like Next.js, React, Node.js, along with clean UI/UX design. I focus on creating fast, responsive, and visually appealing applications that deliver great user experiences.
                    </p>
                    <p className="text-[16px] leading-[24px] text-[#47525a] dark:text-white" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
                        I have experience working on projects like web apps, dashboards, and creative platforms, where I combine design + development to build impactful and intuitive solutions.
                    </p>

                    <p className="text-[16px] leading-[24px] text-[#47525a] dark:text-white" style={{ fontFamily: '"Funnel Display", sans-serif' }}>
                        Beyond coding and designing, I’m always exploring new technologies, improving my skills, and working on innovative ideas.
                    </p>
                </div>

                {/* Right Column: Auto-Scrolling Images */}
                <div className="h-[450px] md:h-auto min-h-[450px] md:min-h-[500px] w-full relative flex gap-4 overflow-hidden pr-0 lg:pr-8 pb-0 pt-0">

                    {/* Column 1 - Scrolling UP */}
                    <div className="flex-1 overflow-hidden relative">
                        <motion.div
                            className="flex flex-col gap-4 absolute w-full"
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                                duration: 25,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {/* Duplicate array for seamless infinite scroll */}
                            {[...col1Images, ...col1Images].map((src, i) => (
                                <div key={i} className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden border-2 sm:border-4 border-white dark:border-white">
                                    <img src={src} alt="Lifestyle" className="w-full h-full object-cover" draggable={false} loading="lazy" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Column 2 - Scrolling DOWN */}
                    <div className="flex-1 overflow-hidden relative">
                        <motion.div
                            className="flex flex-col gap-4 absolute w-full"
                            animate={{ y: ["-50%", "0%"] }}
                            transition={{
                                duration: 30, // Slightly slower/faster for parallax feel
                                ease: "linear",
                                repeat: Infinity,
                            }}
                        >
                            {[...col2Images, ...col2Images].map((src, i) => (
                                <div key={i} className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden border-2 sm:border-4 border-white dark:border-white">
                                    <img src={src} alt="Lifestyle" className="w-full h-full object-cover" draggable={false} loading="lazy" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>

            </div>
        </section>
    );
}
