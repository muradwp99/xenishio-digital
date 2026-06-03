/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveRoute } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Award, Code, CheckSquare, Layers, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  onChangeRoute: (view: ActiveRoute) => void;
}

export default function About({ onChangeRoute }: AboutProps) {
  // Founder Career Milestones
  const milestones = [
    { year: '2025 - Present', company: 'Xenishio Digital', role: 'Full-Stack Web Founder & Technical Lead', desc: 'Direct client-acquisition systems, technical speed remediation, and custom full-stack solutions globally.' },
    { year: '2024 - 2025', company: 'Beige Corporation (US)', role: 'Web Stack Consultant', desc: 'Engineered multi-site layout design blocks, caching structures, and standard B2B conversion loops.' },
    { year: '2023 - 2024', company: 'Jamuna Bank PLC / Appsmove', role: 'Full-Stack Security Dev & Team Lead', desc: 'Accelerated banking digital portal rendering by 60%, auditing legacy systems.' },
    { year: '2021 - 2023', company: 'Dependopolis · Unicorn Studio · Sycorax', role: 'React Frontend Developer', desc: 'Crafted dynamic React applications, Framer Motion layouts, and modular design components.' },
    { year: '2020 - 2021', company: 'Fiverr (Level 1 Expert) · Evofe', role: 'Speed Optimization Specialist', desc: 'Optimized hundreds of global websites, achieving mobile Lighthouse scores of 95+.' },
    { year: '2019 - 2020', company: 'Soft-Tech IT BD', role: 'Junior WordPress Theme Designer', desc: 'Developed custom WordPress themes and localized layouts under PHP.' }
  ];

  const values = [
    { title: 'Extreme Speed', desc: 'We optimize down to individual millisecond weights. Fast loading keeps bounce rates low and retention high.', icon: <Clock className="w-5 h-5 text-accent-lime" /> },
    { title: 'Rigid Quality', desc: 'Zero visual layout shifts, clean semantic markup, fully documented types, and AA compliance standard.', icon: <Code className="w-5 h-5 text-accent-blue" /> },
    { title: 'Absolute Honesty', desc: 'No vendor locks, no hidden maintenance retainer traps. Every line of code belongs strictly to your business.', icon: <CheckSquare className="w-5 h-5 text-brand-green" /> },
    { title: 'Revenue Driven', desc: 'A pretty layout is useless if it doesn’t capture email list conversions. We build with B2B ROI context first.', icon: <TrendingUp className="w-5 h-5 text-accent-orange" /> }
  ];

  const technologies = [
    { name: 'TypeScript / React', level: '96%', focus: 'Full Interactive App architecture' },
    { name: 'Next.js 15 / Vite', level: '95%', focus: 'High-speed Static pre-compiling' },
    { name: 'WordPress Custom PHP', level: '98%', focus: 'Hardened corporate theme coding' },
    { name: 'Tailwind CSS v4', level: '100%', focus: 'Sleek custom layout systems' },
    { name: 'GA4 / Tag Manager', level: '92%', focus: 'Conversion funnel analytics tracking' },
    { name: 'Technical SEO', level: '95%', focus: 'Structured schemas, Crawling optimization' }
  ];

  return (
    <div className="relative w-full pt-32 pb-16">
      {/* Background visual graphics */}
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[-10%] w-96 h-96 bg-accent-lime/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. HERO DESCRIPTION */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="max-w-4xl">
          <Badge variant="lime" className="mb-4">
            Our Identity
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
            WE ARE <br />
            XENISHIO DIGITAL
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-text-muted mt-6 max-w-3xl leading-relaxed font-light">
            Founded by Md Muradujjaman inside Dhaka, Bangladesh, we solve a critical corporate bottleneck: slow, insecure, unoptimized websites that lose B2B conversions. We replace templated visual clutter with tailored, speed-engineered platforms that work for your business 24/7.
          </p>
        </div>
      </section>

      {/* 2. FOUNDER BIO PROFILE SECTION */}
      <section className="px-6 max-w-7xl mx-auto py-16 border-t border-border-custom bg-surface/30 rounded-3xl mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Avatar Area */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group w-72 h-72 md:w-80 md:h-80 pointer-events-auto">
              <div className="absolute inset-0 bg-accent-lime rounded-2xl transform rotate-3 scale-95 group-hover:rotate-6 transition-transform duration-300" />
              <div className="absolute inset-x-0 inset-y-0 bg-card border border-border-custom rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-lg relative z-10 select-none">
                {/* Visual Avatar Monogram */}
                <span className="font-display font-black text-6xl text-accent-lime">
                  MM
                </span>
                <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider mt-4">
                  Md Muradujjaman
                </h3>
                <span className="font-sans text-[10px] text-text-muted tracking-widest uppercase mt-1">
                  Dhaka, Bangladesh · BS SE
                </span>
                <Badge variant="outline" className="border-accent-lime/40 text-accent-lime text-[9px] mt-4">
                  Founder & Principal Engineer
                </Badge>
              </div>
            </div>
          </div>

          {/* Detailed Biography Text */}
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <Badge variant="outline">
              The Architect
            </Badge>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
              Md Muradujjaman
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-main leading-relaxed">
              Md Muradujjaman holds a Bachelor of Science in Software Engineering from Daffodil International University. For the past 5+ years, he has specialized in optimization engineering, custom PHP development, and headless React routing architectures.
            </p>
            <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
              Before establishing Xenishio Digital, Md Muradujjaman acted as technical lead for critical integrations. He audited database caching frameworks and sped up mobile loading grids for Bangladesh\'s major retail bank system (Jamuna Bank PLC), and structured multi-site layouts for US client networks like Beige Corporation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-2">
              <div className="border border-border-custom bg-card/55 rounded-xl p-4">
                <span className="font-display font-black text-xl text-accent-lime">50+</span>
                <span className="font-sans text-[10px] text-text-muted tracking-wide uppercase mt-1 block">Brands Optimized</span>
              </div>
              <div className="border border-border-custom bg-card/55 rounded-xl p-4">
                <span className="font-display font-black text-xl text-accent-blue">BS SE</span>
                <span className="font-sans text-[10px] text-text-muted tracking-wide uppercase mt-1 block">Software Engineering</span>
              </div>
              <div className="border border-border-custom bg-card/55 rounded-xl p-4 col-span-2 md:col-span-1">
                <span className="font-display font-black text-xl text-brand-green">100%</span>
                <span className="font-sans text-[10px] text-text-muted tracking-wide uppercase mt-1 block">Friction-free Speed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE AGENCY VALUES SECTION */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <SectionTitle
          eyebrow="Integrity Checks"
          title={<>Our Operating <span className="font-serif italic text-accent-lime font-normal">Principles</span></>}
          subtitle="How we maintain standard-setting trust margins, making sure your software remains healthy and performant."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <ScrollReveal
              key={v.title}
              delay={idx * 0.05}
              className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col gap-4 hover:border-text-muted transition-colors duration-300"
            >
              <div className="p-3 bg-bg border border-border-custom w-11 h-11 flex items-center justify-center rounded-xl">
                {v.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                {v.title}
              </h3>
              <p className="font-sans text-xs text-text-muted leading-relaxed">
                {v.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. TECH EXP MATRIX */}
      <section className="bg-surface border-y border-border-custom py-24 px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Qualifications"
            title={<>Engineers’ <span className="font-serif italic text-accent-lime font-normal">Tech Matrix</span></>}
            subtitle="The languages and platforms we use daily, tuned for maximum speeds."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {technologies.map((t, idx) => (
              <ScrollReveal
                key={t.name}
                delay={idx * 0.05}
                className="bg-card border border-border-custom rounded-2xl p-6 hover:border-accent-blue/30 transition-colors duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-display font-black text-xs text-white uppercase tracking-wider">
                      {t.name}
                    </span>
                    <span className="font-sans text-xs text-accent-blue font-bold">
                      {t.level}
                    </span>
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-bg h-1 rounded-full overflow-hidden mb-4 border border-border-custom">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: t.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="bg-accent-blue h-full rounded-full"
                    />
                  </div>
                </div>
                <p className="font-sans text-[10px] text-text-muted mt-2 uppercase tracking-wide">
                  Focus: {t.focus}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT TIMELINE FROM 2019 TO PRESENT */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <SectionTitle
          eyebrow="The Timeline"
          title={<>Our Career <span className="font-serif italic text-accent-lime font-normal">Milestones</span></>}
          subtitle="Exploratory pathways from software engineering research to complex institutional delivery."
        />

        <div className="mt-12 flex flex-col border-l-2 border-border-custom/50 ml-4 md:ml-32 pl-8 space-y-12">
          {milestones.map((ms, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.05}
              className="relative flex flex-col items-start gap-2"
            >
              {/* Bullet Node Indicator */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-bg border-2 border-accent-lime flex items-center justify-center relative z-10 shrink-0">
                <div className="w-2 h-2 rounded-full bg-accent-lime" />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="font-sans text-xs font-bold text-accent-lime tracking-widest uppercase shrink-0">
                  {ms.year}
                </span>
                <span className="font-display font-bold text-sm text-white uppercase tracking-wide">
                  {ms.company}
                </span>
              </div>

              <h4 className="font-sans text-xs font-bold text-text-main uppercase">
                {ms.role}
              </h4>

              <p className="font-sans text-xs text-text-muted max-w-2xl leading-relaxed mt-1">
                {ms.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. FINAL ABOUT CTA SECTION */}
      <section className="px-6 max-w-7xl mx-auto text-center py-12 border border-border-custom bg-card/40 rounded-3xl pointer-events-auto">
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
          WANT TO WORK DIRECTLY WITH OUR TEAM?
        </h3>
        <p className="font-sans text-xs text-text-muted mt-2 max-w-md mx-auto">
          We take on a limited count of 4 custom redesign or engineering projects per month to guarantee Md Muradujjaman’s full attention. Secure your timeline.
        </p>
        <div className="mt-6">
          <Button variant="primary" onClick={() => onChangeRoute('book-audit')}>
            Get Started with a Free Audit →
          </Button>
        </div>
      </section>
    </div>
  );
}
