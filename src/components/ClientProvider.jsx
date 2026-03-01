"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import StarCursor from '@/components/StarCursor';
import { ThemeToggle } from '@/components/ThemeToggle';
import Lenis from 'lenis';
import { ThemeProvider } from 'next-themes';

export default function ClientProvider({ children }) {
    useEffect(() => {
        // Initialize Lenis for buttery smooth scrolling
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 1.5,
        });

        // Use RAF loop for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        const rafId = requestAnimationFrame(raf);

        // Expose lenis globally so components can access it
        window.__lenis = lenis;

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            delete window.__lenis;
        };
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <StarCursor />

                {/* Dark theme toggle on top right */}
                <div className="fixed top-6 right-6 z-[100]">
                    <ThemeToggle />
                </div>
                {children}
            </ThemeProvider>
        </Provider>
    );
}
