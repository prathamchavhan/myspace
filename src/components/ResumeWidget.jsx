"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

export default function ResumeWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const controls = useDragControls();

    return (
        <>
            {/* Draggable Desktop CV Icon */}
            <motion.div
                drag
                dragMomentum={false}
                className="fixed top-28 right-6 sm:absolute sm:top-36 lg:top-40 sm:right-10 lg:right-24 z-40 flex flex-col items-center justify-center gap-1.5 cursor-pointer group"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="View Resume"
            >
                {/* CV Icon wrapper */}
                <div className="relative w-14 h-14 ">
                    <Image
                        src="/assets/cv-icon.png"
                        alt="Resume/CV"
                        fill
                        className="object-contain p-2"
                        draggable={false}
                    />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700 select-none">
                    CV
                </span>
            </motion.div>

            {/* Modal Overlay Windows */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none p-4">

                        {/* Dim Backdrop behind modal */}
                        <motion.div
                            className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm pointer-events-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* PDF Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            drag
                            dragControls={controls}
                            dragMomentum={false}
                            // Prevents dragging from triggering if users interact with internal iframe scroll
                            dragListener={false}
                            className="pointer-events-auto relative w-full sm:w-[90vw] max-w-[800px] h-[85vh] sm:h-[80vh] bg-white dark:bg-[#1a1c23] sm:rounded-2xl rounded-xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col"
                        >
                            {/* Header / Nav Bar (Draggable Handler) */}
                            <motion.div
                                onPointerDown={(e) => controls.start(e)}
                                className="h-12 bg-gray-100 dark:bg-[#11131a] border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing shrink-0 transition-colors touch-none"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" onClick={() => setIsOpen(false)} />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                    <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400 select-none flex items-center gap-1.5">
                                        <FileText className="w-4 h-4" />
                                        pratham_resume.pdf
                                    </span>
                                </div>
                            </motion.div>

                            {/* Main PDF Viewer Body */}
                            <div className="flex-1 w-full bg-white dark:bg-black/50 relative">
                                <iframe
                                    src="/assets/resume.pdf#view=FitH"
                                    className="w-full h-full border-none inset-0 absolute"
                                    title="Resume PDF Viewer"
                                />
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
