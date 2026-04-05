/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ChevronRight,
  Quote
} from 'lucide-react';
import { LogoHorizontal, LogoIcon, LogoBlason } from './components/Logos';

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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-acajou/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <LogoIcon className={`transition-colors duration-300 w-8 h-10 ${scrolled ? 'text-lin' : 'text-grenat'}`} />
            <LogoHorizontal className={`transition-colors duration-300 h-8 ${scrolled ? 'text-porcelaine' : 'text-acajou'}`} />
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-lin hover:text-porcelaine' : 'text-grenat hover:text-acajou'}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              Consultation Gratuite
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className={`transition-all duration-300 hover:scale-110 ${scrolled ? 'text-porcelaine' : 'text-acajou'}`}
            >
              <Menu size={32} />
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={32} className={scrolled ? 'text-porcelaine' : 'text-acajou'} />
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
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-500 p-2">
                <X size={40} />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-8 md:p-20 gap-16 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center gap-4 md:gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-5xl md:text-8xl hover:text-lin transition-all duration-300 italic hover:pl-4"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="md:w-1/3 flex flex-col justify-center gap-12 border-t md:border-t-0 md:border-l border-porcelaine/10 pt-12 md:pt-0 md:pl-16">
                <div className="space-y-4">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-xs font-bold">Contact</h4>
                  <p className="text-2xl md:text-3xl font-serif italic">01 39 50 00 00</p>
                  <p className="text-lg opacity-50 hover:opacity-100 transition-opacity cursor-pointer">contact@elhaik-avocat.fr</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lin uppercase tracking-[0.3em] text-xs font-bold">Adresse</h4>
                  <p className="text-xl opacity-70 leading-relaxed">16 rue Saint-Simon<br />78000 Versailles</p>
                </div>
                <div className="flex gap-6">
                  {['LinkedIn', 'Twitter', 'Instagram'].map(social => (
                    <a key={social} href="#" className="text-sm uppercase tracking-widest hover:text-lin transition-colors border-b border-transparent hover:border-lin pb-1">{social}</a>
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
  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-acajou">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-porcelaine/50 text-xl leading-relaxed max-w-xs font-light"
          >
            Expertise juridique rigoureuse et défense engagée au cœur de Versailles. Spécialisé en droit des étrangers et de la nationalité.
          </motion.div>
        </div>

        <div className="md:col-span-4 flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-72 h-[450px] md:w-96 md:h-[600px] z-20"
          >
            <div className="absolute inset-0 bg-grenat/20 mix-blend-overlay z-10 rounded-sm"></div>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
              alt="Guillaume Elhaik" 
              className="w-full h-full object-cover rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-20 z-30"
            >
              <span className="font-serif text-7xl md:text-[160px] text-lin/10 italic select-none pointer-events-none whitespace-nowrap">
                Elhaik
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="md:col-span-4 flex flex-col items-end text-right gap-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col gap-3"
          >
            <a href="tel:0139500000" className="text-lin text-3xl md:text-4xl font-serif hover:text-porcelaine transition-all duration-300 italic">
              01 39 50 00 00
            </a>
            <p className="text-porcelaine/30 text-xs uppercase tracking-[0.3em] font-bold">Ligne directe cabinet</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col gap-3"
          >
            <a href="mailto:contact@elhaik-avocat.fr" className="text-lin text-3xl md:text-4xl font-serif hover:text-porcelaine transition-all duration-300 italic">
              contact@elhaik.fr
            </a>
            <p className="text-porcelaine/30 text-xs uppercase tracking-[0.3em] font-bold">Étude de votre dossier</p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="text-center w-full max-w-4xl px-12"
        >
          <LogoBlason className="text-porcelaine/90 drop-shadow-2xl mx-auto" />
        </motion.div>
      </div>
      
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
    <section id="about" className="py-32 md:py-56 px-6 bg-porcelaine relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lin/5 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start relative z-10">
        <div className="md:col-span-3">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-grenat uppercase tracking-[0.3em] text-xs font-bold mb-8"
          >
            Le Cabinet
          </motion.h3>
        </div>
        
        <div className="md:col-span-9 flex flex-col gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <p className="font-serif text-4xl md:text-7xl leading-[1.1] text-acajou italic text-balance">
              “Notre expertise est forgée par des centaines de décisions rendues par les plus hautes juridictions administratives.”
            </p>
            <div className="mt-16 flex justify-end">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 0.3, scale: 1 }}
                 className="w-64 h-32 relative"
               >
                  <img src="https://framerusercontent.com/images/VCNSEUHw9CEtEpV1IRrCnP4RJwE.svg" alt="Signature" className="w-full h-full object-contain" />
               </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <p className="text-2xl text-acajou/70 leading-relaxed font-light">
                Le Cabinet GUILLAUME EL HAIK est situé à Versailles. Nous intervenons principalement devant le Tribunal administratif de Cergy-Pontoise, le Tribunal administratif de Versailles et la Cour d'appel de Versailles.
              </p>
              <p className="text-lg text-acajou/60 leading-relaxed">
                Ces décisions témoignent de la compétence et de l’expertise du cabinet en droit des étrangers et de la nationalité, ainsi qu'en droit processuel.
              </p>
              <motion.button 
                whileHover={{ x: 10 }}
                className="group flex items-center gap-6 text-acajou font-bold uppercase tracking-[0.2em] text-xs border-b-2 border-acajou/10 pb-2"
              >
                Découvrir notre parcours <ArrowRight size={18} className="text-grenat" />
              </motion.button>
            </div>
            <div className="aspect-[4/3] bg-acajou/5 rounded-sm overflow-hidden relative group shadow-2xl">
              <div className="absolute inset-0 bg-grenat/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" 
                alt="Versailles Justice" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
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
      img: "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "02",
      title: "Nationalité Française",
      desc: "Expertise pointue en naturalisation, réintégration et contentieux du certificat de nationalité française.",
      img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "03",
      title: "Droit Processuel",
      desc: "Maîtrise rigoureuse des règles de procédure pour sécuriser vos recours devant les juridictions administratives.",
      img: "https://images.unsplash.com/photo-1453948574215-583c88ae7160?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="expertise" className="py-32 md:py-56 px-6 bg-acajou text-porcelaine relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-3">
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lin uppercase tracking-[0.3em] text-xs font-bold"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group flex flex-col gap-8"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm relative shadow-2xl">
                <div className="absolute inset-0 bg-acajou/60 group-hover:bg-acajou/20 transition-all duration-700 z-10"></div>
                <img 
                  src={area.img} 
                  alt={area.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 z-20">
                  <span className="font-serif text-5xl text-lin/30 italic">{area.id}</span>
                </div>
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <h4 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-lin transition-colors duration-300">{area.title}</h4>
                  <p className="text-porcelaine/50 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
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
  return (
    <section id="testimonials" className="py-32 md:py-56 px-6 bg-porcelaine relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
        <div className="md:col-span-3">
          <h3 className="text-grenat uppercase tracking-[0.3em] text-xs font-bold">Témoignages</h3>
        </div>
        
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <Quote className="text-lin/40" size={80} strokeWidth={1} />
            <p className="font-serif text-4xl md:text-5xl leading-tight text-acajou italic text-balance">
              “Maître Elhaik a su transformer une situation administrative bloquée depuis des années en un succès rapide. Son écoute et sa maîtrise technique sont exceptionnelles.”
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="font-bold text-acajou uppercase tracking-widest text-sm">Ahmed B.</p>
                <p className="text-acajou/40 text-xs uppercase tracking-widest mt-1">Naturalisation · 2025</p>
              </div>
              <div className="flex gap-2">
                <button className="w-14 h-14 flex items-center justify-center border border-acajou/10 hover:bg-acajou hover:text-porcelaine transition-all duration-300 group">
                  <ChevronRight size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button className="w-14 h-14 flex items-center justify-center border border-acajou/10 hover:bg-acajou hover:text-porcelaine transition-all duration-300 group">
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-4">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="aspect-[3/4] bg-acajou/5 rounded-sm overflow-hidden relative shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.1)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" 
              alt="Client Testimonial" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      q: "Comment se déroule le premier rendez-vous ?",
      a: "Nous analysons votre situation juridique, étudions vos documents et définissons ensemble la meilleure stratégie à adopter. Un devis transparent vous est remis à l'issue."
    },
    {
      q: "Intervenez-vous partout en France ?",
      a: "Bien que basés à Versailles, nous intervenons devant toutes les juridictions administratives françaises pour les dossiers de droit des étrangers et de nationalité."
    },
    {
      q: "Quels sont vos honoraires ?",
      a: "Nos honoraires sont fixés en toute transparence, généralement au forfait selon la complexité du dossier. Une convention d'honoraires est systématiquement signée."
    },
    {
      q: "Quel est le délai pour un recours OQTF ?",
      a: "Les délais sont extrêmement courts (souvent 48h, 15 jours ou 30 jours). Il est impératif de nous contacter dès réception de la décision."
    }
  ];

  return (
    <section id="faq" className="py-32 md:py-56 px-6 bg-porcelaine relative">
      <div className="max-w-4xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-grenat uppercase tracking-[0.3em] text-xs font-bold mb-20"
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
              className={`border-b border-acajou/10 transition-all duration-500 ${openIndex === i ? 'pb-12' : 'pb-8'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left group py-4"
              >
                <span className={`font-serif text-3xl md:text-5xl transition-all duration-500 ${openIndex === i ? 'text-grenat italic' : 'text-acajou/80 group-hover:text-acajou'}`}>
                  {item.q}
                </span>
                <div className={`w-10 h-10 rounded-full border border-acajou/10 flex items-center justify-center transition-transform duration-500 ${openIndex === i ? 'rotate-180 bg-acajou text-porcelaine' : ''}`}>
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
                    <p className="pt-8 text-xl md:text-2xl text-acajou/60 leading-relaxed font-light max-w-2xl">
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
  return (
    <section id="contact" className="py-32 md:py-56 px-6 bg-acajou text-porcelaine relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10">
        <div className="flex flex-col gap-16">
          <div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lin uppercase tracking-[0.3em] text-xs font-bold mb-12"
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

          <div className="space-y-12">
            {[
              { icon: Phone, label: "Téléphone", value: "01 39 50 00 00" },
              { icon: Mail, label: "Email", value: "contact@elhaik-avocat.fr" },
              { icon: MapPin, label: "Adresse", value: "16 rue Saint-Simon, 78000 Versailles" }
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-8 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-porcelaine/5 rounded-full flex items-center justify-center group-hover:bg-lin group-hover:text-acajou transition-all duration-500">
                  <item.icon size={28} className="text-lin group-hover:text-acajou transition-colors" />
                </div>
                <div>
                  <p className="text-lin/40 text-xs uppercase tracking-[0.3em] font-bold mb-2">{item.label}</p>
                  <p className="text-2xl md:text-3xl font-serif italic group-hover:text-lin transition-colors">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-porcelaine/5 p-10 md:p-16 rounded-sm backdrop-blur-sm border border-porcelaine/10 shadow-2xl"
        >
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-lin font-bold">Prénom</label>
                <input type="text" className="w-full bg-transparent border-b border-porcelaine/20 py-4 focus:border-lin outline-none transition-all duration-500 placeholder:text-porcelaine/10" placeholder="Jean" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.4em] text-lin font-bold">Nom</label>
                <input type="text" className="w-full bg-transparent border-b border-porcelaine/20 py-4 focus:border-lin outline-none transition-all duration-500 placeholder:text-porcelaine/10" placeholder="Dupont" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-lin font-bold">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-porcelaine/20 py-4 focus:border-lin outline-none transition-all duration-500 placeholder:text-porcelaine/10" placeholder="jean.dupont@email.com" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-lin font-bold">Domaine concerné</label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-porcelaine/20 py-4 focus:border-lin outline-none transition-all duration-500 appearance-none cursor-pointer">
                  <option className="bg-acajou">Droit des étrangers</option>
                  <option className="bg-acajou">Nationalité française</option>
                  <option className="bg-acajou">Contentieux administratif</option>
                  <option className="bg-acajou">Autre demande</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-lin/40" size={16} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.4em] text-lin font-bold">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-porcelaine/20 py-4 focus:border-lin outline-none transition-all duration-500 resize-none placeholder:text-porcelaine/10" placeholder="Décrivez brièvement votre situation..."></textarea>
            </div>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full py-8 bg-lin text-acajou font-bold uppercase tracking-[0.3em] text-xs hover:bg-porcelaine transition-all duration-500 shadow-xl"
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
    <footer className="py-20 px-6 bg-acajou border-t border-porcelaine/5 text-porcelaine/30">
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

        <div className="flex gap-6">
          {['Li', 'Tw', 'In'].map(s => (
            <div key={s} className="w-10 h-10 rounded-full border border-porcelaine/10 flex items-center justify-center hover:border-lin hover:text-lin transition-all cursor-pointer text-xs font-bold">{s}</div>
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
