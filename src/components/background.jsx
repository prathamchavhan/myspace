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
            {/* ── Clouds / Sky — drifts down + slight zoom ──────────────────────── */}
            <motion.div
                className="absolute top-[0%] left-0 w-full h-[100%] will-change-transform"
                style={{ y: cloudsY, scale: cloudsScale, transformOrigin: "center top" }}
            >
                <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                    <img
                        srcSet="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png?scale-down-to=512 512w, https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png 1920w"
                        src="https://framerusercontent.com/images/9SnlRERg9iwp8HZyYEp7VtlP8P0.png"
                        alt="Clouds base"
                        decoding="auto"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "110%",
                            borderRadius: "inherit",
                            objectPosition: "center center",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </motion.div>

            {/* ── Mountain mid-ground — barely moves ────────────────────────────── */}
            <motion.div
                className="absolute top-[10%] inset-0 w-full h-full will-change-transform"
                style={{ y: mountainY }}
            >
                <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                    <img
                        srcSet="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png?scale-down-to=512 512w, https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png 1920w"
                        src="https://framerusercontent.com/images/snR7rLEQS23Ks0LjGdsp4ciM48.png"
                        alt="Mountain mid"
                        decoding="auto"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            objectPosition: "center center",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </motion.div>

            {/* ── City / Town foreground — shoots up fastest ────────────────────── */}
            {/* Changed 'inset-0' to 'top-[10%] left-0' to push the image down */}
            <motion.div
                className="absolute top-[7%] left-0 w-full h-full will-change-transform"
                style={{ y: townY }}
            >
                <div style={{ position: "absolute", borderRadius: "inherit", inset: "0px" }}>
                    <img
                        srcSet="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png?scale-down-to=512 512w, https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png?scale-down-to=1024 1024w, https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png 1920w"
                        src="https://framerusercontent.com/images/J1zm8vrw81ZeeRi4U0x0CQtcpgU.png"
                        alt="Town"
                        decoding="auto"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                            objectPosition: "center center",
                            objectFit: "cover",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Background;