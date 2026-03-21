"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Lenis from 'lenis';
import { ThemeProvider } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ClientProvider({ children }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis for buttery smooth scrolling
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 1.5,
        });

        // Sync ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Tell GSAP to use Lenis's RAF loop
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Expose lenis globally so components can access it
        window.__lenis = lenis;

        return () => {
            // Let go of event handlers and cleanup
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
            delete window.__lenis;
        };
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </Provider>
    );
}
