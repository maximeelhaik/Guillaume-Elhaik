/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from 'motion/react';
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
import heroBg from './assets/images/hero_bg.webp';
import fondHero from './assets/images/fond-hero.svg';
import guillaumeSilhouette from './assets/images/Guillaume silhouette.png';
import guillaumeHero from './assets/images/guillaume1-R.webp';
import cabinetOffice from './assets/images/cabinet_office.webp';
import expertiseEtrangers from './assets/images/expertise_etrangers.webp';
import expertiseNationalite from './assets/images/expertise_nationalite.webp';
import expertiseProcessuel from './assets/images/expertise_processuel.webp';

import t1Img from './assets/images/hansjorg-keller-m_-8_AhhJjE-unsplash.webp';
import t2Img from './assets/images/kateryna-hliznitsova-v2MxvXK9OU-unsplash.webp';
import t3Img from './assets/images/julio-wolf-OG1cF0cWPfo-unsplash.webp';
import t4Img from './assets/images/pierre-antona-wbWrY4NZLZc-unsplash.webp';
import signatureImg from './assets/images/signature.svg';
import carbonFibreImg from './assets/images/carbon-fibre.png';
import logoPorcelaine from './assets/logos/ELHAIK-porcelaine.svg';


const NAV_LINKS = [
  { name: 'Accueil', href: '#' },
  { name: 'Le Cabinet', href: '#about' },
  { name: 'Expertises', href: '#expertise' },
  { name: 'Témoignages', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

const EXPERTISE_AREAS = [
  {
    id: "01",
    title: "Droit des Étrangers",
    desc: "Accompagnement pour les titres de séjour, visas et recours contre les mesures d'éloignement (OQTF).",
    img: expertiseEtrangers
  },
  {
    id: "02",
    title: "Nationalité Française",
    desc: "Accompagnement en naturalisation, réintégration et contentieux du certificat de nationalité française.",
    img: expertiseNationalite
  },
  {
    id: "03",
    title: "Droit Processuel",
    desc: "Application rigoureuse des règles de procédure pour les recours devant les juridictions administratives.",
    img: expertiseProcessuel
  }
];

const TESTIMONIALS_DATA = [
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
    quote: "Après un long parcours face à l'administration, la méthode de Maître Elhaik a apporté une vraie structure à mon dossier. Une rigueur impressionnante.",
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

const FAQ_QUESTIONS = [
  {
    q: "Comment se déroule le premier rendez-vous ?",
    a: "J'analyse votre situation juridique, j'étudie vos documents et je définis avec vous une stratégie adaptée à votre situation. Un devis transparent vous est remis à l'issue."
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
      <nav className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 px-6 ${(scrolled && !isOpen) ? 'bg-acajou/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent py-4'}`}>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={(e) => { setIsOpen(false); scrollToSection(e as any, '#'); }}>
            <LogoIcon className="transition-colors duration-300 w-8 h-10 text-lin" />
            <div className={`transition-all duration-500 overflow-hidden ${(scrolled || isOpen) ? 'max-w-[200px] opacity-100' : 'max-w-0 md:max-w-[200px] opacity-0 md:opacity-100'}`}>
              <LogoHorizontal className="transition-colors duration-300 h-8 text-lin" />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-10">
            <button
              onClick={(e) => { setIsOpen(false); scrollToSection(e, '#contact'); }}
              className={`btn-interactive rounded-sm px-3 md:px-4 py-2 flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 text-lin hover:text-porcelaine ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-current animate-pulse" />
              Prendre RDV
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Basculer le menu" className="btn-interactive rounded-sm min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center transition-all duration-300 text-lin">
              {isOpen ? <X size={28} className="md:w-8 md:h-8" /> : <Menu size={28} className="md:w-8 md:h-8" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-acajou text-porcelaine flex flex-col overflow-hidden pt-20"
          >
            {/* Content: Fixed viewport height, flex boxes filling the space fluidly */}
            <div className="flex-1 flex flex-col md:flex-row px-6 pb-[2dvh] pt-[1dvh] md:py-[5dvh] min-h-0 gap-[2dvh] md:gap-16 border-t border-porcelaine/5">
              
              {/* Left Column: Links */}
              <div className="flex-1 flex flex-col justify-center min-h-0">
                <div className="flex flex-col justify-center h-full gap-[1.2dvh] md:gap-[2dvh]">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="font-serif text-[clamp(2rem,min(8dvh,14vw),9rem)] leading-[0.9] text-porcelaine hover:text-lin transition-all duration-300 italic md:hover:translate-x-6 origin-left block"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Right Column: Contact Info */}
              <div className="md:w-[350px] lg:w-[450px] flex flex-col justify-end md:justify-center gap-[1.5dvh] md:gap-[4dvh] border-t md:border-t-0 md:border-l border-porcelaine/10 pt-[2dvh] md:pt-0 pl-1 md:pl-16 shrink-0 min-h-0 mt-auto md:mt-0">
                <div className="space-y-[0.5dvh] md:space-y-2">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-[min(10px,2dvh)] md:text-sm font-sans font-light hidden md:block">Contact</h4>
                  <a href="tel:0667836443" className="text-[clamp(1.1rem,3dvh,2.2rem)] font-serif italic text-lin hover:text-porcelaine transition-all duration-300 block">06 67 83 64 43</a>
                  <a href="mailto:g.elhaik.avocat@gmail.com" className="text-[clamp(1.1rem,3dvh,2.2rem)] font-serif italic text-lin hover:text-porcelaine transition-all duration-300 block">g.elhaik.avocat@gmail.com</a>
                </div>
                <div className="space-y-[0.5dvh] md:space-y-3">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-[min(10px,2dvh)] md:text-sm font-sans font-light hidden md:block">Adresse</h4>
                  <p className="text-[clamp(0.9rem,2.2dvh,1.6rem)] opacity-70 leading-relaxed md:hidden">16 rue Saint-Simon, 78000 Versailles</p>
                  <p className="text-[clamp(0.9rem,2.2dvh,1.6rem)] md:text-[clamp(1rem,2.5dvh,2rem)] opacity-70 leading-relaxed hidden md:block">16 rue Saint-Simon<br />78000 Versailles</p>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 pt-[0.5dvh] md:pt-2">
                  {SOCIAL_LINKS.map((social, i) => (
                    <motion.a 
                      key={social.name} 
                      href={social.href} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      aria-label={`Lien vers ${social.name}`} 
                      className="btn-interactive w-10 h-10 md:w-12 md:h-12 min-w-[40px] min-h-[40px] rounded-full border border-porcelaine/10 flex items-center justify-center hover:border-lin transition-all duration-300 cursor-pointer"
                    >
                      <social.icon size={20} />
                    </motion.a>
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

const InteractiveHeroCard = ({ imgScale }: { imgScale: any }) => {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Map entire viewport to 0-1 range
      const x = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1);
      const y = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1);
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves the window
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion, mouseX, mouseY]);

  // Parallax layer movement (reduced for subtlety)
  const bgTranslateX = useTransform(smoothX, [0, 1], [8, -8]);
  const bgTranslateY = useTransform(smoothY, [0, 1], [8, -8]);

  const fgTranslateX = useTransform(smoothX, [0, 1], [-15, 15]);
  const fgTranslateY = useTransform(smoothY, [0, 1], [-15, 15]);

  return (
    <div className="relative w-[300px] md:w-[350px] lg:w-[500px] xl:w-[650px] 2xl:w-[850px] rounded-sm z-20 group">
      <motion.div
        style={{ scale: imgScale }}
        className="relative w-full aspect-[3/4] lg:aspect-[16/10] rounded-sm will-change-transform overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        {/* Background Layer (scaled up to allow translation without showing borders) */}
        <motion.div
          style={{ x: bgTranslateX, y: bgTranslateY }}
          className="absolute inset-[-5%] z-0 bg-porcelaine"
        >
          <img
            src={fondHero}
            className="w-full h-full object-cover"
            alt="Bureau Avocat"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-grenat/15 mix-blend-overlay z-10" />
        </motion.div>

        {/* Foreground Layer (Silhouette) */}
        {/* Absolute bounded to completely stay inside the container to avoid cropping the top. 
            The object-bottom and translating downwards ensures only the bottom gets cropped. */}
        <motion.div
          style={{ x: fgTranslateX, y: fgTranslateY }}
          className="absolute inset-x-0 bottom-[-5%] top-[5%] flex items-end justify-center pointer-events-none z-20"
        >
          <img
            src={guillaumeSilhouette}
            className="h-[105%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)]"
            alt="Guillaume Elhaik"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Parallax layers
  const bgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 250]);
  const imgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 60]);
  const imgScale = useTransform(scrollY, [0, 500], [1, prefersReducedMotion ? 1 : 1.05]);
  const textY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -80]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const blobAnimation = prefersReducedMotion ? { opacity: 0.15 } : { scale: [1, 1.2, 1], rotate: [0, 45, 0], opacity: [0.1, 0.2, 0.1] };
  const blobTransition = prefersReducedMotion ? {} : { duration: 15, repeat: Infinity, ease: 'linear' };

  const flareAnimation = prefersReducedMotion ? { opacity: 0 } : { x: ['-100%', '100%'], opacity: [0, 0.4, 0] };
  const flareTransition = prefersReducedMotion ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut' };

  return (
    <section className="relative h-[100dvh] min-h-[600px] lg:min-h-[650px] flex overflow-hidden bg-acajou">
      {/* Animated background light wave */}
      <motion.div
        animate={blobAnimation}
        transition={blobTransition}
        style={{ willChange: 'transform, opacity' }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,var(--color-lin)_0%,transparent_50%)] pointer-events-none mix-blend-soft-light z-0 opacity-20"
      />

      {/* Blurred BG image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        style={{ y: bgY, willChange: 'transform' }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img src={heroBg} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity will-change-transform"
        />
      </motion.div>

      {/* Light flare sweep */}
      <motion.div
        animate={flareAnimation}
        transition={flareTransition}
        style={{ willChange: 'transform, opacity' }}
        className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-lin/20 to-transparent skew-x-[35deg] z-[1] pointer-events-none mix-blend-overlay"
      />

      {/* ===================== DESKTOP LAYOUT (lg+) ===================== */}
      <div className="hidden lg:flex relative w-full mx-auto px-6 items-center justify-between gap-6 pb-32 xl:pb-40">

        {/* Left: Tagline */}
        <motion.div
          style={{ y: textY, willChange: 'transform' }}
          className="flex-1 flex flex-col justify-center z-40 max-w-[280px] xl:max-w-[340px]"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-porcelaine/85 text-lg xl:text-xl leading-relaxed font-sans font-light"
          >
            Cabinet d'avocat spécialisé en droit des étrangers et de la nationalité française, intervenant devant les juridictions administratives.
          </motion.p>
          <motion.button
            onClick={(e) => scrollToContact(e)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            whileHover={{ x: 6 }}
            className="mt-8 px-7 py-4 bg-lin text-acajou font-bold uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-porcelaine transition-all duration-300 shadow-xl flex items-center gap-3 self-start"
          >
            Exposer ma situation <ArrowRight size={14} />
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-3 text-porcelaine/40 text-[11px] uppercase tracking-[0.2em] font-sans"
          >
            Étude de votre dossier
          </motion.p>
        </motion.div>

        {/* Center: Portrait */}
        <div className="flex-shrink-0 flex flex-col items-center relative z-20">
          <motion.div style={{ y: imgY, willChange: 'transform' }} className="relative w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }}
              transition={prefersReducedMotion ? { opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] } } : {
                opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              <InteractiveHeroCard imgScale={imgScale} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Contact info */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 flex flex-col items-end justify-center gap-8 z-40 max-w-[280px] xl:max-w-[340px]"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col items-end gap-1"
          >
            <a href="tel:0667836443" className="text-lin text-3xl xl:text-4xl font-serif hover:text-porcelaine transition-all duration-300 italic">
              06 67 83 64 43
            </a>
            <p className="text-porcelaine/60 text-xs uppercase tracking-[0.3em] font-sans font-light">Ligne directe cabinet</p>
            <p className="text-porcelaine/35 text-[11px] uppercase tracking-[0.2em] font-sans font-light mt-1">Avocat au Barreau de Versailles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col items-end gap-1"
          >
            <a href="mailto:g.elhaik.avocat@gmail.com" className="text-lin text-xl xl:text-2xl font-serif hover:text-porcelaine transition-all duration-300 italic whitespace-nowrap">
              g.elhaik.avocat@gmail.com
            </a>
            <p className="text-porcelaine/60 text-xs uppercase tracking-[0.3em] font-sans font-light">Étude de votre dossier</p>
          </motion.div>
        </motion.div>
      </div>

      {/* DESKTOP: Logo name + Avocat at bottom */}
      <motion.div
        style={{ y: textY }}
        className="hidden lg:flex absolute bottom-8 xl:bottom-12 left-0 right-0 flex-col items-center z-30 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <LogoFullName className="text-lin w-[65vw] max-w-[600px] drop-shadow-2xl opacity-75" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1, ease: 'easeOut' }}
          className="-mt-8 xl:-mt-10"
        >
          <LogoAvocat className="text-lin h-14 xl:h-16 drop-shadow-xl" />
        </motion.div>
      </motion.div>

      {/* ===================== MOBILE LAYOUT (< lg) ===================== */}
      <div className="lg:hidden relative w-full h-full flex flex-col items-center justify-between pt-[max(80px,10dvh)] pb-[max(20px,5dvh)] px-6 z-20">

        {/* 1. Name logo banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full flex flex-col items-center shrink-0"
        >
          <LogoFullName className="text-lin w-[75vw] max-w-[300px] drop-shadow-xl opacity-90" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="-mt-2 md:-mt-4"
          >
            <LogoAvocat className="text-lin h-8 md:h-10 drop-shadow" />
          </motion.div>
        </motion.div>

        {/* 2. Portrait - Flexible space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative z-20 flex-1 flex items-center justify-center w-full min-h-0 py-0 sm:py-4"
        >
          <div className="scale-[0.8] sm:scale-[0.85] md:scale-95 origin-center flex items-center justify-center">
            <InteractiveHeroCard imgScale={1} />
          </div>
        </motion.div>

        {/* 3. Text & CTA Group - Clustered at bottom for better thumb reach */}
        <div className="w-full flex flex-col items-center gap-4 sm:gap-6 shrink-0 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center px-2"
          >
            <p className="text-porcelaine/85 text-[14px] sm:text-base leading-relaxed font-sans font-light max-w-[280px] sm:max-w-[320px] mx-auto">
              Cabinet d'avocat spécialisé en droit des étrangers et de la nationalité française, intervenant devant les juridictions administratives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="flex flex-col items-center gap-2 w-full"
          >
            <button
              onClick={scrollToContact}
              className="w-full max-w-[280px] sm:max-w-[320px] py-3.5 sm:py-4 bg-lin text-acajou font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs rounded-sm hover:bg-porcelaine transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
            >
              Exposer ma situation <ArrowRight size={13} />
            </button>
            <p className="text-porcelaine/35 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans text-center">Étude de votre dossier</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ opacity: scrollOpacity, willChange: 'transform, opacity' }}
        transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lin/40 hover:text-lin transition-all duration-300 z-50 cursor-pointer p-2"
        aria-label="Défiler vers la section À Propos"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-32 px-6 bg-porcelaine relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lin/5 -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-start relative z-10">
        <div className="md:col-span-3">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-grenat mb-2 md:mb-8"
          >
            Le Cabinet
          </motion.h3>
        </div>

        <div className="md:col-span-9 flex flex-col gap-8 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <p className="font-serif text-[28px] md:text-5xl lg:text-7xl leading-[1.3] text-acajou italic text-balance">
              Une pratique forgée par de nombreux dossiers traités devant les plus hautes juridictions administratives françaises.
            </p>
            <div className="mt-6 md:mt-16 flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                className="w-48 h-24 md:w-64 md:h-32 relative"
              >
                <img src={signatureImg} alt="Signature graphique" loading="lazy" decoding="async" className="w-full h-full object-contain" />
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
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
                }}
                className="btn-interactive group rounded-sm px-6 py-4 bg-acajou/5 flex items-center gap-6 text-acajou font-bold uppercase tracking-[0.2em] text-xs border border-acajou/10 hover:shadow-lg hover:bg-acajou/10 hover:translate-x-2 transition-transform duration-300"
              >
                Consulter le cabinet → <ArrowRight size={18} className="text-grenat group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="aspect-[4/3] bg-acajou/5 rounded-sm overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-grenat/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
              <img
                src={cabinetOffice}
                alt="Intérieur du cabinet d'avocats à Versailles" loading="lazy" decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {

  return (
    <section id="expertise" className="py-16 md:py-32 px-6 bg-acajou text-porcelaine relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16 mb-10 md:mb-32">
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
              Un traitement <span className="text-lin">attentif</span> pour chaque dossier.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {EXPERTISE_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="btn-interactive group flex flex-col rounded-sm h-[320px] md:h-auto"
            >
              <div className="relative w-full h-full md:aspect-[4/3] overflow-hidden rounded-sm shadow-xl group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 transition-all duration-500">
                {/* Red Overlay - Appears only on hover */}
                <div className="absolute inset-0 bg-grenat/90 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                {/* Background Image - Less grayscale on hover */}
                <img
                  src={area.img}
                  alt={area.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
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


  return (
    <section ref={targetRef} id="testimonials" className="relative h-[400vh] bg-porcelaine">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* Section Title - Fixed during scroll */}
        <div className="absolute top-8 md:top-24 left-6 md:left-[10%] z-20 pointer-events-none">
          <h3 className="text-grenat mix-blend-multiply opacity-80 md:opacity-100">Témoignages</h3>
        </div>

        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center will-change-transform">
          {TESTIMONIALS_DATA.map((t, index) => {
            return (
              <div key={t.id} className="w-[100vw] h-full flex flex-col justify-center px-6 md:px-0 relative">

                {/* Decorative background element per card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-acajou/[0.05] font-serif text-[40vh] md:text-[60vh] italic font-bold pointer-events-none select-none">
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
                      <p className="text-acajou/60 text-xs uppercase tracking-[0.2em] mt-1 font-sans font-light">{t.meta}</p>
                    </div>
                  </div>

                  {/* IMAGE CONTENT */}
                  <div className={`order-1 ${t.layoutReversed ? 'md:order-1 md:col-span-4 md:col-start-2' : 'md:order-2 md:col-span-4 md:col-start-8'} flex justify-center mt-4 md:mt-0 relative`}>

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


  return (
    <section id="faq" className="py-16 md:py-32 px-6 bg-porcelaine relative">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-grenat mb-6 md:mb-20"
        >
          Questions Fréquentes
        </motion.h3>
        <div className="space-y-4">
          {FAQ_QUESTIONS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-acajou/10 transition-all duration-300 ${openIndex === i ? 'pb-12' : 'pb-8'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group py-4 gap-4"
              >
                <span className={`font-serif text-3xl md:text-5xl transition-all duration-300 ${openIndex === i ? 'text-grenat italic' : 'text-acajou/80 group-hover:text-acajou'}`}>
                  {item.q}
                </span>
                <div className={`w-10 h-10 rounded-full border border-acajou/10 shrink-0 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-acajou text-porcelaine' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-6 pb-2">
                      <p className="text-xl md:text-2xl text-acajou/80 leading-relaxed font-light max-w-2xl">
                        {item.a}
                      </p>
                      {/* Information factuelle délais OQTF */}
                      {i === 3 && (
                        <p className="mt-5 text-acajou/60 text-sm leading-relaxed max-w-xl font-light">
                          Si vous avez reçu une OQTF, les délais légaux sont extrêmement courts. Vous pouvez contacter le cabinet pour étudier votre situation.
                        </p>
                      )}
                    </div>
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

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState('');

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

    // Send to API
    setIsSending(true);
    setServerError('');
    
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(async (res) => {
      if (res.ok) {
        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', domain: 'Droit des étrangers', message: '' });
      } else {
        const data = await res.json();
        setServerError(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    })
    .catch(() => {
      setServerError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-6 bg-grenat text-porcelaine relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${carbonFibreImg})` }} />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 relative z-10">
        <div className="flex flex-col gap-6 md:gap-16">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lin mb-4 md:mb-12"
             >
              Prendre RDV
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-6xl md:text-8xl leading-[1] italic text-balance"
            >
              Exposez votre <span className="text-lin">situation</span>.
            </motion.h2>
          </div>

          <div className="space-y-4 md:space-y-12 mt-2 md:mt-0">
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
                className="flex items-start gap-5 md:gap-8 group cursor-pointer p-4 -ml-4 rounded-sm"
              >
                <div className="btn-interactive group-btn-interactive w-12 h-12 md:w-16 md:h-16 shrink-0 bg-porcelaine/5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-lin group-hover:text-acajou">
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
          className="bg-acajou p-6 md:p-16 rounded-sm backdrop-blur-sm shadow-2xl border border-lin/5"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-6 py-16 text-center min-h-[400px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-lin flex items-center justify-center"
              >
                <span className="text-acajou text-2xl font-bold">✓</span>
              </motion.div>
              <p className="font-serif text-4xl italic text-porcelaine">Message reçu.</p>
              <p className="text-lin/60 text-xs uppercase tracking-[0.2em] font-sans">
                Le cabinet vous répondra dans les meilleurs délais.
              </p>
              <p className="text-lin/60 text-xs uppercase tracking-[0.2em] font-sans">
                🔒 Strictement confidentiel · Secret professionnel garanti
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs uppercase tracking-[0.2em] font-bold text-porcelaine/40 hover:text-porcelaine transition-colors duration-300"
              >
                Envoyer une autre demande
              </button>
            </motion.div>
          ) : (
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
                  <label htmlFor="firstName" className="text-xs md:text-sm uppercase tracking-[0.3em] text-lin font-bold block">Prénom</label>
                  <input id="firstName" value={formData.firstName} onChange={handleChange} onBlur={() => handleBlur('firstName')} type="text" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Jean" aria-invalid={!!errors.firstName} />
                  {errors.firstName && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.firstName}</span>}
                </div>
                <div className="space-y-2 md:space-y-3 relative">
                  <label htmlFor="lastName" className="text-xs md:text-sm uppercase tracking-[0.3em] text-lin font-bold block">Nom</label>
                  <input id="lastName" value={formData.lastName} onChange={handleChange} onBlur={() => handleBlur('lastName')} type="text" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Dupont" aria-invalid={!!errors.lastName} />
                  {errors.lastName && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.lastName}</span>}
                </div>
              </div>
              <div className="space-y-2 md:space-y-3 relative">
                <label htmlFor="email" className="text-xs md:text-sm uppercase tracking-[0.3em] text-lin font-bold block">Email</label>
                <input id="email" value={formData.email} onChange={handleChange} onBlur={() => handleBlur('email')} type="email" className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 placeholder:text-porcelaine/30 text-base md:text-lg ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="jean.dupont@email.com" aria-invalid={!!errors.email} />
                {errors.email && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.email}</span>}
              </div>
              <div className="space-y-2 md:space-y-3 relative">
                <label htmlFor="domain" className="text-xs md:text-sm uppercase tracking-[0.3em] text-lin font-bold block">Domaine concerné</label>
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
                <label htmlFor="message" className="text-xs md:text-sm uppercase tracking-[0.3em] text-lin font-bold block">Message</label>
                <textarea id="message" value={formData.message} onChange={handleChange} onBlur={() => handleBlur('message')} rows={3} className={`w-full bg-transparent border-b py-2 md:py-4 outline-none transition-all duration-300 resize-y min-h-[60px] md:min-h-[120px] placeholder:text-porcelaine/30 text-base md:text-lg ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-porcelaine/20 focus:border-lin'}`} placeholder="Décrivez brièvement votre situation..." aria-invalid={!!errors.message}></textarea>
                {errors.message && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] md:text-xs font-bold">{errors.message}</span>}
              </div>
              <p className="text-porcelaine/35 text-xs uppercase tracking-[0.2em] text-center font-sans">
                🔒 Strictement confidentiel · Protégé par le secret professionnel de l’avocat
              </p>
              {serverError && (
                <p className="text-red-400 text-sm text-center font-bold mb-4">{serverError}</p>
              )}
              <motion.button
                type="submit"
                disabled={isSending}
                whileTap={{ scale: 0.98 }}
                className={`btn-interactive w-full py-4 md:py-8 min-h-[44px] bg-lin text-acajou font-bold uppercase tracking-[0.3em] text-xs hover:bg-porcelaine transition-all duration-300 shadow-xl rounded-sm mt-4 md:mt-8 ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? 'Envoi en cours...' : 'Envoyer la demande'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// --- Legal Modals ---

type LegalPage = 'mentions' | 'confidentialite' | 'cookies' | null;

const LegalModal = ({ page, onClose }: { page: LegalPage; onClose: () => void }) => {
  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [page]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const titles: Record<NonNullable<LegalPage>, string> = {
    mentions: 'Mentions Légales',
    confidentialite: 'Politique de Confidentialité',
    cookies: 'Politique de Cookies',
  };

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-acajou/80 backdrop-blur-md flex items-start justify-center p-4 md:p-8 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative bg-porcelaine text-acajou w-full max-w-4xl rounded-sm shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] my-4 md:my-8"
            role="dialog"
            aria-modal="true"
            aria-label={page ? titles[page] : ''}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-porcelaine border-b border-acajou/10 px-8 md:px-16 py-6 flex justify-between items-center rounded-t-sm">
              <div>
                <p className="text-grenat text-[10px] uppercase tracking-[0.3em] font-sans font-light mb-1">Cabinet Guillaume Elhaik</p>
                <h2 className="font-serif text-2xl md:text-3xl italic text-acajou">{page ? titles[page] : ''}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="w-11 h-11 rounded-full border border-acajou/15 flex items-center justify-center hover:bg-acajou hover:text-porcelaine transition-all duration-300 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 md:px-16 py-10 md:py-14 space-y-10 text-acajou/80 leading-relaxed">
              {page === 'mentions' && <MentionsLegalesContent />}
              {page === 'confidentialite' && <ConfidentialiteContent />}
              {page === 'cookies' && <CookiesContent />}
            </div>

            {/* Footer */}
            <div className="border-t border-acajou/10 px-8 md:px-16 py-6 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-acajou/40 font-sans">
              <span>© 2026 Cabinet Guillaume Elhaik — Avocat au Barreau de Versailles</span>
              <button onClick={onClose} className="hover:text-acajou transition-colors">Fermer ×</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="font-serif text-xl md:text-2xl text-acajou italic not-uppercase tracking-normal border-b border-acajou/10 pb-3">{title}</h3>
    <div className="space-y-3 text-[15px] md:text-base">{children}</div>
  </div>
);

const MentionsLegalesContent = () => (
  <div className="space-y-10">
    <div className="bg-acajou/5 rounded-sm p-6 border-l-2 border-lin">
      <p className="text-sm text-acajou/70 leading-relaxed">
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les présentes mentions légales sont portées à la connaissance des utilisateurs et visiteurs du site.
      </p>
    </div>

    <Section title="Éditeur du site">
      <p><strong className="text-acajou">Raison sociale :</strong> Cabinet Guillaume Elhaik, Avocat</p>
      <p><strong className="text-acajou">Statut :</strong> Avocat inscrit au Barreau de Versailles</p>
      <p><strong className="text-acajou">Adresse :</strong> 16 rue Saint-Simon, 78000 Versailles, France</p>
      <p><strong className="text-acajou">Téléphone :</strong> 06 67 83 64 43</p>
      <p><strong className="text-acajou">Email :</strong> g.elhaik.avocat@gmail.com</p>
      <p><strong className="text-acajou">TOQUE (N° de barreau) :</strong> Inscrit au Barreau de Versailles</p>
      <p><strong className="text-acajou">Autorité de tutelle :</strong> Barreau de Versailles, Ordre des Avocats du Barreau de Versailles, Palais de Justice, Place André Mignot, 78000 Versailles</p>
    </Section>

    <Section title="Règles professionnelles applicables">
      <p>Maître Guillaume Elhaik exerce la profession d'avocat conformément aux règles professionnelles fixées par :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>La loi n° 71-1130 du 31 décembre 1971 modifiée, portant réforme de certaines professions judiciaires et juridiques</li>
        <li>Le décret n° 91-1197 du 27 novembre 1991 organisant la profession d'avocat</li>
        <li>Le Règlement Intérieur National (RIN) de la profession d'avocat</li>
        <li>Le Règlement Intérieur du Barreau de Versailles</li>
      </ul>
      <p className="mt-2">Ces textes sont accessibles sur le site du Conseil National des Barreaux : <span className="text-grenat">www.cnb.avocat.fr</span></p>
    </Section>

    <Section title="Assurance responsabilité civile professionnelle">
      <p>Maître Guillaume Elhaik est couvert par une assurance responsabilité civile professionnelle souscrite auprès d'un organisme agréé, conformément aux dispositions de l'article 27 de la loi du 31 décembre 1971.</p>
    </Section>

    <Section title="Directeur de la publication">
      <p>Maître Guillaume Elhaik, en sa qualité d'éditeur du site.</p>
    </Section>

    <Section title="Hébergement">
      <p><strong className="text-acajou">Hébergeur :</strong> Vercel Inc.</p>
      <p><strong className="text-acajou">Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, California 94104, États-Unis</p>
      <p><strong className="text-acajou">Site web :</strong> www.vercel.com</p>
    </Section>

    <Section title="Propriété intellectuelle">
      <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
      <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse de Maître Guillaume Elhaik.</p>
    </Section>

    <Section title="Limitation de responsabilité">
      <p>Les informations contenues sur ce site sont aussi précises que possible et le site est régulièrement mis à jour. Cependant, elles ne sauraient engager la responsabilité de l'éditeur. Les informations publiées sur ce site ont un caractère purement informatif et ne constituent en aucun cas une consultation juridique.</p>
      <p>Toute consultation juridique personnalisée doit être réalisée directement auprès de Maître Guillaume Elhaik dans le cadre d'un mandat confié au cabinet.</p>
    </Section>

    <Section title="Interdiction du démarchage">
      <p>Conformément aux dispositions des articles 15 et suivants du Règlement Intérieur National de la profession d'avocat, le démarchage est interdit. Ce site a pour unique objet de présenter le cabinet et ses domaines d'intervention. Il ne constitue pas un acte de démarchage.</p>
    </Section>

    <Section title="Droit applicable et juridiction compétente">
      <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
    </Section>
  </div>
);

const ConfidentialiteContent = () => (
  <div className="space-y-10">
    <div className="bg-acajou/5 rounded-sm p-6 border-l-2 border-lin">
      <p className="text-sm text-acajou/70 leading-relaxed">
        La protection de vos données personnelles est une priorité pour le Cabinet Guillaume Elhaik. La présente politique de confidentialité vous informe de la manière dont vos données sont collectées, traitées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD) n° 2016/679 du 27 avril 2016 et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
      </p>
    </div>

    <Section title="Responsable du traitement">
      <p><strong className="text-acajou">Identité :</strong> Maître Guillaume Elhaik, Avocat</p>
      <p><strong className="text-acajou">Adresse :</strong> 16 rue Saint-Simon, 78000 Versailles</p>
      <p><strong className="text-acajou">Email :</strong> g.elhaik.avocat@gmail.com</p>
      <p><strong className="text-acajou">Téléphone :</strong> 06 67 83 64 43</p>
    </Section>

    <Section title="Données collectées">
      <p>Dans le cadre de l'utilisation de ce site et du formulaire de contact, les données suivantes peuvent être collectées :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (si communiqué librement)</li>
        <li>Les informations contenues dans votre message</li>
        <li>Données de navigation (adresse IP, pages visitées, durée de visite)</li>
      </ul>
    </Section>

    <Section title="Finalités et bases légales du traitement">
      <div className="space-y-4">
        <div className="bg-acajou/5 rounded-sm p-4">
          <p className="font-bold text-acajou text-sm mb-1">Répondre à vos demandes de contact</p>
          <p className="text-sm">Base légale : Intérêt légitime (art. 6.1.f du RGPD) — Les données collectées via le formulaire de contact sont traitées dans le seul but de traiter votre demande et d'y répondre.</p>
        </div>
        <div className="bg-acajou/5 rounded-sm p-4">
          <p className="font-bold text-acajou text-sm mb-1">Gestion de la relation client et des mandats</p>
          <p className="text-sm">Base légale : Exécution du contrat (art. 6.1.b du RGPD) — Dans le cadre d'un mandat confié au cabinet, vos données sont traitées pour la bonne exécution de notre mission de représentation et de conseil.</p>
        </div>
        <div className="bg-acajou/5 rounded-sm p-4">
          <p className="font-bold text-acajou text-sm mb-1">Mesure d'audience du site</p>
          <p className="text-sm">Base légale : Consentement (art. 6.1.a du RGPD) — Des outils d'analyse d'audience peuvent être utilisés sous réserve de votre consentement, conformément à notre politique de cookies.</p>
        </div>
      </div>
    </Section>

    <Section title="Secret professionnel de l'avocat">
      <p className="font-medium text-acajou">Toutes les informations que vous nous communiquez dans le cadre d'une relation client sont protégées par le secret professionnel de l'avocat, prévu par l'article 66-5 de la loi du 31 décembre 1971.</p>
      <p>Cette obligation de secret couvre en particulier :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>Les consultations adressées à un avocat</li>
        <li>Les correspondances échangées entre le client et son avocat</li>
        <li>Les notes d'entretien et, plus généralement, toutes les pièces du dossier</li>
      </ul>
    </Section>

    <Section title="Durée de conservation">
      <p>Vos données personnelles sont conservées pendant les durées suivantes :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-acajou">Demandes de contact sans suite donnée :</strong> 3 ans à compter du dernier contact</li>
        <li><strong className="text-acajou">Données relatives aux mandats :</strong> 5 ans après la clôture du dossier, conformément aux obligations professionnelles de l'avocat</li>
        <li><strong className="text-acajou">Données de facturation :</strong> 10 ans, conformément aux obligations comptables et fiscales</li>
        <li><strong className="text-acajou">Données de navigation :</strong> 13 mois maximum</li>
      </ul>
    </Section>

    <Section title="Destinataires des données">
      <p>Vos données personnelles ne sont pas vendues, cédées ou louées à des tiers. Elles peuvent être communiquées uniquement :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li>Aux prestataires techniques strictement nécessaires au fonctionnement du site (hébergeur), liés par des obligations contractuelles de confidentialité</li>
        <li>Aux autorités judiciaires ou administratives si le cabinet y est légalement tenu</li>
        <li>Avec votre consentement explicite, à d'autres avocats ou auxiliaires de justice dans le cadre de votre dossier</li>
      </ul>
    </Section>

    <Section title="Transfert hors Union Européenne">
      <p>L'hébergement du site est assuré par Vercel Inc., société américaine. Ce transfert est encadré par des clauses contractuelles types adoptées par la Commission européenne, garantissant un niveau de protection adéquat de vos données.</p>
    </Section>

    <Section title="Vos droits">
      <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
      <ul className="list-disc list-inside space-y-2 pl-2">
        <li><strong className="text-acajou">Droit d'accès</strong> (art. 15 RGPD) : obtenir la confirmation que des données vous concernant sont traitées et en obtenir une copie</li>
        <li><strong className="text-acajou">Droit de rectification</strong> (art. 16 RGPD) : faire corriger des données inexactes ou incomplètes</li>
        <li><strong className="text-acajou">Droit à l'effacement</strong> (art. 17 RGPD) : obtenir la suppression de vos données dans les cas prévus par le RGPD</li>
        <li><strong className="text-acajou">Droit à la limitation</strong> (art. 18 RGPD) : obtenir la limitation du traitement de vos données</li>
        <li><strong className="text-acajou">Droit à la portabilité</strong> (art. 20 RGPD) : recevoir vos données dans un format structuré</li>
        <li><strong className="text-acajou">Droit d'opposition</strong> (art. 21 RGPD) : vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière</li>
      </ul>
      <p className="mt-3">Pour exercer ces droits, adressez votre demande par email à : <strong className="text-grenat">g.elhaik.avocat@gmail.com</strong> ou par courrier à l'adresse du cabinet. Nous répondrons dans un délai d'un mois.</p>
      <p>Si vous estimez que le traitement de vos données constitue une violation de la réglementation, vous disposez du droit d'introduire une réclamation auprès de la <strong className="text-acajou">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) — <span className="text-grenat">www.cnil.fr</span>.</p>
    </Section>

    <Section title="Sécurité">
      <p>Le cabinet met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération, divulgation ou accès non autorisé. Les communications avec le site sont chiffrées via le protocole HTTPS.</p>
    </Section>

    <Section title="Modifications de la présente politique">
      <p>La présente politique de confidentialité peut être modifiée à tout moment. La version en vigueur est celle accessible sur ce site. Nous vous invitons à la consulter régulièrement.</p>
      <p><strong className="text-acajou">Dernière mise à jour :</strong> Avril 2026</p>
    </Section>
  </div>
);

const CookiesContent = () => (
  <div className="space-y-10">
    <div className="bg-acajou/5 rounded-sm p-6 border-l-2 border-lin">
      <p className="text-sm text-acajou/70 leading-relaxed">
        La présente politique de cookies vous informe sur l'utilisation des cookies et traceurs sur le site du Cabinet Guillaume Elhaik, conformément à la réglementation applicable (article 82 de la loi Informatique et Libertés, recommandations de la CNIL).
      </p>
    </div>

    <Section title="Qu'est-ce qu'un cookie ?">
      <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site internet. Il permet au site de mémoriser des informations sur votre visite, comme vos préférences linguistiques ou d'autres paramètres, ce qui peut faciliter votre prochaine visite.</p>
    </Section>

    <Section title="Cookies utilisés sur ce site">
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-acajou text-sm uppercase tracking-widest mb-3">1. Cookies strictement nécessaires</h4>
          <div className="bg-acajou/5 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-acajou/10">
                <tr>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Nom</th>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Finalité</th>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-acajou/10">
                  <td className="p-3 font-mono text-xs">__session</td>
                  <td className="p-3">Maintien de la session et sécurité des formulaires</td>
                  <td className="p-3">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-acajou/50 mt-2">Ces cookies sont indispensables au fonctionnement du site. Ils ne nécessitent pas de consentement préalable.</p>
        </div>

        <div>
          <h4 className="font-bold text-acajou text-sm uppercase tracking-widest mb-3">2. Cookies de mesure d'audience (Analytics)</h4>
          <div className="bg-acajou/5 rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-acajou/10">
                <tr>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Nom</th>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Finalité</th>
                  <th className="text-left p-3 font-bold text-acajou text-xs uppercase tracking-widest">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-acajou/10">
                  <td className="p-3 font-mono text-xs">_ga</td>
                  <td className="p-3">Mesure de l'audience et analyse du comportement des visiteurs (Google Analytics)</td>
                  <td className="p-3">13 mois</td>
                </tr>
                <tr className="border-t border-acajou/10">
                  <td className="p-3 font-mono text-xs">_ga_*</td>
                  <td className="p-3">Cookie de session Google Analytics</td>
                  <td className="p-3">13 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-acajou/50 mt-2">Ces cookies ne sont déposés qu'avec votre consentement préalable. Vous pouvez le retirer à tout moment.</p>
        </div>
      </div>
    </Section>

    <Section title="Votre consentement">
      <p>Conformément aux recommandations de la CNIL, les cookies qui ne sont pas strictement nécessaires au fonctionnement du site (notamment les cookies analytics) ne sont déposés qu'après recueil de votre consentement explicite.</p>
      <p>Ce consentement est valable pour une durée maximale de <strong className="text-acajou">13 mois</strong>. Au-delà de cette durée, ou si vous n'avez pas interagi avec le site, votre consentement sera de nouveau sollicité.</p>
    </Section>

    <Section title="Comment gérer vos cookies ?">
      <p>Vous disposez de plusieurs moyens pour gérer les cookies :</p>
      <div className="space-y-4">
        <div className="bg-acajou/5 rounded-sm p-4">
          <p className="font-bold text-acajou text-sm mb-1">Depuis votre navigateur</p>
          <p className="text-sm">La plupart des navigateurs vous permettent de refuser ou de supprimer les cookies. Voici comment procéder selon votre navigateur :</p>
          <ul className="list-disc list-inside space-y-1 pl-2 mt-2 text-sm">
            <li><strong className="text-acajou">Google Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies et autres données de sites</li>
            <li><strong className="text-acajou">Mozilla Firefox :</strong> Options → Vie privée et sécurité → Cookies et données de sites</li>
            <li><strong className="text-acajou">Safari :</strong> Préférences → Confidentialité → Cookies et données de sites web</li>
            <li><strong className="text-acajou">Microsoft Edge :</strong> Paramètres → Cookies et autorisations du site</li>
          </ul>
        </div>
        <div className="bg-acajou/5 rounded-sm p-4">
          <p className="font-bold text-acajou text-sm mb-1">Opt-out Google Analytics</p>
          <p className="text-sm">Vous pouvez désactiver Google Analytics en téléchargeant le module complémentaire de navigateur disponible à l'adresse : <span className="text-grenat">tools.google.com/dlpage/gaoptout</span></p>
        </div>
      </div>
      <p className="text-sm text-acajou/60 mt-4">Attention : le refus des cookies peut limiter certaines fonctionnalités du site.</p>
    </Section>

    <Section title="Cookies tiers">
      <p>Ce site peut intégrer des contenus de services tiers (polices de caractères, etc.) susceptibles de déposer leurs propres cookies. Le cabinet n'a pas de contrôle sur ces cookies. Nous vous invitons à consulter les politiques de confidentialité de ces tiers.</p>
    </Section>

    <Section title="Mise à jour de la politique">
      <p>La présente politique de cookies est susceptible d'être modifiée à tout moment, notamment pour se conformer à d'éventuels changements législatifs ou réglementaires.</p>
      <p><strong className="text-acajou">Dernière mise à jour :</strong> Avril 2026</p>
    </Section>

    <Section title="Contact">
      <p>Pour toute question relative à l'utilisation des cookies sur ce site, vous pouvez nous contacter :</p>
      <p>Email : <strong className="text-grenat">g.elhaik.avocat@gmail.com</strong></p>
      <p>Courrier : Cabinet Guillaume Elhaik — 16 rue Saint-Simon, 78000 Versailles</p>
    </Section>
  </div>
);

const Footer = ({ onOpenLegal }: { onOpenLegal: (page: LegalPage) => void }) => {
  const scrollToSection = (id: string) => {
    if (id === '#' || id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-acajou text-porcelaine relative overflow-hidden pt-10 pb-6 md:pt-12 md:pb-8 px-6 border-t border-porcelaine/5">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-8 mb-10 md:mb-20 relative z-10">
          
          {/* Contact Info */}
          <div className="col-span-2 md:col-span-6 flex flex-col">
            <div className="text-lin/40 font-light mb-6 md:mb-8 select-none text-2xl">+</div>
            <div className="space-y-4 md:space-y-6">
              <a href="tel:0667836443" className="block text-2xl md:text-3xl font-serif text-porcelaine hover:text-lin transition-colors">
                (06) 67 83 64 43
              </a>
              <div className="inline-block group pb-1">
                <a href="mailto:g.elhaik.avocat@gmail.com" className="text-xl md:text-3xl font-serif text-porcelaine hover:text-lin transition-colors flex items-center gap-3 break-all">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-porcelaine group-hover:bg-lin transition-colors flex items-center justify-center shrink-0">
                     <ArrowRight size={14} className="text-acajou" />
                  </div>
                  <span className="truncate">g.elhaik.avocat@gmail.com</span>
                </a>
                <div className="h-[2px] w-full bg-porcelaine group-hover:bg-lin transition-colors mt-2 md:mt-3" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-porcelaine/40 font-sans mb-4 md:mb-8">Navigation</h4>
            <ul className="space-y-3 md:space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg md:text-xl font-serif text-porcelaine hover:text-lin hover:translate-x-2 transition-all duration-300 block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <h4 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-porcelaine/40 font-sans mb-4 md:mb-8">Social</h4>
            <ul className="space-y-3 md:space-y-4">
              {SOCIAL_LINKS.map(social => (
                <li key={social.name}>
                  <a 
                    href={social.href}
                    className="text-lg md:text-xl font-serif text-porcelaine hover:text-lin group flex items-center gap-2 transition-colors w-max"
                  >
                    {social.name}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all -rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Huge Logo Section */}
        <div className="w-full relative z-10 mb-8 md:mb-10 flex justify-start">
          <img src={logoPorcelaine} alt="Logo Cabinet Guillaume Elhaik" className="w-full md:w-[85%] lg:w-full h-auto drop-shadow-2xl" />
        </div>

        {/* Bottom Legal bar */}
        <div className="w-full pt-6 md:pt-8 border-t border-porcelaine/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 relative z-10">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans text-porcelaine/40 text-center md:text-left">
            © {new Date().getFullYear()} Cabinet Guillaume Elhaik. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-lin">
            <button onClick={() => onOpenLegal('mentions')} className="hover:text-porcelaine transition-colors">Mentions Légales</button>
            <button onClick={() => onOpenLegal('confidentialite')} className="hover:text-porcelaine transition-colors">Confidentialité</button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-porcelaine transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [legalPage, setLegalPage] = useState<LegalPage>(null);

  const handleCloseLegal = useCallback(() => setLegalPage(null), []);

  return (
    <div className="relative selection:bg-lin selection:text-acajou">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer onOpenLegal={setLegalPage} />
      <LegalModal page={legalPage} onClose={handleCloseLegal} />
    </div>
  );
}
