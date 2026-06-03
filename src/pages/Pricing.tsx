/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveRoute } from '../types';
import { listDocuments } from '../lib/firebase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { HelpCircle, ChevronDown, ChevronUp, Calculator, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PricingProps {
  onChangeRoute: (view: ActiveRoute) => void;
}

export default function Pricing({ onChangeRoute }: PricingProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Schema baseline fallbacks mirroring static layouts
  const DEFAULT_PLANS = [
    {
      id: 'plan-starter',
      name: 'STARTER',
      price: '150',
      period: 'flat rate',
      description: 'Perfect for small services, localized announcements, or single product launches.',
      features: [
        'One-page landing site design',
        'Mobile responsive layout',
        'Technical SEO foundations',
        'Secure contact form setup',
        'GA4 analytic integration',
        'Delivered in 3–5 days',
        'WhatsApp direct developer support'
      ],
      highlighted: false,
      ctaText: 'Book Starter Project'
    },
    {
      id: 'plan-growth',
      name: 'GROWTH',
      price: '300',
      period: 'flat rate',
      description: 'The best option for growing B2B services, architects, consultants, and developers.',
      features: [
        'Up to 5 custom-coded pages',
        'Full on-page SEO schema optimization',
        'GA4 + Google Search Console hook',
        'Speed optimization (target Lighthouse A grade)',
        'Fluid animations (Framer Motion)',
        'Delivered in 7–10 days',
        '2 weeks post-launch warranty support'
      ],
      highlighted: true,
      ctaText: 'Book Growth Project'
    },
    {
      id: 'plan-premium',
      name: 'PREMIUM',
      price: '500',
      period: 'setup budget',
      description: 'For businesses requiring member logins, custom calculators, full-stack, or Shopify.',
      features: [
        'Custom scope & bespoke design architecture',
        'Everything in Growth, tailored to your layout',
        'CRM & newsletter webhook integrations',
        'Payment gateway secure checkouts',
        'E-commerce shopping cart options',
        'Postman/API third-party mapping',
        'Dedicated project lead timeline'
      ],
      highlighted: false,
      ctaText: 'Request Custom Scope'
    }
  ];

  const DEFAULT_FAQS = [
    {
      id: 'faq-1',
      question: 'Are there any hidden recurring fees?',
      answer: 'None from us! You only pay for your domain and standard hosting servers direct to provider (e.g. Hostinger, Cloudflare). All our development estimates are 100% flat and fully mapped before we start.'
    },
    {
      id: 'faq-2',
      question: 'Do I own the website after delivery?',
      answer: 'Completely. Once the final milestone is clear, you receive full administrator permissions, source repositories, and database archives to keep your data secure.'
    },
    {
      id: 'faq-3',
      question: 'How does the payment split work?',
      answer: 'We operate under a simple professional 50/50 model: 50% upfront to reserve your delivery slot, and the final 50% upon successful demonstration and delivery handover.'
    },
    {
      id: 'faq-4',
      question: 'Can we expand plans or add pages mid-way?',
      answer: 'Yes! We adjust timelines and budget parameters dynamically. Additional work is simply accounted for at our flat $30 per page rate or visual equivalent.'
    },
    {
      id: 'faq-5',
      question: 'What domain & hosting should I buy?',
      answer: 'We will suggest hosting fits based on scope (e.g. Vercel for NextJS apps, Hostinger for WordPress). We configure sitemaps and point name records directly for you.'
    },
    {
      id: 'faq-6',
      question: 'What if I need changes after launching?',
      answer: 'Every STARTER and GROWTH package includes direct post-launch support. For long-term security and adjustments, we suggest trying our Care Plans.'
    }
  ];

  const [pricingList, setPricingList] = useState<any[]>(DEFAULT_PLANS);
  const [faqsList, setFaqsList] = useState<any[]>(DEFAULT_FAQS);

  useEffect(() => {
    async function fetchPricingAndFaqs() {
      try {
        const livePricing = await listDocuments('pricing_tiers', DEFAULT_PLANS);
        const liveFaqs = await listDocuments('faqs', DEFAULT_FAQS);
        setPricingList(livePricing);
        setFaqsList(liveFaqs);
      } catch (err) {
        console.warn('Firebase pricing fetching offline fallback:', err);
      }
    }
    fetchPricingAndFaqs();
    window.addEventListener('xenishio-local-db-update', fetchPricingAndFaqs);
    return () => window.removeEventListener('xenishio-local-db-update', fetchPricingAndFaqs);
  }, []);

  const addOns = [
    { name: 'Monthly Care Plan', price: '$75–$100/mo', desc: 'Hour backups, malware firewalls, code package minor updates.' },
    { name: 'SEO Retainer Support', price: '$150–$250/mo', desc: 'Keyword tracking, crawl fixes, competitor review reports.' },
    { name: 'Speed Audit & Fix', price: '$99 one-time', desc: 'Speed up an existing legacy WordPress slow theme and code.' },
    { name: 'Extra Page Addition', price: '$30/page', desc: 'Expand your STARTER or GROWTH site with extra sections.' }
  ];

  return (
    <div className="relative w-full pt-32 pb-16">
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-accent-lime/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[32rem] h-[32rem] bg-accent-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Pricing Modules"
          title={<>Simple, Transparent <span className="font-serif italic text-accent-lime font-normal">Pricing</span></>}
          subtitle="Select a scope that matches your business objectives. Zero surprises, maximum speed outputs, secure data handovers."
        />

        {/* 1. Main Pricing Tiers Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-stretch">
          {pricingList.map((p, idx) => {
            const isHighlight = p.highlighted || p.popular;
            const priceVal = p.price && p.price.toString().startsWith('$') ? p.price : `$${p.price || '0'}`;
            const bullets = p.features || p.bullets || [];

            return (
              <ScrollReveal
                key={p.id || p.name || idx}
                delay={idx * 0.05}
                className={`bg-card rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative ${
                  isHighlight ? 'border-2 border-accent-lime shadow-2xl' : 'border border-border-custom'
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent-lime text-black font-display font-extrabold text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md z-10 select-none">
                    ⚡ Most Popular Selection
                  </div>
                )}

                <div>
                  <span className="font-sans text-xs text-text-muted tracking-widest uppercase block mb-1">
                    {p.name}
                  </span>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-4xl sm:text-5xl text-white">
                      {priceVal}
                    </span>
                    <span className="font-sans text-xs text-text-muted">
                      /{p.period || 'flat rate'}
                    </span>
                  </div>

                  <p className="font-sans text-[11px] text-accent-lime tracking-wide uppercase font-semibold mt-2">
                    {p.tagline || 'Optimized layout'}
                  </p>

                  <p className="font-sans text-xs text-text-muted mt-4 leading-relaxed font-light border-b border-border-custom pb-6 min-h-[70px]">
                    {p.description || p.desc}
                  </p>

                  {/* Checklist bullets layout */}
                  <ul className="flex flex-col gap-3.5 mt-6 border-none list-none text-left pl-0">
                    {bullets.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex gap-2.5 items-start">
                        <Check className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-text-main leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border-custom/50 pointer-events-auto">
                  <Button
                    variant={isHighlight ? 'primary' : 'outline'}
                    size="md"
                    onClick={() => onChangeRoute('contact')}
                    className="w-full text-xs font-bold uppercase"
                  >
                    {p.ctaText || p.ctaLabel || 'Request Service'}
                  </Button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 2. Interactive Calculator Callout Bar */}
        <div className="border border-border-custom bg-surface rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pointer-events-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-card border border-border-custom rounded-xl shrink-0">
              <Calculator className="w-6 h-6 text-accent-lime" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                Require customized layouts or specific metrics?
              </h4>
              <p className="font-sans text-xs text-text-muted leading-relaxed max-w-xl">
                Use our dynamic Cost Estimator to choose custom page counts, languages, blog options, and advanced speed optimization levels.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto text-xs uppercase"
            onClick={() => onChangeRoute('calculator')}
          >
            Open Cost Calculator →
          </Button>
        </div>

        {/* 3. Add-Ons Specifications Board */}
        <div className="mt-24">
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-8 text-center">
            ADDIDENTIAL SERVICES & RETAIHERS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addOns.map((add) => (
              <div
                key={add.name}
                className="bg-card border border-border-custom rounded-2xl p-6 flex justify-between items-start gap-4"
              >
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white tracking-wide">
                    {add.name}
                  </h4>
                  <p className="font-sans text-xs text-text-muted leading-relaxed mt-2.5 font-light">
                    {add.desc}
                  </p>
                </div>
                <Badge variant="lime" className="shrink-0 text-[10px]">
                  {add.price}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Pricing-Specific FAQs Panel */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent-lime" /> PRICING FREQUENTLY ASKED QUESTIONS
          </h3>
          
          <div className="flex flex-col gap-4">
            {faqsList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.id || idx}
                  className="bg-card border border-border-custom rounded-2xl overflow-hidden pointer-events-auto"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-display font-bold text-xs sm:text-sm text-white uppercase hover:text-accent-lime flex justify-between items-center bg-transparent"
                  >
                    <span>{item.question || item.q}</span>
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
                          {item.answer || item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
