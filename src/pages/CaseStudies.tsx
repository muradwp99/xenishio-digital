/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouteState, ActiveRoute } from '../types';
import { PROJECTS } from '../data';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { ArrowLeft, ArrowRight, Layers, FileText, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CaseStudiesProps {
  currentRoute: RouteState;
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function CaseStudies({ currentRoute, onChangeRoute }: CaseStudiesProps) {
  const isDetailView = currentRoute.view === 'case-study-detail' && currentRoute.slug;
  const currentProject = isDetailView
    ? PROJECTS.find((p) => p.slug === currentRoute.slug)
    : null;

  // Identify next/prev slugs for seamless navigation cycling
  const currentIndex = currentProject ? PROJECTS.findIndex((p) => p.slug === currentProject.slug) : -1;
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const handleLinkClick = (view: ActiveRoute, slug?: string) => {
    onChangeRoute(view, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ────────────────────────────────────────────────────────
  // CASE STUDY DETAIL VIEW
  // ────────────────────────────────────────────────────────
  if (isDetailView && currentProject) {
    return (
      <div className="relative w-full pt-32 pb-16">
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-72 h-72 bg-accent-lime/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Top back bar navigation */}
          <div className="mb-10 pointer-events-auto">
            <button
              onClick={() => handleLinkClick('work')}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase text-text-muted hover:text-accent-lime tracking-widest transition-colors duration-200"
            >
              ← Back to All Portfolios
            </button>
          </div>

          {/* Hero details card header */}
          <div className="pb-12 border-b border-border-custom mb-16">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProject.tags.map((tag) => (
                <Badge key={tag} variant="lime">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-tight max-w-4xl">
              {currentProject.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl font-sans text-xs text-text-muted">
              <div>
                <span className="uppercase text-[10px] tracking-widest block font-bold text-accent-blue">Client:</span>
                <span className="text-white text-sm font-medium mt-1 block">{currentProject.client}</span>
              </div>
              <div>
                <span className="uppercase text-[10px] tracking-widest block font-bold text-accent-blue">Industry:</span>
                <span className="text-white text-sm font-medium mt-1 block">{currentProject.industry}</span>
              </div>
              <div>
                <span className="uppercase text-[10px] tracking-widest block font-bold text-accent-blue">Timeline:</span>
                <span className="text-white text-sm font-medium mt-1 block">{currentProject.completedAt}</span>
              </div>
            </div>
          </div>

          {/* Results grid dashboard highlights */}
          {currentProject.results.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-6">
                Key Improvements Recorded:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentProject.results.map((res, index) => (
                  <motion.div
                    key={res.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card border-l-4 border-accent-lime p-6 rounded-r-2xl border-y border-r border-border-custom shadow-lg hover:border-accent-lime/60 transition-colors duration-200"
                  >
                    <span className="font-display font-black text-3xl md:text-4xl text-accent-lime block">
                      {res.value}
                    </span>
                    <span className="font-sans text-xs text-white uppercase tracking-wider font-semibold mt-1 block">
                      {res.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed challenge & solution breakdown split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <ScrollReveal className="bg-card/50 border border-border-custom rounded-3xl p-6 md:p-8">
              <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-pulse" /> The Challenge
              </h3>
              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                {currentProject.challenge}
              </p>
            </ScrollReveal>

            <ScrollReveal className="bg-card/50 border border-border-custom rounded-3xl p-6 md:p-8">
              <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green" /> The Solution
              </h3>
              <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                {currentProject.solution}
              </p>
            </ScrollReveal>
          </div>

          {/* Technology stack tags list */}
          <div className="mb-16 pb-8 border-b border-border-custom/50">
            <h3 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-4">
              Technology Stack Installed:
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {currentProject.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="border-border-custom text-text-main">
                  ✦ {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Testimonial module callout */}
          {currentProject.testimonial && (
            <ScrollReveal className="bg-card border-2 border-accent-lime/20 rounded-3xl p-8 relative overflow-hidden mb-16 pointer-events-auto">
              <Quote className="w-16 h-16 text-accent-lime/5 absolute top-4 left-4" />
              <p className="font-sans text-xs sm:text-sm text-white italic leading-relaxed relative z-10 select-all">
                “{currentProject.testimonial.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border-custom/40 relative z-10 w-full">
                <div className="w-10 h-10 rounded-full bg-bg border border-border-custom flex items-center justify-center font-display font-extrabold text-xs text-accent-lime shrink-0">
                  {currentProject.testimonial.author[0]}
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wide">
                    {currentProject.testimonial.author}
                  </h4>
                  <span className="font-sans text-[10px] text-text-muted mt-0.5 block">
                    {currentProject.testimonial.role}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Cycling Carousel Navigation (prev/next project shortcuts) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-custom/50 pt-10 mb-12 pointer-events-auto">
            {prevProject && (
              <button
                onClick={() => handleLinkClick('case-study-detail', prevProject.slug)}
                className="p-5 bg-card hover:bg-white/5 border border-border-custom rounded-2xl flex items-center gap-4 text-left transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-accent-lime shrink-0" />
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-text-muted">Previous Portfolio:</span>
                  <h5 className="font-display font-black text-xs text-white uppercase mt-0.5 truncate max-w-xs">{prevProject.client}</h5>
                </div>
              </button>
            )}

            {nextProject && (
              <button
                onClick={() => handleLinkClick('case-study-detail', nextProject.slug)}
                className="p-5 bg-card hover:bg-white/5 border border-border-custom rounded-2xl flex items-center justify-between text-right transition-all duration-200 sm:col-start-2"
              >
                <div>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-text-muted">Next Portfolio:</span>
                  <h5 className="font-display font-black text-xs text-white uppercase mt-0.5 truncate max-w-xs">{nextProject.client}</h5>
                </div>
                <ArrowRight className="w-5 h-5 text-accent-lime shrink-0" />
              </button>
            )}
          </div>

          {/* Final CTA Strip */}
          <section className="bg-surface/50 border border-border-custom rounded-3xl p-8 text-center pointer-events-auto">
            <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-accent-lime bg-accent-lime/10 px-3 py-1 rounded-full mb-3 inline-block">
              ✦ Tailored Acquisitions
            </span>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-white mt-1">
              GET SIMILAR RESULTS FOR YOUR BUSINESS
            </h3>
            <p className="font-sans text-xs text-text-muted mt-2 max-w-sm mx-auto leading-relaxed">
              Book a direct website checkup. Let’s establish which technical leaks are draining your ad budgets and index rankings today.
            </p>
            <div className="mt-6">
              <Button variant="primary" onClick={() => handleLinkClick('book-audit')}>
                Secure Your Audit Meeting →
              </Button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Listing is handled inside WorkPortfolio.
  return null;
}
