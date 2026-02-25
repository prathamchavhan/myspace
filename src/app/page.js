"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from 'react-redux';
import { setContactModalOpen } from '@/redux/slices/uiSlice';
import { ThemeToggle } from '@/components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  // Framer motion scroll setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // GSAP Animations
  useEffect(() => {
    // Basic GSAP animation for hero text on mount
    gsap.fromTo(heroTextRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );

    // Scroll GSAP animation for cards
    gsap.utils.toArray('.gsap-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Placeholder EmailJS settings. Usually they come from process.env
    emailjs.send(
      'SERVICE_ID',
      'TEMPLATE_ID',
      formState,
      'PUBLIC_KEY'
    ).then(() => {
      alert("Email sent automatically (Simulated)");
      setIsSending(false);
      setFormState({ name: '', email: '', message: '' });
    }).catch((err) => {
      console.log('FAILED...', err);
      alert("Failed to send, check console. Note: Requires actual EmailJS credentials.");
      setIsSending(false);
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"
        style={{ y: backgroundY }}
      />

      {/* Header / Navbar */}
      <header className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            PRATHAM.
          </motion.h1>
          <div className="flex gap-4">
            <ThemeToggle />
            <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
              Let's Talk
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <div ref={heroTextRef} className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full glass text-sm font-medium border border-primary/30 text-primary">
              Available for new projects
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 pb-4">
            Creative <br /> Developer
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Crafting digital experiences with bleeding-edge technology. Next.js, Framer Motion, GSAP, and boundless imagination.
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200">
              View Work
            </Button>
            <Button size="lg" variant="outline" className="rounded-full glass border-white/20 hover:bg-white/10">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gradient">Expertise.</h2>
          <p className="text-muted-foreground text-lg">What I bring to the table.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Frontend Engineering", desc: "Building scalable, performant architectures in React and Next.js." },
            { title: "Animation & Motion", desc: "Bringing UIs to life with complex mathematics using GSAP and Framer." },
            { title: "UX/UI Design", desc: "Translating brand identities into pixel-perfect, accessible components." }
          ].map((service, idx) => (
            <Card key={idx} className="gsap-card glass border-white/10 bg-black/40 hover:bg-black/60 transition-colors duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">{service.title}</CardTitle>
                <CardDescription className="text-gray-400 text-base mt-2">{service.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-1 w-12 bg-primary rounded-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/10"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Get in touch</h2>
            <p className="text-muted-foreground">Ready to start your next project? Drop a message!</p>
          </div>

          <form onSubmit={sendEmail} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name</label>
              <Input
                required
                placeholder="John Doe"
                className="bg-black/50 border-white/10 focus-visible:ring-primary/50 placeholder:text-gray-600"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <Input
                required
                type="email"
                placeholder="hello@example.com"
                className="bg-black/50 border-white/10 focus-visible:ring-primary/50 placeholder:text-gray-600"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <Textarea
                required
                placeholder="How can I help you?"
                className="min-h-[150px] bg-black/50 border-white/10 focus-visible:ring-primary/50 placeholder:text-gray-600 resize-none"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl text-lg font-medium" disabled={isSending}>
              {isSending ? "Sending Journey..." : "Send Message"}
            </Button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-muted-foreground border-t border-white/10 glass mt-20 relative z-10">
        <p>© {new Date().getFullYear()} Pratham. Built with Next.js, Framer, and GSAP.</p>
      </footer>
    </div>
  );
}
