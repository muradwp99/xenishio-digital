/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RouteState, ActiveRoute } from '../types';
import { SERVICES, PROJECTS } from '../data';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import {
  Monitor,
  Search,
  Layout,
  Zap,
  BarChart,
  Shield,
  HelpCircle,
  TrendingUp,
  Wrench,
  Boxes,
  Lock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesProps {
  currentRoute: RouteState;
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Services({ currentRoute, onChangeRoute }: ServicesProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Map icon strings to actual Lucide component nodes
  const iconMap: Record<string, any> = {
    Monitor: <Monitor className="w-8 h-8 text-accent-lime" />,
    Search: <Search className="w-8 h-8 text-accent-lime" />,
    Layout: <Layout className="w-8 h-8 text-accent-lime" />,
    Zap: <Zap className="w-8 h-8 text-accent-lime" />,
    BarChart: <BarChart className="w-8 h-8 text-accent-lime" />,
    Shield: <Shield className="w-8 h-8 text-accent-lime" />
  };

  const isDetailView = currentRoute.view === 'service-detail' && currentRoute.slug;
  const currentService = isDetailView
    ? SERVICES.find((s) => s.slug === currentRoute.slug)
    : null;

  // Let's grab some related case studies that are tagged with this service
  const relatedCaseStudies = currentService
    ? PROJECTS.filter((p) => p.services.includes(currentService.title)).slice(0, 2)
    : [];

  // Toggle FAQ Accordion trigger
  const handleFaqToggle = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // ────────────────────────────────────────────────────────
  // 1. INDIVIDUAL SERVICE DETAILS PAGE
  // ────────────────────────────────────────────────────────
  if (isDetailView && currentService) {
    return (
      <div className="relative w-full pt-32 pb-16">
        <div className="absolute top-[10%] left-[-5%] w-80 h-80 bg-accent-lime/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-accent-blue/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Back Navigation Bar */}
          <div className="mb-10 pointer-events-auto">
            <button
              onClick={() => onChangeRoute('services')}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase text-text-muted hover:text-accent-lime tracking-widest transition-colors duration-200"
            >
              ← Back to All Services
            </button>
          </div>

          {/* Header Description Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-border-custom mb-16">
            <div className="max-w-2xl">
              <span className="font-sans text-xs font-bold text-accent-lime tracking-widest uppercase flex items-center gap-1">
                ⚡ Specialization Unit
              </span>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white mt-3 tracking-tight">
                {currentService.title}
              </h1>
              <p className="font-sans text-sm text-text-muted mt-2 tracking-wide uppercase">
                {currentService.tagline}
              </p>
            </div>
            <div className="p-5 bg-card border border-border-custom rounded-2xl shrink-0">
              {iconMap[currentService.icon] || <Monitor className="w-8 h-8 text-accent-lime" />}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Area (Challenge + Deliverables) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Problem Statement Card */}
              <div className="bg-card/50 border border-border-custom rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-xs font-sans text-accent-orange font-bold uppercase tracking-widest bg-accent-orange/10 px-3 py-1 rounded-full">
                  The Hurdle
                </div>
                <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider mb-3">
                  The Problem Most B2B Businesses Face:
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-main leading-relaxed">
                  {currentService.problem}
                </p>
              </div>

              {/* What's Included Deliverables Section */}
              <div>
                <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight mb-6">
                  What is Included in Our Deliverable Group
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentService.deliverables.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex gap-3 bg-card border border-border-custom/60 rounded-xl p-4 flex-row hover:border-accent-lime/40 transition-colors duration-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent-lime/10 border border-accent-lime/30 text-accent-lime flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <p className="font-sans text-xs text-text-main leading-relaxed select-all">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tools We Deploy Section */}
              <div>
                <h3 className="font-display font-extrabold text-xl text-white uppercase tracking-tight mb-4">
                  Advanced Technology Assets We Use:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {currentService.tools.map((tag) => (
                    <Badge key={tag} variant="lime">
                      ✦ {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* FAQ Section Accordion */}
              {currentService.faq.length > 0 && (
                <div className="pt-8 border-t border-border-custom">
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-accent-lime" /> Service FAQs
                  </h3>
                  <div className="flex flex-col gap-4">
                    {currentService.faq.map((item, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div
                          key={index}
                          className="bg-card border border-border-custom rounded-2xl overflow-hidden pointer-events-auto"
                        >
                          <button
                            onClick={() => handleFaqToggle(index)}
                            className="w-full p-5 text-left font-display font-bold text-xs sm:text-sm text-white uppercase hover:text-accent-lime flex justify-between items-center bg-transparent"
                          >
                            <span>{item.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-accent-lime shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                            )}
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-5 pt-0 text-xs text-text-muted border-t border-border-custom/30 font-sans leading-relaxed select-all">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar (Scheduling & Case Studies Link) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6 w-full">
              {/* Engagement CTA Drawer */}
              <div className="bg-card border-2 border-accent-lime/40 rounded-3xl p-6 shadow-2xl relative pointer-events-auto">
                <span className="font-sans text-[10px] text-accent-lime uppercase tracking-widest font-extrabold flex items-center gap-1 mb-2">
                  <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Direct Consultation
                </span>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider mb-2">
                  Need {currentService.title}?
                </h4>
                <p className="font-sans text-[11px] text-text-muted leading-relaxed mb-6">
                  Get a comprehensive plan reviewed live on Google Meet with Md Muradujjaman. No sales funnels, just direct advice tailored to your domain.
                </p>
                <Button
                  variant="primary"
                  className="w-full text-xs font-bold uppercase"
                  onClick={() => onChangeRoute('book-audit')}
                >
                  Request A Free Audit
                </Button>
                <button
                  onClick={() => onChangeRoute('pricing')}
                  className="w-full text-center font-sans text-[10px] uppercase text-text-muted hover:text-accent-lime tracking-wider font-semibold mt-4 transition-colors"
                >
                  View Agency Pricing Details →
                </button>
              </div>

              {/* Related Portfolios Sidebar Area */}
              {relatedCaseStudies.length > 0 && (
                <div className="border border-border-custom rounded-3xl p-6 bg-surface/50">
                  <h4 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-4 border-b border-border-custom/50 pb-3">
                    Related Portfolios:
                  </h4>
                  <div className="flex flex-col gap-4">
                    {relatedCaseStudies.map((p) => (
                      <div
                        key={p.slug}
                        onClick={() => onChangeRoute('case-study-detail', p.slug)}
                        className="bg-card border border-border-custom hover:border-accent-blue/40 rounded-xl p-4 cursor-pointer group transition-all duration-200 pointer-events-auto"
                      >
                        <h5 className="font-display font-bold text-xs text-white group-hover:text-accent-blue uppercase tracking-wide">
                          {p.title}
                        </h5>
                        <p className="font-sans text-[10px] text-text-muted mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          Metric: {p.results[0]?.value} {p.results[0]?.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────
  // 2. MASTER SERVICES LISTING OVERVIEW PAGE
  // ────────────────────────────────────────────────────────
  return (
    <div className="relative w-full pt-32 pb-16">
      {/* Background radial highlight */}
      <div className="absolute top-[20%] left-[-10%] w-[32rem] h-[32rem] bg-accent-lime/5 rounded-full blur-[110px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Competency Directory"
          title={<>Our Core <span className="font-serif italic text-accent-lime font-normal">Expertise</span></>}
          subtitle="Discover our end-to-end web engineering, organic search ranking, and advanced analytic system services tailored for enterprise conversions."
        />

        {/* Large modular services matrix */}
        <div className="grid grid-cols-1 gap-8 mt-16">
          {SERVICES.map((srv, idx) => (
            <ScrollReveal
              key={srv.slug}
              delay={idx * 0.05}
              className="bg-card border border-border-custom rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:border-accent-lime/40 transition-all duration-300 relative group"
            >
              {/* Core Info Info column */}
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-bg border border-border-custom rounded-xl shadow-inner group-hover:border-accent-lime/30 transition-colors duration-200">
                    {iconMap[srv.icon] || <Monitor />}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase tracking-tight group-hover:text-accent-lime transition-all duration-200 leading-tight">
                      {srv.title}
                    </h3>
                    <span className="font-sans text-[10px] text-accent-lime tracking-widest uppercase font-bold mt-1 block">
                      {srv.tagline}
                    </span>
                  </div>
                </div>
                
                <p className="font-sans text-xs md:text-sm text-text-muted mt-5 leading-relaxed font-light">
                  {srv.description}
                </p>

                {/* Bullets deliverables list shortcuts */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="bg-bg/60 border border-border-custom/50 text-text-muted text-[10px] font-sans px-2.5 py-1 rounded-md"
                    >
                      ✓ {item.split(' ')[0]} {item.split(' ').slice(1, 4).join(' ')}...
                    </span>
                  ))}
                </div>
              </div>

              {/* Action and pricing routes triggers */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-4 lg:mt-0 pointer-events-auto">
                <Button
                  variant="outline"
                  size="md"
                  className="font-display tracking-tight text-xs uppercase"
                  onClick={() => onChangeRoute('service-detail', srv.slug)}
                >
                  Read deliverables →
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="bg-accent-lime text-black hover:bg-white text-xs font-bold uppercase"
                  onClick={() => onChangeRoute('book-audit')}
                >
                  Get Audit
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
