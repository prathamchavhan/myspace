"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import AnimatedCursor from 'react-animated-cursor';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ThemeProvider } from 'next-themes';

export default function ClientProvider({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <AnimatedCursor
                    innerSize={8}
                    outerSize={35}
                    innerScale={1}
                    outerScale={1.5}
                    outerAlpha={0}
                    hasBlendMode={true}
                    outerStyle={{
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        mixBlendMode: 'difference'
                    }}
                    innerStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        mixBlendMode: 'difference'
                    }}
                />
                {children}
            </ThemeProvider>
        </Provider>
    );
}
