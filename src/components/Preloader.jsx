"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoaderCounter from "./LoaderCounter";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Prevent scroll while loading
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Fake loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 8) + 2;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 800);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = '';
        };
    }, [loading]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-white dark:bg-[#0f172a] text-[#0f172a] dark:text-white flex flex-col items-center justify-center font-mono select-none"
                >
                    <div className="w-full max-w-sm px-6">

                        {/* Loading Bar */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-xl font-bold tracking-widest uppercase flex items-center gap-2">
                                <LoaderCounter value={Math.min(100, Math.floor(progress))} end={Math.min(100, Math.floor(progress))} />%
                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}