/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RouteState, ActiveRoute } from '../types';
import { PROJECTS } from '../data';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { ArrowRight, Star, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkProps {
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Work({ onChangeRoute }: WorkProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'wordpress' | 'nextjs' | 'webflow' | 'seo' | 'ecommerce'>('all');

  const filters = [
    { label: 'All Projects', value: 'all' as const },
    { label: 'WordPress', value: 'wordpress' as const },
    { label: 'Next.js', value: 'nextjs' as const },
    { label: 'Webflow', value: 'webflow' as const },
    { label: 'SEO Visibility', value: 'seo' as const },
    { label: 'E-commerce', value: 'ecommerce' as const }
  ];

  // Dynamically filter matching items
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    
    // Normalize string tag sets for matching accuracy
    const tagsLower = p.tags.map(t => t.toLowerCase());
    if (activeFilter === 'nextjs') {
      return tagsLower.includes('next.js') || tagsLower.includes('react');
    }
    if (activeFilter === 'wordpress') {
      return tagsLower.includes('wordpress');
    }
    if (activeFilter === 'webflow') {
      return tagsLower.includes('webflow');
    }
    if (activeFilter === 'seo') {
      return tagsLower.includes('seo');
    }
    if (activeFilter === 'ecommerce') {
      return tagsLower.includes('e-commerce') || tagsLower.includes('fintech') || tagsLower.includes('shop');
    }
    return true;
  });

  return (
    <div className="relative w-full pt-32 pb-16">
      {/* Background aesthetics */}
      <div className="absolute top-[15%] left-[-10%] w-[36rem] h-[36rem] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[36rem] h-[36rem] bg-accent-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Our Portfolio"
          title={<>Selected <span className="font-serif italic text-accent-lime font-normal">Case Studies</span></>}
          subtitle="Explore our catalog of web assets, transaction portals, and search optimization case reviews."
        />

        {/* 1. Client-side state filter tabs bar */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16 border-b border-border-custom pb-8 pointer-events-auto">
          <span className="text-[10px] uppercase font-sans text-text-muted tracking-widest flex items-center gap-1 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </span>
          {filters.map((flt) => {
            const isSelected = activeFilter === flt.value;
            return (
              <button
                key={flt.value}
                onClick={() => setActiveFilter(flt.value)}
                className={`font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  isSelected
                    ? 'bg-accent-lime text-black border-accent-lime font-bold'
                    : 'border-border-custom bg-card/60 text-text-muted hover:border-text-muted hover:text-white'
                }`}
              >
                {flt.label}
              </button>
            );
          })}
        </div>

        {/* 2. Responsive 2-column project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj, idx) => (
                <motion.div
                  key={proj.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card border border-border-custom hover:border-accent-lime/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group flex-nowrap"
                >
                  <div>
                    {/* Badge array */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <span className="font-sans text-[10px] text-accent-lime uppercase tracking-widest font-bold">
                      Industry: {proj.industry}
                    </span>

                    <h3 className="font-display font-black text-2xl uppercase mt-2 text-white leading-tight group-hover:text-accent-lime transition-all duration-200">
                      {proj.title}
                    </h3>

                    <p className="font-sans text-xs text-text-muted mt-3 leading-relaxed font-light">
                      {proj.description}
                    </p>

                    {/* Numeric key results container */}
                    {proj.results.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 bg-bg border border-border-custom/50 rounded-xl p-4 mt-6">
                        {proj.results.map((res) => (
                          <div key={res.label}>
                            <div className="text-accent-lime font-display font-extrabold text-sm md:text-base">
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
                      className="inline-flex items-center gap-1.5 font-display text-xs text-accent-lime uppercase font-bold hover:text-white transition-colors"
                    >
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-card/25 border border-border-custom rounded-3xl">
                <span className="font-sans text-xs text-text-muted uppercase">No items match this filter category.</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Global Bottom FAQ / Retainer triggers */}
        <section className="px-6 text-center py-12 border border-border-custom bg-surface/30 rounded-3xl mt-24 pointer-events-auto">
          <Star className="w-6 h-6 text-accent-lime mx-auto mb-4 animate-spin-slow" />
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
            NEED REVENUE-DRIVEN OPTIMIZATIONS?
          </h3>
          <p className="font-sans text-xs text-text-muted mt-2 max-w-sm mx-auto leading-relaxed">
            Every case review illustrates our meticulous standard. We build fast, secure code designed to pull organic traffic and close prospects.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-col sm:flex-row">
            <Button variant="primary" onClick={() => onChangeRoute('book-audit')}>
              Request A Free Audit
            </Button>
            <Button variant="outline" onClick={() => onChangeRoute('contact')}>
              Discuss Scope →
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}
