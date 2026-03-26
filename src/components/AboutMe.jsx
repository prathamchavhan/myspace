"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
    { src: "/assets/image.png", alt: "Pratham outdoor", span: "row-span-2" },
    { src: "/assets/screenshot_1.png", alt: "Project screenshot 1", span: "" },
    { src: "/assets/screenshot_2.png", alt: "Project screenshot 2", span: "" },
    { src: "/assets/screenshot_3.png", alt: "Project screenshot 3", span: "" },
    { src: "/assets/image copy.png", alt: "Memory 1", span: "" },
    { src: "/assets/image copy 2.png", alt: "Memory 2", span: "" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
    }),
};

export default function AboutMe() {
    return (
        <section className="relative w-full bg-[#eef0f6] dark:bg-[#0d0d0d] py-20 px-6 sm:px-10 overflow-hidden transition-colors duration-500">
            {/* Subtle background pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{
                    backgroundImage: "radial-gradient(circle, #c7cad6 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    opacity: 0.45,
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16"
                >
                    {/* ── Left: Text ───────────────────────────────────────────── */}
                    <div className="flex flex-col gap-5 flex-1 min-w-0">
                        <motion.h2
                            variants={fadeUp}
                            custom={0}
                            className="text-2xl font-bold text-[#0f172a] dark:text-white tracking-tight"
                        >
                            About me
                        </motion.h2>

                        <motion.p variants={fadeUp} custom={1} className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                            I'm a Full Stack Developer who enjoys building things that feel
                            fast, clean, and purposeful — from robust backends to seamless
                            digital experiences.
                        </motion.p>

                        <motion.p variants={fadeUp} custom={2} className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                            I'm naturally curious, love solving real problems with code, and
                            enjoy asking <em>why</em> before jumping into the <em>how</em>. I care about
                            the small details that make software feel intuitive and human.
                        </motion.p>

                        <motion.p variants={fadeUp} custom={3} className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                            When I'm not coding, you'll find me gaming, exploring new tech,
                            hosting events, or picking up a random new skill just for fun.
                        </motion.p>

                        <motion.p variants={fadeUp} custom={4} className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300">
                            I believe great software is built at the intersection of
                            engineering craft and user empathy — that's where I do my best work.
                        </motion.p>

                        {/* Tags */}
                        <motion.div variants={fadeUp} custom={5} className="flex flex-wrap gap-2 mt-2">
                            {["Next.js", "Node.js", "Python", "PostgreSQL", "AI/ML", "Docker"].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: Photo Grid ─────────────────────────────────────── */}
                    <motion.div
                        variants={fadeUp}
                        custom={2}
                        className="flex-shrink-0 w-full lg:w-[340px] grid grid-cols-2 gap-2 auto-rows-[110px]"
                    >
                        {photos.map((photo, i) => (
                            <motion.div
                                key={i}
                                custom={i + 3}
                                variants={fadeUp}
                                className={`relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800 ${photo.span}`}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 150px, 160px"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
