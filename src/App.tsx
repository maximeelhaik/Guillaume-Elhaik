/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronRight,
  Quote,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import { LogoHorizontal, LogoIcon, LogoAvocat, LogoFullName } from './components/Logos';

// --- Img Imports for Vite/Vercel compatibility ---
import heroBg from './assets/images/hero_bg.png';
import guillaumeHero from './assets/images/guillaume1-R.jpg';
import cabinetOffice from './assets/images/cabinet_office.png';
import expertiseEtrangers from './assets/images/expertise_etrangers.png';
import expertiseNationalite from './assets/images/expertise_nationalite.png';
import expertiseProcessuel from './assets/images/expertise_processuel.png';

import t1Img from './assets/images/hansjorg-keller-m_-8_AhhJjE-unsplash.jpg';
import t2Img from './assets/images/kateryna-hliznitsova--v2MxvXK9OU-unsplash.jpg';
import t3Img from './assets/images/julio-wolf-OG1cF0cWPfo-unsplash.jpg';
import t4Img from './assets/images/pierre-antona-wbWrY4NZLZc-unsplash.jpg';

// --- Utilities ---

/**
 * Utility to get a high-quality placeholder image from Unsplash.
 * This can be used to "automatically" populate sections with dynamic content.
 */
const getUnsplashUrl = (keyword: string, width = 1200, height = 800) => {
  return `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=${width}&keyword=${keyword}`;
  // For truly random: return `https://source.unsplash.com/featured/${width}x${height}/?${keyword}`;
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Le Cabinet', href: '#about' },
    { name: 'Expertises', href: '#expertise' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (id === '#' || id === '') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80; // Compensate for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-acajou/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={(e) => scrollToSection(e as any, '#')}>
            <LogoIcon className={`transition-colors duration-300 w-8 h-10 ${scrolled ? 'text-porcelaine' : 'text-lin'}`} />
            <LogoHorizontal className={`transition-colors duration-300 h-8 ${scrolled ? 'text-porcelaine' : 'text-lin'}`} />
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={(e) => scrollToSection(e, '#contact')}
              className={`btn-interactive rounded-sm px-4 py-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-lin hover:text-porcelaine' : 'text-porcelaine hover:text-lin'}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Consultation Gratuite
            </button>
            <button onClick={() => setIsOpen(true)} aria-label="Ouvrir le menu principal" className={`btn-interactive rounded-sm min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 ${scrolled ? 'text-porcelaine' : 'text-lin'}`}
            >
              <Menu size={32} />
            </button>
          </div>

          <button className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2" aria-label="Ouvrir le menu principal" onClick={() => setIsOpen(true)}
          >
            <Menu size={32} className={scrolled ? 'text-porcelaine' : 'text-lin'} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-acajou text-porcelaine flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-porcelaine/5">
              <div className="flex items-center gap-3">
                <LogoIcon className="text-lin w-8 h-10" />
                <LogoHorizontal className="text-porcelaine h-10" />
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center p-2" aria-label="Fermer le menu">
                <X size={40} />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-6 md:p-20 gap-8 md:gap-16 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center gap-3 md:gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="font-serif text-[32px] sm:text-4xl md:text-8xl hover:text-lin transition-all duration-300 italic hover:pl-4 leading-tight"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="md:w-1/3 flex flex-col justify-center gap-6 md:gap-12 border-t md:border-t-0 md:border-l border-porcelaine/10 pt-6 md:pt-0 md:pl-16">
                <div className="space-y-4">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-xs font-sans font-light">Contact</h4>
                  <p className="text-2xl md:text-3xl font-serif italic">06 67 83 64 43</p>
                  <p className="text-lg opacity-50 hover:opacity-100 transition-opacity cursor-pointer">g.elhaik.avocat@gmail.com</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-xs font-sans font-light">Adresse</h4>
                  <p className="text-xl opacity-70 leading-relaxed">16 rue Saint-Simon<br />78000 Versailles</p>
                </div>
                <div className="flex flex-wrap gap-6">
                  {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                    <a key={social} href="#" aria-label={`Lien vers ${social}`} className="text-sm uppercase tracking-widest hover:text-lin transition-colors border-b border-transparent hover:border-lin pb-1 min-h-[44px] flex items-center">{social}</a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Layer 1: Background (Deepest) - Moves backward
  const bgY = useTransform(scrollY, [0, 1000], [0, 250]);

  // Layer 2: Decorative background Name "Elhaik"
  const nameY = useTransform(scrollY, [0, 1000], [0, 100]);

  // Layer 3: Portrait Image (Middle)
  const imgY = useTransform(scrollY, [0, 1000], [0, 0]);

  // Layer 4: Texts and CTA (Top/Front) - Moves slightly up (reverse parallax)
  const textY = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section className="sticky top-0 h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-acajou -z-10">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        style={{ y: bgY }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img
          src={heroBg}
          alt="Arrière-plan texturé flou du cabinet" loading="lazy" decoding="async"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
        />
      </motion.div>

      <motion.div
        animate={{ x: ['-200%', '300%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-porcelaine to-transparent skew-x-[30deg] z-0 pointer-events-none mix-blend-overlay"
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mt-[-60px] md:mt-0">
        <motion.div style={{ y: textY }} className="md:col-span-4 block relative z-40">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-porcelaine/60 text-base md:text-xl leading-relaxed max-w-xs font-sans font-light"
          >
            Expertise juridique rigoureuse et défense engagée au cœur de Versailles. Expérience en droit des étrangers et de la nationalité.
          </motion.h1>
        </motion.div>

        <div className="md:col-span-4 flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ 
              opacity: 1, 
              y: [0, -15, 0],
            }}
            style={{ y: imgY }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
            }}
            className="btn-interactive relative w-56 h-[320px] md:w-96 md:h-[600px] z-20 rounded-sm"
          >
            <div className="absolute inset-0 bg-grenat/20 mix-blend-overlay z-10 rounded-sm"></div>
            <img
              src={guillaumeHero}
              alt="Guillaume Elhaik, Avocat spécialisé au Tribunal de Versailles"
              className="w-full h-full object-cover rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            />

          </motion.div>
        </div>

        <motion.div style={{ y: textY }} className="md:col-span-4 flex flex-col items-end text-right gap-12 relative z-40">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col gap-3"
          >
            <a href="tel:0139500000" className="text-lin text-3xl md:text-4xl font-serif hover:text-porcelaine transition-all duration-300 italic">
              06 67 83 64 43
            </a>
            <p className="text-porcelaine/60 text-xs uppercase tracking-[0.3em] font-sans font-light">Ligne directe cabinet</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col gap-3"
          >
            <a href="mailto:g.elhaik.avocat@gmail.com" className="text-lin text-3xl md:text-4xl font-serif hover:text-porcelaine transition-all duration-300 italic">
              g.elhaik.avocat@gmail.com
            </a>
            <p className="text-porcelaine/60 text-xs uppercase tracking-[0.3em] font-sans font-light">Étude de votre dossier</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={{ y: textY }} className="absolute bottom-6 md:bottom-10 left-0 right-0 flex flex-col items-center z-30 pointer-events-none">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <LogoFullName className="text-lin w-[95vw] md:w-[85vw] max-w-[900px] drop-shadow-2xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            className="-mt-8 md:-mt-16"
          >
            <LogoAvocat className="text-lin h-12 md:h-28 drop-shadow-xl" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-lin/40"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-12 md:py-56 px-6 bg-porcelaine relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lin/5 -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start relative z-10">
        <div className="md:col-span-3">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-grenat mb-4 md:mb-8"
          >
            Le Cabinet
          </motion.h3>
        </div>

        <div className="md:col-span-9 flex flex-col gap-10 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <p className="font-serif text-[28px] md:text-7xl leading-[1.1] text-acajou italic text-balance">
              “Une expertise forgée par des centaines de décisions rendues par les plus hautes juridictions administratives.”
            </p>
            <div className="mt-6 md:mt-16 flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                className="w-48 h-24 md:w-64 md:h-32 relative"
              >
                <img src="https://framerusercontent.com/images/VCNSEUHw9CEtEpV1IRrCnP4RJwE.svg" alt="Signature graphique" loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-8">
              <p className="text-2xl text-acajou/70 leading-relaxed font-light">
                Le Cabinet de Maître Guillaume Elhaik est situé à Versailles. Il intervient principalement devant le Tribunal administratif de Cergy-Pontoise, le Tribunal administratif de Versailles et la Cour d'appel de Versailles.
              </p>
              <p className="text-lg text-acajou/80 leading-relaxed">
                Ces décisions témoignent de la compétence et de l’expertise du cabinet en droit des étrangers et de la nationalité, ainsi qu'en droit processuel.
              </p>
              <motion.button
                whileHover={{ x: 10 }}
                className="btn-interactive rounded-sm px-6 py-4 bg-acajou/5 flex items-center gap-6 text-acajou font-bold uppercase tracking-[0.2em] text-xs border border-acajou/10"
              >
                Découvrir mon parcours <ArrowRight size={18} className="text-grenat" />
              </motion.button>
            </div>
            <div className="aspect-[4/3] bg-acajou/5 rounded-sm overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-grenat/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img
                src={cabinetOffice}
                alt="Intérieur du cabinet d'avocats à Versailles" loading="lazy" decoding="async"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const areas = [
    {
      id: "01",
      title: "Droit des Étrangers",
      desc: "Accompagnement stratégique pour titres de séjour, visas et protection contre les mesures d'éloignement (OQTF).",
      img: expertiseEtrangers
    },
    {
      id: "02",
      title: "Nationalité Française",
      desc: "Expertise pointue en naturalisation, réintégration et contentieux du certificat de nationalité française.",
      img: expertiseNationalite
    },
    {
      id: "03",
      title: "Droit Processuel",
      desc: "Maîtrise rigoureuse des règles de procédure pour sécuriser vos recours devant les juridictions administratives.",
      img: expertiseProcessuel
    }
  ];

  return (
    <section id="expertise" className="py-12 md:py-56 px-6 bg-acajou text-porcelaine relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-32">
          <div className="md:col-span-3">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lin"
            >
              Expertises
            </motion.h3>
          </div>
          <div className="md:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-8xl leading-[1.1] italic text-balance"
            >
              Une défense <span className="text-lin">d'excellence</span> pour chaque dossier.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="btn-interactive group flex flex-col rounded-sm h-[320px] md:h-auto"
            >
              <div className="relative w-full h-full md:aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                {/* Red Overlay - Appears only on hover */}
                <div className="absolute inset-0 bg-grenat/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
                
                {/* Background Image - Less grayscale on hover */}
                <img
                  src={area.img}
                  alt={area.title}
                  className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Top Content: Title + ID */}
                <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start gap-4">
                  <h4 className="font-serif text-2xl md:text-3xl text-porcelaine group-hover:text-lin transition-colors duration-300 leading-tight">
                    {area.title}
                  </h4>
                  <span className="font-serif text-3xl md:text-5xl text-lin/30 italic shrink-0 group-hover:text-porcelaine/20 transition-colors">
                    {area.id}
                  </span>
                </div>
                
                {/* Bottom Content: Description */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p className="text-porcelaine/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {area.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Transform scroll progress to horizontal translation
  // We have 4 items = 400vw total width. We need to move by -75% to show the last one.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Image parallax effect inside the container
  const imgX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const testimonialsData = [
    {
      id: 1,
      quote: "Je tiens à exprimer toute ma satisfaction concernant le travail de Maître El Haik. Son professionnalisme, sa disponibilité et sa clarté ont été d'une grande aide tout au long du dossier.",
      author: "Jaouadi H.",
      meta: "Accompagnement Juridique · 2026",
      img: t1Img,
      layoutReversed: false,
    },
    {
      id: 2,
      quote: "Après un long parcours face à l'administration, la stratégie de Maître Elhaik a fait toute la différence devant le juge. Une rigueur impressionnante.",
      author: "Sylvie C.",
      meta: "Contentieux Administratif · 2024",
      img: t2Img,
      layoutReversed: true,
    },
    {
      id: 3,
      quote: "Une approche humaine et très réactive. Le cabinet m'a accompagné avec clarté dès le premier rendez-vous jusqu'à l'obtention de mon titre.",
      author: "Hassan R.",
      meta: "Titre de séjour · 2025",
      img: t3Img,
      layoutReversed: false,
    },
    {
      id: 4,
      quote: "Un professionnalisme exceptionnel. Maître Elhaik prend le temps d'expliquer chaque détail, et son engagement pour son client est total.",
      author: "Elena M.",
      meta: "Regroupement familial · 2023",
      img: t4Img,
      layoutReversed: true,
    }
  ];

  return (
    <section ref={targetRef} id="testimonials" className="relative h-[400vh] bg-porcelaine">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section Title - Fixed during scroll */}
        <div className="absolute top-12 md:top-24 left-6 md:left-[10%] z-20 pointer-events-none">
          <h3 className="text-grenat mix-blend-multiply opacity-80 md:opacity-100">Témoignages</h3>
        </div>

        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center will-change-transform">
          {testimonialsData.map((t, index) => {
            return (
              <div key={t.id} className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-0 relative">
                
                {/* Decorative background element per card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-acajou/[0.02] font-serif text-[40vh] md:text-[60vh] italic font-bold pointer-events-none select-none">
                  0{index + 1}
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20 items-center relative z-10">
                  
                  {/* TEXT CONTENT */}
                  <div className={`flex flex-col gap-6 md:gap-12 relative order-2 ${t.layoutReversed ? 'md:order-2 md:col-span-6 md:col-start-7' : 'md:order-1 md:col-span-6 md:col-start-2'}`}>
                    <Quote className="text-lin/40 hidden md:block" size={60} strokeWidth={1} />
                    <Quote className="text-lin/40 block md:hidden mb-[-10px] ml-4" size={40} strokeWidth={1} />

                    <p className="font-serif text-2xl md:text-5xl leading-tight md:leading-[1.2] text-acajou italic text-balance mt-4 md:mt-0 px-4 md:px-0">
                      “{t.quote}”
                    </p>
                    
                    <div className="flex flex-col px-4 md:px-0 border-l border-lin/30 pl-4 md:pl-8 ml-2 mt-4 md:mt-6">
                      <p className="font-bold text-acajou uppercase tracking-widest text-xs md:text-sm">{t.author}</p>
                      <p className="text-acajou/60 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-1 font-sans font-light">{t.meta}</p>
                    </div>
                  </div>

                  {/* IMAGE CONTENT */}
                  <div className={`order-1 ${t.layoutReversed ? 'md:order-1 md:col-span-4 md:col-start-2' : 'md:order-2 md:col-span-4 md:col-start-8'} flex justify-center mt-24 md:mt-0 relative`}>
                    
                    {/* Mobile Bubble Layout */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="block md:hidden w-36 h-36 rounded-full overflow-hidden border-4 border-porcelaine shadow-2xl -mb-12 relative z-10"
                    >
                      <img
                        src={t.img}
                        alt={`Photo de ${t.author}`} loading="lazy" decoding="async"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    
                    {/* Desktop Parallax Rectangle Layout */}
                    <div
                      className={`hidden md:block w-full bg-acajou/5 rounded-sm overflow-hidden relative shadow-2xl transition-all duration-700 ${index % 2 === 0 ? 'aspect-[3/4] mt-0' : 'aspect-square mt-24'}`}
                    >
                      <motion.img
                        style={{ x: imgX }}
                        src={t.img}
                        alt={`Photo illustrative de ${t.author}`} loading="lazy" decoding="async"
                        className="w-[120%] h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: "Comment se déroule le premier rendez-vous ?",
      a: "J'analyse votre situation juridique, j'étudie vos documents et je définis avec vous la meilleure stratégie à adopter. Un devis transparent vous est remis à l'issue."
    },
    {
      q: "Intervenez-vous partout en France ?",
      a: "Bien que basé à Versailles, j'interviens devant toutes les juridictions administratives françaises pour les dossiers de droit des étrangers et de nationalité."
    },
    {
      q: "Quels sont vos honoraires ?",
      a: "Mes honoraires sont fixés en toute transparence, généralement au forfait selon la complexité du dossier. Une convention d'honoraires est systématiquement signée."
    },
    {
      q: "Quel est le délai pour un recours OQTF ?",
      a: "Les délais sont extrêmement courts (souvent 48h, 15 jours ou 30 jours). Il est impératif de me contacter dès réception de la décision."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-56 px-6 bg-porcelaine relative">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-grenat mb-10 md:mb-20"
        >
          Questions Fréquentes
        </motion.h3>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-acajou/10 transition-all duration-300 ${openIndex === i ? 'pb-12' : 'pb-8'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group py-4"
              >
                <span className={`font-serif text-3xl md:text-5xl transition-all duration-300 ${openIndex === i ? 'text-grenat italic' : 'text-acajou/80 group-hover:text-acajou'}`}>
                  {item.q}
                </span>
                <div className={`w-10 h-10 rounded-full border border-acajou/10 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-acajou text-porcelaine' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-8 text-xl md:text-2xl text-acajou/80 leading-relaxed font-light max-w-2xl">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    domain: 'Droit des étrangers',
    message: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Real-time validation clearing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleBlur = (field: keyof typeof errors) => {
    if (!formData[field]) {
      setErrors(prev => ({ ...prev, [field]: 'Ce champ est requis' }));
    } else if (field === 'email' && !validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Adresse email invalide' }));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Voulez-vous vraiment effacer tout le formulaire ?')) {
      setFormData({ firstName: '', lastName: '', email: '', domain: 'Droit des étrangers', message: '' });
      setErrors({ firstName: '', lastName: '', email: '', message: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all
    let hasErrors = false;
    const newErrors = { ...errors };
    ['firstName', 'lastName', 'email', 'message'].forEach(field => {
      const key = field as keyof typeof errors;
      if (!formData[key]) {
        newErrors[key] = 'Ce champ est requis';
        hasErrors = true;
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Adresse email invalide';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Process valid submission (mock)
    alert('Formulaire envoyé avec succès !');
    setFormData({ firstName: '', lastName: '', email: '', domain: 'Droit des étrangers', message: '' });
  };

  return (
    <section id="contact" className="py-12 md:py-56 px-6 bg-acajou text-porcelaine relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 relative z-10">
        <div className="flex flex-col gap-10 md:gap-16">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lin mb-12"
            >
              Contact
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-6xl md:text-8xl leading-[1] italic text-balance"
            >
              Parlons de votre <span className="text-lin">projet</span>.
            </motion.h2>
          </div>

          <div className="space-y-8 md:space-y-12">
            {[
              { icon: Phone, label: "Téléphone", value: "06 67 83 64 43" },
              { icon: Mail, label: "Email", value: "g.elhaik.avocat@gmail.com" },
              { icon: MapPin, label: "Adresse", value: "16 rue Saint-Simon, 78000 Versailles" }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="btn-interactive flex items-start gap-5 md:gap-8 group cursor-pointer p-4 -ml-4 rounded-sm"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-porcelaine/5 rounded-full flex items-center justify-center group-hover:bg-lin group-hover:text-acajou transition-all duration-300">
                  <item.icon className="w-5 h-5 md:w-7 md:h-7 text-lin group-hover:text-acajou transition-colors" />
                </div>
                <div>
                  <p className="text-lin/60 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-sans font-light mb-1 md:mb-2">{item.label}</p>
                  <p className="text-[20px] md:text-3xl font-serif italic group-hover:text-lin transition-colors duration-300 leading-tight">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-grenat p-6 md:p-16 rounded-sm backdrop-blur-sm shadow-2xl"
        >
          <form className="space-y-6 md:space-y-10" onSubmit={handleSubmit}>
            <div className="flex justify-end -mb-4 md:-mb-0">
              <button
                type="button"
                onClick={handleClear}
                className="text-xs uppercase tracking-[0.2em] font-bold text-porcelaine/40 hover:text-porcelaine min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300"
              >
                Tout effacer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-2 md:space-y-3 relative">
                <label htmlFor="firstName" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-lin font-bold block">Prénom</label>
                <input id="firstName" value={formData.firstName} onChange={handleChange} onBlur={() => handleBlur('firstName')} type="text" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Jean" aria-invalid={!!errors.firstName} />
                {errors.firstName && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.firstName}</span>}
              </div>
              <div className="space-y-2 md:space-y-3 relative">
                <label htmlFor="lastName" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-lin font-bold block">Nom</label>
                <input id="lastName" value={formData.lastName} onChange={handleChange} onBlur={() => handleBlur('lastName')} type="text" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Dupont" aria-invalid={!!errors.lastName} />
                {errors.lastName && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.lastName}</span>}
              </div>
            </div>
            <div className="space-y-2 md:space-y-3 relative">
              <label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-lin font-bold block">Email</label>
              <input id="email" value={formData.email} onChange={handleChange} onBlur={() => handleBlur('email')} type="email" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="jean.dupont@email.com" aria-invalid={!!errors.email} />
              {errors.email && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.email}</span>}
            </div>
            <div className="space-y-2 md:space-y-3 relative">
              <label htmlFor="domain" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-lin font-bold block">Domaine concerné</label>
              <div className="relative">
                <select id="domain" value={formData.domain} onChange={handleChange} className="w-full bg-transparent border-b border-porcelaine/20 py-2 md:py-4 focus:border-lin outline-none transition-all duration-300 appearance-none cursor-pointer text-porcelaine text-base md:text-lg">
                  <option className="bg-acajou">Droit des étrangers</option>
                  <option className="bg-acajou">Nationalité française</option>
                  <option className="bg-acajou">Contentieux administratif</option>
                  <option className="bg-acajou">Autre demande</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-lin/40" size={16} />
              </div>
            </div>
            <div className="space-y-2 md:space-y-3 relative">
              <label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-lin font-bold block">Message</label>
              <textarea id="message" value={formData.message} onChange={handleChange} onBlur={() => handleBlur('message')} rows={3} className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 resize-y min-h-[60px] md:min-h-[120px] placeholder:text-porcelaine/30 text-base md:text-lg ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Décrivez brièvement votre situation..." aria-invalid={!!errors.message}></textarea>
              {errors.message && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.message}</span>}
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="btn-interactive w-full py-4 md:py-8 min-h-[44px] bg-lin text-acajou font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-porcelaine transition-all duration-300 shadow-xl rounded-sm mt-4 md:mt-8"
            >
              Envoyer la demande
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-acajou border-t border-porcelaine/5 text-porcelaine/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-4 group cursor-pointer">
          <LogoIcon className="w-8 h-10 text-lin/50 group-hover:text-lin transition-colors" />
          <LogoHorizontal className="h-8 text-porcelaine/80" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] font-medium">© 2026 Cabinet Guillaume Elhaik. Tous droits réservés.</p>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold">
            <a href="#" className="hover:text-lin transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-lin transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-lin transition-colors">Cookies</a>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {[{ k: 'LinkedIn', i: Linkedin }, { k: 'Twitter', i: Twitter }, { k: 'Instagram', i: Instagram }].map(social => (
            <button aria-label={`Aller sur ${social.k}`} key={social.k} className="btn-interactive w-12 h-12 min-w-[44px] min-h-[44px] rounded-full border border-porcelaine/10 flex items-center justify-center hover:border-lin hover:text-lin transition-all duration-300 cursor-pointer text-xs font-bold">
              <social.i size={20} />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative selection:bg-lin selection:text-acajou">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
