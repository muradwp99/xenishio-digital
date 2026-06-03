/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { RouteState, ActiveRoute } from '../types';
import { SERVICES, PROJECTS, TESTIMONIALS, BLOG_POSTS } from '../data';
import { listDocuments } from '../lib/firebase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ScrollReveal from '../components/ui/ScrollReveal';
import Marquee from '../components/ui/Marquee';
import {
  Monitor,
  Search,
  Layout,
  Zap,
  BarChart,
  Shield,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle,
  FileText,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Home({ onChangeRoute }: HomeProps) {
  const [projectsList, setProjectsList] = useState<any[]>(PROJECTS);
  const [testimonialsList, setTestimonialsList] = useState<any[]>(TESTIMONIALS);

  useEffect(() => {
    async function bindLiveData() {
      try {
        const liveProjects = await listDocuments('projects', PROJECTS);
        const liveTestimonials = await listDocuments('testimonials', TESTIMONIALS);
        setProjectsList(liveProjects);
        setTestimonialsList(liveTestimonials);
      } catch (e) {
        console.warn('Firebase connection unavailable on Home first paint:', e);
      }
    }
    bindLiveData();
    
    // Register event listener for simulator local updates
    window.addEventListener('xenishio-local-db-update', bindLiveData);
    return () => window.removeEventListener('xenishio-local-db-update', bindLiveData);
  }, []);

  const marqueeItems = [
    'WordPress',
    'Next.js',
    'React',
    'Webflow',
    'SEO',
    'Node.js',
    'Shopify',
    'GA4',
    'Figma',
    'Framer',
    'Landing Pages',
    'Core Web Vitals'
  ];

  // Map icon names to Lucide elements
  const iconMap: Record<string, any> = {
    Monitor: <Monitor className="w-6 h-6 text-accent-lime" />,
    Search: <Search className="w-6 h-6 text-accent-lime" />,
    Layout: <Layout className="w-6 h-6 text-accent-lime" />,
    Zap: <Zap className="w-6 h-6 text-accent-lime" />,
    BarChart: <BarChart className="w-6 h-6 text-accent-lime" />,
    Shield: <Shield className="w-6 h-6 text-accent-lime" />
  };

  const processSteps = [
    {
      num: '01',
      title: 'Audit',
      desc: 'We analyze your current site for speed failures, technical SEO gaps, and conversion leaks — entirely for free.'
    },
    {
      num: '02',
      title: 'Strategize',
      desc: 'Formulate a precise web roadmap tailored specifically to your audience acquisition and monthly budget.'
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Structured custom development, hand-tested across mobile and desktop, delivered right on schedule — every time.'
    },
    {
      num: '04',
      title: 'Grow',
      desc: 'Post-launch search indexing optimization, detailed tracking event tags, and continuous conversion reviews.'
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
        {/* Animated BG Orbs */}
        <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] md:w-[45rem] md:h-[45rem] bg-accent-lime/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35rem] h-[35rem] md:w-[45rem] md:h-[45rem] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        
        {/* Subtle Noise Grid */}
        <div className="absolute inset-0 noise-bg z-[1]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Main Hero Copy Box */}
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-accent-lime/30 bg-accent-lime/5 text-accent-lime text-xs font-sans font-bold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Dhaka-Based. Globally Trusted.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[0.9] tracking-tight uppercase"
            >
              We Build Websites <br />
              That <span className="font-serif italic text-accent-lime lowercase font-normal tracking-wide">work</span> While <br />
              You Sleep
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-light leading-relaxed mt-2"
            >
              High-performance custom design, speed, and search compliance for B2B industries globally. We do not just code design layouts — we engineer high-converting revenue streams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 pointer-events-auto"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onChangeRoute('book-audit')}
              >
                Book Free Audit
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onChangeRoute('work')}
              >
                See Our Work
              </Button>
            </motion.div>
          </div>

          {/* Right Floating Stat Chips Area */}
          <div className="lg:col-span-4 relative flex flex-col justify-center items-center h-full min-h-[300px] lg:min-h-none">
            {/* Ambient Border Card Wrapper */}
            <div className="absolute inset-0 border border-border-custom bg-surface/40 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-center gap-6" />

            <div className="relative z-10 w-full flex flex-col gap-6 p-4">
              {[
                { label: 'Indusrial Practice', value: '5+ Years', icon: <Award className="w-5 h-5 text-accent-lime" /> },
                { label: 'Clients Completed', value: '50+ Websites', icon: <CheckCircle className="w-5 h-5 text-accent-blue" /> },
                { label: 'Traffic Velocity', value: '3x Avg Growth', icon: <TrendingUp className="w-5 h-5 text-brand-green" /> }
              ].map((chip, idx) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="flex items-center gap-4 bg-card/80 border border-border-custom p-4 rounded-2xl flex-row"
                >
                  <div className="p-2.5 bg-bg/80 border border-border-custom rounded-xl shadow-inner shrink-0">
                    {chip.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs text-text-muted uppercase tracking-wider">{chip.label}</h4>
                    <span className="font-display font-extrabold text-lg text-white mt-0.5 block uppercase tracking-tight">{chip.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MARQUEE TICKER */}
      <section className="relative z-20">
        <Marquee items={marqueeItems} speed="medium" />
      </section>

      {/* SECTION 3 — SERVICES OVERVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <SectionTitle
          eyebrow="What We Do"
          title={<>Design & Dev <span className="font-serif italic text-accent-lime font-normal">Capabilties</span></>}
          subtitle="We craft tailored client acquisition systems using modern frameworks and high-visibility optimization structures."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, idx) => (
            <ScrollReveal
              key={srv.slug}
              delay={idx * 0.05}
              className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-accent-lime/60 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex-nowrap"
            >
              {/* Card visual highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-lime/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                <div className="p-3 bg-bg border border-border-custom w-12 h-12 flex items-center justify-center rounded-xl group-hover:border-accent-lime/80 transition-colors duration-300">
                  {iconMap[srv.icon] || <Monitor />}
                </div>
                
                <h3 className="font-display font-black text-xl text-white uppercase mt-6 tracking-tight tracking-tight leading-tight group-hover:text-accent-lime transition-colors">
                  {srv.title}
                </h3>
                
                <p className="font-sans text-xs text-text-muted mt-3 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="border-t border-border-custom/50 pt-5 mt-6 flex justify-between items-center bg-transparent pointer-events-auto">
                <span className="text-[10px] uppercase font-sans text-text-muted tracking-widest">
                  {srv.tagline}
                </span>
                <button
                  onClick={() => onChangeRoute('service-detail', srv.slug)}
                  className="p-2 bg-bg hover:bg-accent-lime text-text-muted hover:text-black rounded-full border border-border-custom hover:border-accent-lime transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center pointer-events-auto">
          <Button variant="outline" onClick={() => onChangeRoute('services')}>
            View All Services Details →
          </Button>
        </div>
      </section>

      {/* SECTION 4 — PROCESS */}
      <section className="bg-surface border-y border-border-custom py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Our Workflow"
            title={<>How We Build <span className="font-serif italic text-accent-lime font-normal">Revenue Engines</span></>}
            subtitle="A transparent, tested pipeline to identify gaps, architect designs, and compound client signups."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-16">
            {processSteps.map((step, idx) => (
              <ScrollReveal
                key={step.num}
                delay={idx * 0.1}
                className="relative bg-card border border-border-custom rounded-2xl p-6 group hover:border-accent-lime/40 transition-all duration-300 flex flex-col justify-start"
              >
                {/* Large Background Step Counter */}
                <div className="absolute top-4 right-4 text-6xl md:text-7xl font-display font-black text-white/[0.03] select-none group-hover:text-accent-lime/[0.06] transition-colors duration-300">
                  {step.num}
                </div>

                <div className="font-sans font-black text-accent-lime text-xs tracking-widest uppercase mb-3">
                  STAGES {step.num}
                </div>
                
                <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight">
                  {step.title}
                </h3>
                
                <p className="font-sans text-xs text-text-muted mt-3 leading-relaxed">
                  {step.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — STATS WITH ANIMATED COUNTERS */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <div className="w-full bg-card border border-border-custom rounded-3xl p-8 md:p-12 shadow-inner grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12 divide-y md:divide-y-0 divide-border-custom/50">
          {[
            { end: 50, suffix: '+', label: 'Projects Delivered' },
            { end: 5, suffix: '+ Years', label: 'Global Experience' },
            { end: 3, suffix: 'x Avg', label: 'Traffic Growth' },
            { end: 100, suffix: '%', label: 'Client Satisfaction' }
          ].map((stat, idx) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4 pt-6 md:pt-0">
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                className="text-4xl md:text-5xl lg:text-6xl text-accent-lime tracking-tighter"
              />
              <span className="font-sans text-[10px] md:text-xs text-text-muted mt-2 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — FEATURED PROJECTS */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <SectionTitle
          eyebrow="Selected Portfolio"
          title={<>Selected <span className="font-serif italic text-accent-lime font-normal">Client work</span></>}
          subtitle="Explore some of our major speed optimization, corporate development, and search ranking overhauls."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.slice(0, 4).map((proj, idx) => (
            <ScrollReveal
              key={proj.slug}
              delay={idx * 0.1}
              className="bg-card border border-border-custom rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-accent-lime/60 hover:shadow-2xl transition-all duration-300 relative group"
            >
              <div>
                {/* Visual Project Thumbnail Screenshot */}
                {proj.image && (
                  <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl border border-border-custom/50 bg-bg mb-6 relative z-10">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="font-display font-black text-2xl uppercase text-white tracking-tight leading-tight group-hover:text-accent-lime transition-colors">
                  {proj.title}
                </h3>
                
                <p className="font-sans text-xs text-text-muted mt-3 leading-relaxed">
                  {proj.description}
                </p>

                {proj.results.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 bg-bg/50 border border-border-custom/50 rounded-xl p-4 mt-6">
                    {proj.results.map((res) => (
                      <div key={res.label}>
                        <div className="text-accent-blue font-display font-extrabold text-sm md:text-base">
                          {res.value}
                        </div>
                        <div className="text-[9px] font-sans text-text-muted uppercase tracking-wider mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-border-custom/40 flex justify-between items-center pointer-events-auto">
                <span className="font-sans text-xs text-text-muted">
                  Client: {proj.client}
                </span>
                <button
                  onClick={() => onChangeRoute('case-study-detail', proj.slug)}
                  className="inline-flex items-center gap-1.5 font-display text-xs text-accent-blue uppercase font-bold hover:text-white transition-colors"
                >
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center pointer-events-auto">
          <Button variant="outline" onClick={() => onChangeRoute('work')}>
            See All Client Projects →
          </Button>
        </div>
      </section>

      {/* SECTION 7 — WHY XENISHIO */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-sans font-bold text-accent-lime tracking-widest uppercase">
              ⚡ The Agency Advantage
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight mt-3">
              YOU PAY FOR A SITE. <br />
              WE DELIVER A <br />
              <span className="font-serif italic text-accent-lime lowercase font-normal tracking-wide">growth</span> ENGINE.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed font-light mt-4 max-w-lg">
              We work with maximum density. Every project contains hand-coded responsive configurations, advanced indexing schemas, and complete tracking hooks. No middleman, no outsourced delays.
            </p>
          </div>

          <div className="bg-card border border-border-custom rounded-3xl p-8 flex flex-col gap-6">
            {[
              'Complete SEO visibility architecture & schema structured codes matching Google guidelines included.',
              'BS in Software Engineering + 5 years practice building for major institutions like Jamuna Bank PLCs.',
              'Direct expert contact — you collaborate directly with Md Muradujjaman, never account buffers.',
              'High-speed optimization pushes. Target desktop speeds in milliseconds, keeping bounce rates low.'
            ].map((pt, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-5 h-5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="font-sans text-xs text-text-main leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <section className="bg-surface border-y border-border-custom py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Reviews"
            title={<>What Our <span className="font-serif italic text-accent-lime font-normal">Clients Say</span></>}
            subtitle="Explore direct feedback from CEOs, marketing heads, and founders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 font-sans">
            {testimonialsList.map((t, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.05}
                className="bg-card border border-border-custom rounded-2xl p-6 md:p-8 flex flex-col justify-between relative group"
              >
                <div className="text-3xl text-accent-lime/20 font-serif absolute top-4 left-4 font-black">
                  “
                </div>
                <p className="font-sans text-xs sm:text-sm text-text-main italic leading-relaxed relative z-10">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border-custom/40">
                  <div className="w-9 h-9 rounded-full bg-bg border border-border-custom flex items-center justify-center font-display font-bold text-xs text-accent-lime">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wide">
                      {t.author}
                    </h4>
                    <span className="font-sans text-[10px] text-text-muted mt-0.5 block">
                      {t.role}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — LATEST BLOG PREVIEWS */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <SectionTitle
          eyebrow="Insights"
          title={<>Latest From <span className="font-serif italic text-accent-lime font-normal">The Blog</span></>}
          subtitle="Simple, technical tutorials to boost overall search acquisition, technical speed, and core B2B metrics."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <ScrollReveal
              key={post.slug}
              delay={idx * 0.05}
              className="bg-card border border-border-custom rounded-2xl p-5 hover:border-accent-lime/40 group transition-all duration-300 flex flex-col justify-between select-none"
            >
              <div>
                <span className="font-sans text-[10px] text-accent-lime uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
                </span>

                <h3 className="font-display font-black text-lg text-white uppercase leading-tight tracking-tight mt-1 group-hover:text-accent-lime transition-colors">
                  {post.title}
                </h3>

                <p className="font-sans text-xs text-text-muted mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-custom/50 flex justify-between items-center pointer-events-auto">
                <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest">
                  {post.readTime} min read
                </span>
                <button
                  onClick={() => onChangeRoute('blog-detail', post.slug)}
                  className="p-1.5 bg-bg border border-border-custom rounded-full hover:bg-accent-lime hover:text-black hover:border-accent-lime transition-all duration-200"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center pointer-events-auto">
          <Button variant="outline" onClick={() => onChangeRoute('blog')}>
            Read All Insights Articles →
          </Button>
        </div>
      </section>
    </div>
  );
}
