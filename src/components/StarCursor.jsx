"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function PaperAeroplaneCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState(null);

    // Track raw mouse position for rotation calculation
    const rawX = useMotionValue(-200);
    const rawY = useMotionValue(-200);
    const prevX = useMotionValue(-200);
    const prevY = useMotionValue(-200);
    const [rotation, setRotation] = useState(0);

    // Fast spring for the plane itself
    const planeX = useSpring(-200, { damping: 35, stiffness: 700, mass: 0.15 });
    const planeY = useSpring(-200, { damping: 35, stiffness: 700, mass: 0.15 });

    // Slower spring for the trail dot
    const trailX = useSpring(-200, { damping: 25, stiffness: 200, mass: 0.6 });
    const trailY = useSpring(-200, { damping: 25, stiffness: 200, mass: 0.6 });

    useEffect(() => {
        setIsMounted(true);

        const style = document.createElement("style");
        style.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(style);

        let lastX = -200;
        let lastY = -200;

        const updateMousePosition = (e) => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            // Only update rotation if there's meaningful movement
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                // atan2 gives angle in radians; convert to degrees
                // Plane SVG points right by default, so offset by -45deg to point diagonally
                const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 45;
                setRotation(angle);
            }

            lastX = e.clientX;
            lastY = e.clientY;

            planeX.set(e.clientX);
            planeY.set(e.clientY);
            trailX.set(e.clientX);
            trailY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const cursorEl = e.target.closest('[data-cursor-text]');
            if (cursorEl) {
                setCursorText(cursorEl.getAttribute('data-cursor-text'));
            } else {
                setCursorText(null);
            }

            if (
                e.target.closest(
                    'a, button, input, [role="button"], [class*="cursor-grab"], [class*="cursor-pointer"]'
                )
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            document.head.removeChild(style);
        };
    }, [planeX, planeY, trailX, trailY]);

    if (!isMounted) return null;

    return (
        <>
            {/* Trail dot — small fading circle that lags behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99997]"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="rounded-full bg-[#0f172a] dark:bg-white"
                    animate={{
                        width: isHovering ? 6 : 4,
                        height: isHovering ? 6 : 4,
                        opacity: isHovering ? 0.15 : 0.25,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </motion.div>

            {/* Main Cursor (Aeroplane or Text) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{
                    x: planeX,
                    y: planeY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: cursorText ? 0 : rotation,
                }}
                animate={{
                    scale: cursorText ? 1 : (isHovering ? 1.35 : 1),
                    opacity: isHovering || cursorText ? 0.95 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {cursorText ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#0f172a] dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap shadow-xl"
                    >
                        {cursorText}
                    </motion.div>
                ) : (
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#0f172a] dark:text-white"
                    >
                        <path
                            d="M22 12 L2 4 L8 12Z"
                            fill="currentColor"
                            fillOpacity="0.9"
                        />
                        <path
                            d="M22 12 L2 4 L8 12 L2 20Z"
                            fill="currentColor"
                            fillOpacity="0.45"
                        />
                        <line
                            x1="22"
                            y1="12"
                            x2="8"
                            y2="12"
                            stroke="currentColor"
                            strokeOpacity="0.5"
                            strokeWidth="0.75"
                        />
                        <path
                            d="M8 12 L5 9 L2 4Z"
                            fill="currentColor"
                            fillOpacity="0.65"
                        />
                    </svg>
                )}
            </motion.div>
        </>
    );
}