import { Inter, DM_Mono } from 'next/font/google';
import './globals.css';
import ClientProvider from '@/components/ClientProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata = {
  title: 'Pratham | Portfolio',
  description: 'A modern, dynamic portfolio built with Next.js, Framer Motion, and GSAP.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmMono.variable} ${inter.className} bg-background text-foreground antialiased min-h-screen overflow-x-hidden`}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}

