import re

with open("src/App.tsx", "r") as f:
    text = f.read()

# 1. Imports and Constants
text = text.replace(
    "import React, { useState, useEffect, useRef } from 'react';",
    "import React, { useState, useEffect, useRef, useCallback } from 'react';"
)
text = text.replace(
    "import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';",
    "import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';"
)
text = text.replace(
    "import t4Img from './assets/images/pierre-antona-wbWrY4NZLZc-unsplash.webp';",
    "import t4Img from './assets/images/pierre-antona-wbWrY4NZLZc-unsplash.webp';\nimport signatureImg from './assets/images/signature.svg';\nimport carbonFibreImg from './assets/images/carbon-fibre.png';"
)

constants = """
const NAV_LINKS = [
  { name: 'Accueil', href: '#' },
  { name: 'Le Cabinet', href: '#about' },
  { name: 'Expertises', href: '#expertise' },
  { name: 'Témoignages', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const EXPERTISE_AREAS = [
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

const FAQ_QUESTIONS = [
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
"""

text = text.replace("// --- Utilities ---", constants + "\n// --- Utilities ---")

# 2. Navbar
navlinks_block = """  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Le Cabinet', href: '#about' },
    { name: 'Expertises', href: '#expertise' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];"""
text = text.replace(navlinks_block, "")

scroll_block = """  useEffect(() => {
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
  };"""

scroll_block_new = """  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
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
  }, []);"""
text = text.replace(scroll_block, scroll_block_new)
text = text.replace("navLinks.map((link, i)", "NAV_LINKS.map((link, i)")

# 3. Hero
hero_old = """const Hero = () => {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Parallax layers
  const bgY = useTransform(scrollY, [0, 1000], [0, 250]);
  const imgY = useTransform(scrollY, [0, 1000], [0, 60]);
  const imgScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const textY = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <section className="relative h-screen min-h-[650px] flex overflow-hidden bg-acajou">
      {/* Animated background light wave */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,var(--color-lin)_0%,transparent_50%)] pointer-events-none mix-blend-soft-light z-0 opacity-20"
      />

      {/* Blurred BG image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        style={{ y: bgY }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img src={heroBg} alt="" aria-hidden="true" loading="lazy" decoding="async"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
        />
      </motion.div>

      {/* Light flare sweep */}
      <motion.div
        animate={{ x: ['-100%', '100%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-lin/20 to-transparent skew-x-[35deg] z-[1] pointer-events-none mix-blend-overlay"
      />

      {/* ===================== DESKTOP LAYOUT (lg+) ===================== */}
      <div className="hidden lg:flex relative w-full max-w-7xl mx-auto px-8 xl:px-12 items-center justify-between gap-8 pt-20">

        {/* Left: Tagline */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 flex flex-col justify-center z-40 max-w-xs xl:max-w-sm"
        >"""

hero_new = """const Hero = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Parallax layers
  const bgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 250]);
  const imgY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : 60]);
  const imgScale = useTransform(scrollY, [0, 500], [1, prefersReducedMotion ? 1 : 1.05]);
  const textY = useTransform(scrollY, [0, 1000], [0, prefersReducedMotion ? 0 : -80]);

  const blobAnimation = prefersReducedMotion ? { opacity: 0.15 } : { scale: [1, 1.2, 1], rotate: [0, 45, 0], opacity: [0.1, 0.2, 0.1] };
  const blobTransition = prefersReducedMotion ? {} : { duration: 15, repeat: Infinity, ease: 'linear' };
  
  const flareAnimation = prefersReducedMotion ? { opacity: 0 } : { x: ['-100%', '100%'], opacity: [0, 0.4, 0] };
  const flareTransition = prefersReducedMotion ? {} : { duration: 7, repeat: Infinity, ease: 'easeInOut' };

  return (
    <section className="relative h-screen min-h-[650px] flex overflow-hidden bg-acajou">
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
      <div className="hidden lg:flex relative w-full max-w-7xl mx-auto px-8 xl:px-12 items-center justify-between gap-8 pt-20">

        {/* Left: Tagline */}
        <motion.div
          style={{ y: textY, willChange: 'transform' }}
          className="flex-1 flex flex-col justify-center z-40 max-w-xs xl:max-w-sm"
        >"""
text = text.replace(hero_old, hero_new)

hero_portrait_old = """        {/* Center: Portrait */}
        <div className="flex-shrink-0 flex flex-col items-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: [0, -12, 0] }}
            style={{ y: imgY }}
            transition={{
              opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
            }}
            className="relative w-72 xl:w-80 2xl:w-96 rounded-sm"
          >
            <motion.div style={{ scale: imgScale }} className="w-full">
              <div className="absolute inset-0 bg-grenat/15 mix-blend-overlay z-10 rounded-sm" />
              <img
                src={guillaumeHero}
                alt="Guillaume Elhaik, Avocat spécialisé au Tribunal de Versailles"
                className="w-full aspect-[3/4] object-cover rounded-sm shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>
        </div>"""

hero_portrait_new = """        {/* Center: Portrait */}
        <div className="flex-shrink-0 flex flex-col items-center relative z-20">
          <motion.div style={{ y: imgY, willChange: 'transform' }} className="relative w-72 xl:w-80 2xl:w-96 rounded-sm">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -12, 0] }}
              transition={prefersReducedMotion ? { opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] } } : {
                opacity: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.div style={{ scale: imgScale, willChange: 'transform' }} className="w-full">
                <div className="absolute inset-0 bg-grenat/15 mix-blend-overlay z-10 rounded-sm" />
                <img
                  src={guillaumeHero}
                  alt="Guillaume Elhaik, Avocat spécialisé au Tribunal de Versailles"
                  loading="eager"
                  fetchPriority="high"
                  width="400"
                  height="533"
                  className="w-full aspect-[3/4] object-cover rounded-sm shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>"""
text = text.replace(hero_portrait_old, hero_portrait_new)

mobile_hero_portrait_old = """              <img
                src={guillaumeHero}
                alt="Guillaume Elhaik, Avocat à Versailles"
                className="w-[220px] aspect-[3/4] object-cover rounded-sm shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]"
              />"""
mobile_hero_portrait_new = """              <img
                src={guillaumeHero}
                alt="Guillaume Elhaik, Avocat à Versailles"
                loading="eager"
                fetchPriority="high"
                width="400"
                height="533"
                className="w-[220px] aspect-[3/4] object-cover rounded-sm shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]"
              />"""
text = text.replace(mobile_hero_portrait_old, mobile_hero_portrait_new)

scroll_indicator_old = """      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        style={{ opacity: scrollOpacity }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lin/40"
      >"""
scroll_indicator_new = """      {/* Scroll indicator */}
      <motion.div
        animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
        style={{ opacity: scrollOpacity, willChange: 'transform, opacity' }}
        transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lin/40"
      >"""
text = text.replace(scroll_indicator_old, scroll_indicator_new)

# 4. About
sig_old = """<img src="https://framerusercontent.com/images/VCNSEUHw9CEtEpV1IRrCnP4RJwE.svg" alt="Signature graphique" loading="lazy" decoding="async" className="w-full h-full object-contain" />"""
sig_new = """<img src={signatureImg} alt="Signature graphique" loading="lazy" decoding="async" className="w-full h-full object-contain" />"""
text = text.replace(sig_old, sig_new)

btn_old = """              <motion.button
                whileHover={{ x: 10, backgroundColor: 'rgba(57, 19, 21, 0.08)' }}
                className="btn-interactive rounded-sm px-6 py-4 bg-acajou/5 flex items-center gap-6 text-acajou font-bold uppercase tracking-[0.2em] text-xs border border-acajou/10 hover:shadow-lg transition-all duration-300"
              >
                Découvrir mon parcours <ArrowRight size={18} className="text-grenat" />
              </motion.button>"""
btn_new = """              <button
                className="btn-interactive group rounded-sm px-6 py-4 bg-acajou/5 flex items-center gap-6 text-acajou font-bold uppercase tracking-[0.2em] text-xs border border-acajou/10 hover:shadow-lg hover:bg-acajou/10 hover:translate-x-2 transition-transform duration-300"
              >
                Découvrir mon parcours <ArrowRight size={18} className="text-grenat group-hover:translate-x-1 transition-transform" />
              </button>"""
text = text.replace(btn_old, btn_new)

# 5. Expertise
areas_block = """  const areas = [
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
"""
text = text.replace(areas_block, "")
text = text.replace("areas.map((area, i)", "EXPERTISE_AREAS.map((area, i)")

# 6. Testimonials
test_block = """  const testimonialsData = [
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
"""
text = text.replace(test_block, "")
text = text.replace("testimonialsData.map", "TESTIMONIALS_DATA.map")

# 7. FAQ
faq_block = """  const questions = [
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
"""
text = text.replace(faq_block, "")
text = text.replace("questions.map((item, i)", "FAQ_QUESTIONS.map((item, i)")
text = text.replace("key={i}", "key={item.q}")

anim_old = """                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >"""
anim_new = """                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    style={{ overflow: 'hidden' }}
                  >"""
text = text.replace(anim_old, anim_new)

# 8. Contact
tex_old = """<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />"""
tex_new = """<div className="absolute inset-0" style={{ backgroundImage: `url(${carbonFibreImg})` }} />"""
text = text.replace(tex_old, tex_new)

with open("src/App.tsx", "w") as f:
    f.write(text)
