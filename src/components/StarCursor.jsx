"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StarCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        document.body.style.cursor = 'none';

        // Set cursor to none on all elements when hovering
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", updateMousePosition, { passive: true });

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            document.head.removeChild(style);
            document.body.style.cursor = 'auto';
        };
    }, []);

    // Also avoid rendering the cursor at 0,0 for a split second before mount
    if (!isMounted) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99999] text-yellow-400"
            // We removed mixBlendMode: 'difference' so the yellow color stays vibrant and doesn't invert
            animate={{
                x: mousePosition.x - 12,
                y: mousePosition.y - 12,
                rotate: 360,
            }}
            transition={{
                x: { type: "tween", ease: "linear", duration: 0 },
                y: { type: "tween", ease: "linear", duration: 0 },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
        >
            {/* Shining Yellow Star SVG */}
            <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                // Yellow glow drop shadow
                className="drop-shadow-[0_0_12px_rgba(250,204,21,1)]"
            >
                <path d="M12 1L14.59 8.41L22 11L14.59 13.59L12 21L9.41 13.59L2 11L9.41 8.41L12 1Z" />
            </svg>
        </motion.div>
    );
}






