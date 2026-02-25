import { Inter } from 'next/font/google';
import './globals.css';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pratham | Portfolio',
  description: 'A modern, dynamic portfolio built with Next.js, Framer Motion, and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen overflow-x-hidden`}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
