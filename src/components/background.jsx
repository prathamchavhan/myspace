// "use client";

// import { useRef, useEffect } from "react";
// import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

// const Background = () => {
//     const containerRef = useRef(null);


//     const lenisScrollY = useMotionValue(0);

//     useEffect(() => {
//         const tryBind = () => {
//             if (window.__lenis) {
//                 window.__lenis.on('scroll', ({ scroll }) => {
//                     lenisScrollY.set(scroll);
//                 });
//                 return true;
//             }
//             return false;
//         };

//         if (!tryBind()) {
//             // Retry until ClientProvider has initialised Lenis (max ~500 ms)
//             const timer = setInterval(() => {
//                 if (tryBind()) clearInterval(timer);
//             }, 50);
//             return () => clearInterval(timer);
//         }
//     }, [lenisScrollY]);

//     // ─── Section-relative scroll progress ─────────────────────────────────────
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start end", "end start"],
//     });

//     // ─── Parallax layer transforms ─────────────────────────────────────────────
//     // Clouds drift DOWN slowly (classic parallax)
//     const cloudsY = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);

//     // Mountains stay nearly still — subtle depth cue
//     const mountainY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

//     // Town / city foreground moves UP faster — strongest depth effect
//     const townY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

//     // Gentle scale on clouds for a zoom feel
//     const cloudsScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

//     return (
//         <div
//             ref={containerRef}
//             className="relative w-full h-full overflow-hidden pointer-events-none"
//         >
//             {/* ── Clouds / Sky — drifts down + slight zoom ──────────────────────── */}
//             <motion.div
//                 className="absolute -top-[10%] left-0 w-full h-[109%] will-change-transform"
//                 style={{ y: cloudsY, scale: cloudsScale, transformOrigin: "center top" }}
//             >
//                 <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
//                     <img
//                         srcSet="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png?scale-down-to=512 512w, https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png 1920w"
//                         src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png"
//                         alt="Clouds base"
//                         decoding="auto"
//                         style={{
//                             display: "block",
//                             width: "100%",
//                             height: "120%",
//                             borderRadius: "inherit",
//                             objectPosition: "center center",
//                             objectFit: "cover",
//                         }}
//                     />
//                 </div>
//             </motion.div>

//             {/* ── Mountain mid-ground — barely moves ────────────────────────────── */}
//             <motion.div
//                 className="absolute inset-0 w-full h-full will-change-transform"
//                 style={{ y: mountainY }}
//             >
//                 <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
//                     <img
//                         srcSet="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png?scale-down-to=512 512w, https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png 1920w"
//                         src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png"
//                         alt="Mountain mid"
//                         decoding="auto"
//                         style={{
//                             display: "block",
//                             width: "100%",
//                             height: "100%",
//                             borderRadius: "inherit",
//                             objectPosition: "center center",
//                             objectFit: "cover",
//                         }}
//                     />
//                 </div>
//             </motion.div>

//             {/* ── City / Town foreground — shoots up fastest ────────────────────── */}
//             <motion.div
//                 className="absolute inset-0 w-full h-full will-change-transform"
//                 style={{ y: townY }}
//             >
//                 <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
//                     <img
//                         srcSet="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png?scale-down-to=512 512w, https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png 1920w"
//                         src="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png"
//                         alt="Town"
//                         decoding="auto"
//                         style={{
//                             display: "block",
//                             width: "100%",
//                             height: "100%",
//                             borderRadius: "inherit",
//                             objectPosition: "center center",
//                             objectFit: "cover",
//                         }}
//                     />
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Background;






"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const Background = () => {
    const containerRef = useRef(null);

    const lenisScrollY = useMotionValue(0);

    useEffect(() => {
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
            // Retry until ClientProvider has initialised Lenis (max ~500 ms)
            const timer = setInterval(() => {
                if (tryBind()) clearInterval(timer);
            }, 50);
            return () => clearInterval(timer);
        }
    }, [lenisScrollY]);

    // ─── Section-relative scroll progress ─────────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // ─── Parallax layer transforms ─────────────────────────────────────────────
    // Clouds drift DOWN slowly (classic parallax)
    const cloudsY = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);

    // Mountains stay nearly still — subtle depth cue
    const mountainY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);

    // Town / city foreground moves UP faster — strongest depth effect
    const townY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

    // Gentle scale on clouds for a zoom feel
    const cloudsScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden pointer-events-none"

        >
            {/* 1. PHONE DESIGN (Visible on screens smaller than 768px) */}
            {/* On mobile, we zoom the images in significantly and shift them up to close the massive blue sky gap */}
            <div className="block md:hidden absolute inset-0 w-full h-full">
                {/* Mobile Clouds - Shifted UP and scaled to fill the gap */}
                <motion.div className="absolute top-[0%] left-[-30%] w-[160%] h-[120%] will-change-transform origin-top" style={{ y: cloudsY, scale: cloudsScale }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png" alt="Clouds base"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center 70%", objectFit: "cover" }} />
                    </div>
                </motion.div>
                {/* Mobile Mountain - Shifted slightly up */}
                <motion.div className="absolute top-[5%] left-[-20%] w-[140%] h-[110%] will-change-transform" style={{ y: mountainY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png" alt="Mountain mid"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center bottom", objectFit: "cover" }} />
                    </div>
                </motion.div>
                {/* Mobile Town - Positioned securely at the bottom */}
                <motion.div className="absolute top-[15%] left-[-15%] w-[130%] h-[100%] will-change-transform" style={{ y: townY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png" alt="Town"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center top", objectFit: "cover" }} />
                    </div>
                </motion.div>
            </div>

            {/* 2. TABLET DESIGN (Visible between 768px and 1024px) */}
            <div className="hidden md:block lg:hidden absolute inset-0 w-full h-full">
                {/* Tablet Clouds */}
                <motion.div className="absolute top-[0%] left-[-10%] w-[120%] h-[122%] origin-top will-change-transform" style={{ y: cloudsY, scale: cloudsScale }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png" alt="Clouds base"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                </motion.div>
                {/* Tablet Mountain */}
                <motion.div className="absolute top-[2%] left-0 w-full h-[105%] will-change-transform" style={{ y: mountainY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png" alt="Mountain mid"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center bottom", objectFit: "cover" }} />
                    </div>
                </motion.div>
                {/* Tablet Town */}
                <motion.div className="absolute top-[10%] left-0 w-full h-[100%] will-change-transform" style={{ y: townY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png" alt="Town"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center top", objectFit: "cover" }} />
                    </div>
                </motion.div>
            </div>

            {/* 3. STANDARD LAPTOP DESIGN (Visible between 1024px and 1280px) */}
            <div className="hidden lg:block xl:hidden absolute inset-0 w-full h-full">
                <motion.div className="absolute top-[0%] left-0 w-full h-[122%] origin-top will-change-transform" style={{ y: cloudsY, scale: cloudsScale }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png" alt="Clouds base"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                </motion.div>
                <motion.div className="absolute top-[5%] left-0 w-full h-[100%] will-change-transform" style={{ y: mountainY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png" alt="Mountain mid"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                </motion.div>
                <motion.div className="absolute top-[10%] left-0 w-full h-[100%] will-change-transform" style={{ y: townY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png" alt="Town"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center top", objectFit: "cover" }} />
                    </div>
                </motion.div>
            </div>

            {/* 4. MAC M4 / LARGE DISPLAY DESIGN (Visible on 1280px and above) */}
            <div className="hidden xl:block absolute inset-0 w-full h-full">

                <motion.div className="absolute top-[1%] left-0 w-full h-[122%] origin-top will-change-transform" style={{ y: cloudsY, scale: cloudsScale }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png" alt="Clouds base"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                </motion.div>
                <motion.div className="absolute top-[18%] left-0 w-full h-[100%] will-change-transform" style={{ y: mountainY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png" alt="Mountain mid"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                </motion.div>
                <motion.div className="absolute top-[18%] left-0 w-full h-[100%] will-change-transform" style={{ y: townY }}>
                    <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                        <img src="/assets/city.png" alt="Town"
                            style={{ display: "block", width: "100%", height: "100%", objectPosition: "center top", objectFit: "cover" }} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Background;