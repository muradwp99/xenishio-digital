/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouteState, ActiveRoute } from '../../types';
import { SERVICES } from '../../data';
import Button from '../ui/Button';
import { Phone, Mail, MapPin, Radio, MessageSquare, ExternalLink, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  currentRoute: RouteState;
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Footer({ currentRoute, onChangeRoute }: FooterProps) {
  const handleLinkClick = (view: ActiveRoute, slug?: string) => {
    onChangeRoute(view, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-border-custom bg-surface mt-20 pt-16">
      {/* 1. Global Call-To-Action Banner (Renders above the actual link lists) */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="w-full bg-accent-lime text-black rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl relative overflow-hidden pointer-events-auto">
          {/* Visual Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <span className="font-sans text-xs font-bold tracking-widest uppercase bg-black/10 px-3 py-1 rounded-full mb-4 inline-block">
              ⚡ Limited Audits Available This Month
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-black leading-tight mt-1">
              READY TO BUILD A GROWTH ENGINE?
            </h3>
            <p className="font-sans font-light text-black/85 text-xs md:text-sm mt-3">
              Book a free 10-minute website review. No sales pitches, no obligation. Just honest feedback on speed, SEO, and conversion loopholes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
            <Button
              variant="outline"
              className="bg-black border-black text-white hover:bg-white hover:text-black hover:border-white font-display text-xs"
              onClick={() => handleLinkClick('book-audit')}
            >
              Book Free Audit →
            </Button>
            <a
              href="https://wa.me/8801603539126"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-display font-bold px-6 py-3 text-xs bg-transparent border border-black text-black hover:bg-black hover:text-white rounded-full transition-all duration-300 pointer-events-auto"
            >
              WhatsApp Us →
            </a>
          </div>
        </div>
      </div>

      {/* 2. Structured Link Columns & Info Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        {/* Core Description Column */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer pointer-events-auto group"
          >
            <div className="w-4 h-4 bg-accent-lime rounded-[3px] rotate-45 transition-transform duration-500 group-hover:rotate-[225deg]" />
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold text-white leading-none uppercase tracking-tight">
                XENISHIO
              </span>
              <span className="font-sans text-[8px] text-text-muted mt-0.5 tracking-widest uppercase">
                DIGITAL
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-text-muted mt-2 leading-relaxed">
            Building the web. One business at a time. We engineer high-speed revenue-generating websites and search-engine visibility frameworks.
          </p>
          <div className="flex gap-4 mt-2">
            {['LinkedIn', 'Instagram', 'Facebook'].map((soc) => (
              <a
                key={soc}
                href="https://github.com/xenishio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] uppercase text-text-muted hover:text-accent-lime tracking-widest transition-colors duration-200 flex items-center gap-1"
              >
                {soc} <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Services Dropdown Pages Shortcut Column */}
        <div>
          <h4 className="font-display text-xs font-extrabold uppercase text-text-main tracking-wider mb-6">
            CORE SERVICES
          </h4>
          <ul className="flex flex-col gap-3">
            {SERVICES.map((srv) => (
              <li key={srv.slug}>
                <button
                  onClick={() => handleLinkClick('service-detail', srv.slug)}
                  className="font-sans text-xs text-text-muted hover:text-accent-lime transition-all duration-200 text-left pointer-events-auto"
                >
                  ✦ {srv.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources / Company Navigation Column */}
        <div>
          <h4 className="font-display text-xs font-extrabold uppercase text-text-main tracking-wider mb-6">
            QUICK LINKS
          </h4>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Work portfolio', view: 'work' },
              { label: 'Agency pricing', view: 'pricing' },
              { label: 'Project calculator', view: 'calculator' },
              { label: 'Latest from blog', view: 'blog' },
              { label: 'About the agency', view: 'about' },
              { label: 'Get in touch', view: 'contact' },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleLinkClick(link.view as ActiveRoute)}
                  className="font-sans text-xs text-text-muted hover:text-accent-lime transition-colors duration-200 text-left pointer-events-auto"
                >
                  ✦ {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Founders Coordinates Column */}
        <div>
          <h4 className="font-display text-xs font-extrabold uppercase text-text-main tracking-wider mb-6">
            CONTACT INFO
          </h4>
          <ul className="flex flex-col gap-4 text-xs font-sans text-text-muted">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-accent-lime shrink-0 pointer-events-auto" />
              <a href="tel:+8801603539126" className="hover:text-accent-lime transition-colors duration-200">
                +880 1603-539126
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-accent-lime shrink-0 pointer-events-auto" />
              <a href="mailto:muradujjaman05@gmail.com" className="hover:text-accent-lime transition-colors duration-200 break-all">
                muradujjaman05@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent-lime shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-start gap-2.5 pt-2 border-t border-border-custom/50">
              <Radio className="w-4 h-4 text-brand-green animate-pulse shrink-0" />
              <span className="text-[10px] tracking-wider uppercase text-brand-green font-bold">
                Usually responds within 4 hours
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Bar Legal Row */}
      <div className="border-t border-border-custom/30 py-8 bg-bg/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-sans text-text-muted tracking-widest uppercase">
          <div>
            © {currentYear} XENISHIO DIGITAL · ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-6 pointer-events-auto">
            <button onClick={() => handleLinkClick('privacy-policy')} className="hover:text-accent-lime transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleLinkClick('terms-and-conditions')} className="hover:text-accent-lime transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleLinkClick('admin')} className="hover:text-accent-lime transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* 4. Sleek Monospace Operational Status Panel */}
      <div className="bg-[#000] border-t border-border-custom py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#52525b] tracking-wider uppercase select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] inline-block" />
          ALL SYSTEMS OPERATIONAL
        </div>
        <div className="flex gap-4 text-center md:text-right">
          <span>REGION: US-EAST-1</span>
          <span className="hidden sm:inline">//</span>
          <span>LATENCY: 14MS</span>
          <span className="hidden sm:inline">//</span>
          <span>REVISION: X-882</span>
        </div>
      </div>

      {/* Sticky Floating Cost Calculator Widget (Bottom Left corner) */}
      <motion.button
        onClick={() => handleLinkClick('calculator')}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 bg-accent-lime text-black p-4 rounded-full shadow-[0_4px_30px_rgba(233,175,49,0.3)] z-40 transition-shadow duration-300 hover:shadow-[0_4px_40px_rgba(233,175,49,0.5)] flex items-center justify-center cursor-pointer pointer-events-auto border border-black/10 group"
        id="calculator-floating-bubble"
        aria-label="Launch interactive Project Cost Calculator"
      >
        <Calculator className="w-6 h-6 transition-transform group-hover:rotate-12" />
        <span className="absolute left-16 bg-surface text-white text-[10px] font-mono tracking-wider border border-border-custom px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 uppercase pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap">
          Cost Estimator
        </span>
      </motion.button>

      {/* 4. Sticky Floating WhatsApp CTA Widget (Bottom Right corner) */}
      <motion.a
        href="https://wa.me/8801603539126"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-[#25d366] text-white p-4 rounded-full shadow-[0_4px_30px_rgba(37,211,102,0.4)] z-40 transition-shadow duration-300 hover:shadow-[0_4px_40px_rgba(37,211,102,0.6)] flex items-center justify-center cursor-pointer pointer-events-auto"
        id="whatsapp-floating-bubble"
        aria-label="Direct WhatsApp chat with Md Muradujjaman"
      >
        <MessageSquare className="w-6 h-6 fill-white stroke-[#25d366]" />
      </motion.a>
    </footer>
  );
}
