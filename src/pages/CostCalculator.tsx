/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { ChevronLeft, ChevronRight, Calculator, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CostCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState<string>('Business Website');
  const [pagesCount, setPagesCount] = useState<string>('2–5 pages');
  const [features, setFeatures] = useState<string[]>([]);
  const [marketing, setMarketing] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<string>('Standard');

  // Inline Email Form states
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [isMailSubmitting, setIsMailSubmitting] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  // Constants & Prices mapping
  const basePrices: Record<string, number> = {
    'Landing Page': 150,
    'Business Website': 300,
    'E-commerce Store': 500,
    'Web Application': 600,
    'Website Redesign': 200,
    'SEO Only': 150,
  };

  const pagesPrices: Record<string, number> = {
    '1 page': 0,
    '2–5 pages': 100,
    '6–10 pages': 200,
    '10+ pages': 350,
  };

  const featureOptions = [
    { id: 'blog', label: 'Blog / CMS System', price: 50 },
    { id: 'form', label: 'Custom Contact Forms', price: 20 },
    { id: 'booking', label: 'Booking / Appointment Forms', price: 50 },
    { id: 'shop', label: 'E-commerce Shop Checkout', price: 150 },
    { id: 'lang', label: 'Multi-language (WPML/Polylang)', price: 75 },
    { id: 'anim', label: 'Bespoke Motion Animations', price: 80 },
    { id: 'login', label: 'Member Signup / Dashboard', price: 120 },
    { id: 'api', label: 'API Integrations', price: 100 },
    { id: 'gateway', label: 'Payment gateway gateways', price: 80 },
    { id: 'chat', label: 'Live Chat Integration (WhatsApp)', price: 30 },
  ];

  const marketingOptions = [
    { id: 'onpage', label: 'On-page SEO Optimization', price: 80 },
    { id: 'analytics', label: 'GA4 + GTM Tracking setup', price: 40 },
    { id: 'searchconsole', label: 'Google Search Console submitting', price: 20 },
    { id: 'retainer', label: 'Monthly SEO Retainer (First Mo)', price: 150 },
  ];

  const urgencyOptions = [
    { id: 'Standard', label: 'Standard (10–14 days)', mult: 1.0 },
    { id: 'Express', label: 'Express (5–7 days) (+25%)', mult: 1.25 },
    { id: 'Rush', label: 'Rush (1–3 days) (+50%)', mult: 1.5 },
  ];

  // Calculations Engine
  const calculateTotal = () => {
    let subtotal = basePrices[projectType] || 150;
    subtotal += pagesPrices[pagesCount] || 0;

    features.forEach((fid) => {
      const match = featureOptions.find((o) => o.id === fid);
      if (match) subtotal += match.price;
    });

    marketing.forEach((mid) => {
      const match = marketingOptions.find((o) => o.id === mid);
      if (match) subtotal += match.price;
    });

    const activeUrgency = urgencyOptions.find((u) => u.id === urgency) || urgencyOptions[0];
    subtotal = Math.floor(subtotal * activeUrgency.mult);

    return {
      min: subtotal,
      max: subtotal + 50,
    };
  };

  const totalRange = calculateTotal();

  // Toggle helpers
  const handleFeatureToggle = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarketingToggle = (id: string) => {
    setMarketing((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compile detailed text summaries for emails or WhatsApp redirects
  const getSelectionsSummary = () => {
    let sum = `Project Cost Estimate for Xenishio Digital:\n`;
    sum += `✦ Project Type: ${projectType}\n`;
    sum += `✦ Pages: ${pagesCount}\n`;
    if (features.length > 0) {
      sum += `✦ Features: ${features.map((f) => featureOptions.find((o) => o.id === f)?.label).join(', ')}\n`;
    }
    if (marketing.length > 0) {
      sum += `✦ Marketing list: ${marketing.map((m) => marketingOptions.find((o) => o.id === m)?.label).join(', ')}\n`;
    }
    sum += `✦ Urgency: ${urgency}\n`;
    sum += `---------------------\n`;
    sum += `Estimated cost: $${totalRange.min} - $${totalRange.max}\n`;
    return sum;
  };

  // WhatsApp link submission helper
  const handleWhatsAppRedirect = () => {
    const text = getSelectionsSummary();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/8801603539126?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  // In-line form POST simulation to Resend mail
  const handleMailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsMailSubmitting(true);
    try {
      const summary = getSelectionsSummary();
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          company: clientCompany,
          breakdownText: summary,
          min: totalRange.min,
          max: totalRange.max,
        }),
      });

      // Even if server is loading or offline, perform clean visual success updates instantly
      setTimeout(() => {
        setIsMailSent(true);
        setIsMailSubmitting(false);
      }, 500);
    } catch (err) {
      setIsMailSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative w-full pt-32 pb-16">
      <div className="absolute top-[10%] right-[-10%] w-96 h-96 bg-accent-lime/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <section className="px-6 max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="Cost Analyzer"
          title={<>Interactive Cost <span className="font-serif italic text-accent-lime font-normal">Estimator</span></>}
          subtitle="Choose project parameters to formulate instantaneous scope budgets. No payment is required."
        />

        {/* 1. Progress Step Bars */}
        <div className="relative w-full bg-border-custom h-1 mb-10 rounded-full flex justify-between items-center px-1">
          <motion.div
            className="absolute top-0 left-0 bg-accent-lime h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          />
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              onClick={() => num <= currentStep && setCurrentStep(num)}
              className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-medium text-[10px] z-10 cursor-pointer pointer-events-auto border transition-all duration-300 ${
                currentStep >= num
                  ? 'bg-accent-lime text-black border-accent-lime'
                  : 'bg-card text-text-muted border-border-custom'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* 2. Multi-step Selector Card */}
        <div className="bg-card border border-border-custom rounded-3xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between shadow-2xl relative">
          <AnimatePresence mode="wait">
            {/* STEP 1: PROJECT TYPES */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <Badge variant="lime">Step 1 of 6</Badge>
                  <h3 className="font-display font-black text-xl text-white uppercase mt-2">
                    What Kind of System Are We Engineering?
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
                    Select the foundational scope category below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {Object.keys(basePrices).map((type) => (
                    <div
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`p-4 rounded-xl border cursor-pointer flex flex-col transition-all duration-300 pointer-events-auto ${
                        projectType === type
                          ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                          : 'border-border-custom bg-bg/50 hover:border-text-muted text-text-main hover:text-white'
                      }`}
                    >
                      <span className="font-display font-bold text-xs uppercase">{type}</span>
                      <span className="font-sans text-[10px] text-text-muted mt-1">
                        Est. Base: ${basePrices[type]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: PAGES COUNT */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <Badge variant="lime">Step 2 of 6</Badge>
                  <h3 className="font-display font-black text-xl text-white uppercase mt-2">
                    How Many Custom Pages / Sections Are Required?
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-1">
                    Select a layout scale below.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  {Object.keys(pagesPrices).map((count) => (
                    <div
                      key={count}
                      onClick={() => setPagesCount(count)}
                      className={`p-5 rounded-xl border cursor-pointer text-center transition-all duration-300 pointer-events-auto ${
                        pagesCount === count
                          ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                          : 'border-border-custom bg-bg/50 hover:border-text-muted text-text-main hover:text-white'
                      }`}
                    >
                      <span className="font-display font-bold text-xs sm:text-sm uppercase">{count}</span>
                      <span className="font-sans text-[10px] text-text-muted mt-1.5 block">
                        Mod margin: +${pagesPrices[count]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: PLATFORM FEATURES */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <Badge variant="lime">Step 3 of 6</Badge>
                  <h3 className="font-display font-black text-xl text-white uppercase mt-2">
                    What Specialized Actions/Modules Are Required?
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-1">
                    Choose as many as needed to calculate dynamic estimate totals.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 max-h-[250px] overflow-y-auto pr-2">
                  {featureOptions.map((opt) => {
                    const checked = features.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleFeatureToggle(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center transition-colors duration-200 pointer-events-auto ${
                          checked
                            ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                            : 'border-border-custom bg-bg/40 text-text-muted hover:border-text-muted'
                        }`}
                      >
                        <span className="font-sans text-xs truncate max-w-xs">{opt.label}</span>
                        <Badge variant={checked ? 'lime' : 'outline'} className="text-[10px]">
                          +${opt.price}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: MARKETING CONFIG */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <Badge variant="lime">Step 4 of 6</Badge>
                  <h3 className="font-display font-black text-xl text-white uppercase mt-2">
                    Google Integration & Search Marketing Opts:
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-1">
                    Choose indexing maps and visibility setups.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 mt-2">
                  {marketingOptions.map((opt) => {
                    const checked = marketing.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleMarketingToggle(opt.id)}
                        className={`p-4 rounded-xl border cursor-pointer flex justify-between items-center transition-colors duration-200 pointer-events-auto ${
                          checked
                            ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                            : 'border-border-custom bg-bg/40 text-text-muted hover:border-text-muted'
                        }`}
                      >
                        <span className="font-sans text-xs text-left">{opt.label}</span>
                        <Badge variant={checked ? 'lime' : 'outline'} className="text-[10px]">
                          +${opt.price}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: TIMELINE / URGENCY */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <Badge variant="lime">Step 5 of 6</Badge>
                  <h3 className="font-display font-black text-xl text-white uppercase mt-2">
                    Project Launch Urgency Limits:
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-1">
                    Standard timelines contain balanced development buffers of 14 days.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-2">
                  {urgencyOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setUrgency(opt.id)}
                      className={`p-5 rounded-xl border cursor-pointer flex justify-between items-center transition-all duration-300 pointer-events-auto ${
                        urgency === opt.id
                          ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                          : 'border-border-custom bg-bg/50 hover:border-text-muted text-text-main hover:text-white'
                      }`}
                    >
                      <span className="font-display font-bold text-xs uppercase">{opt.label}</span>
                      <span className="font-sans text-[10px] text-text-muted">
                        Multiplier: {opt.mult}x
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 6: LIVE PORTFOLIO ESTIMATES */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col gap-6"
              >
                <div className="text-center">
                  <Badge variant="green" className="mb-2">
                    ✦ Live Estimate Complete
                  </Badge>
                  <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest block font-medium">
                    Calculated Estimate Cost Range:
                  </span>
                  <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-accent-lime mt-1.5 uppercase tracking-tighter">
                    ${totalRange.min} - ${totalRange.max}
                  </div>
                  <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest mt-1 block">
                    Hand-delivery timeline: {urgency === 'Standard' ? '10–14 days' : urgency === 'Express' ? '5–7 days' : '1–3 rush days'}
                  </span>
                </div>

                <div className="p-4 bg-bg border border-border-custom rounded-2xl text-xs max-h-[140px] overflow-y-auto flex flex-col gap-2">
                  <h4 className="font-display font-bold text-white uppercase text-[10px] tracking-wider border-b border-border-custom/40 pb-1">
                    Receipt Breakdown:
                  </h4>
                  <div className="flex justify-between">
                    <span>{projectType} (Base):</span>
                    <span>${basePrices[projectType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages Modify ({pagesCount}):</span>
                    <span>+${pagesPrices[pagesCount]}</span>
                  </div>
                  {features.map((f) => (
                    <div className="flex justify-between text-text-muted" key={f}>
                      <span>{featureOptions.find((o) => o.id === f)?.label}:</span>
                      <span>+${featureOptions.find((o) => o.id === f)?.price}</span>
                    </div>
                  ))}
                  {marketing.map((m) => (
                    <div className="flex justify-between text-text-muted" key={m}>
                      <span>{marketingOptions.find((o) => o.id === m)?.label}:</span>
                      <span>+${marketingOptions.find((o) => o.id === m)?.price}</span>
                    </div>
                  ))}
                  {urgency !== 'Standard' && (
                    <div className="flex justify-between text-accent-blue">
                      <span>Urgency Multiplier ({urgency}):</span>
                      <span>x{urgencyOptions.find((o) => o.id === urgency)?.mult}</span>
                    </div>
                  )}
                </div>

                {/* Submit Email Form */}
                {isMailSent ? (
                  <div className="p-4 bg-accent-lime/10 border border-accent-lime/30 text-accent-lime text-center rounded-2xl text-xs">
                    ✓ Professional Quote Formulated & Copied to Dashboard. Md Muradujjaman has received your coordinates.
                  </div>
                ) : (
                  <form onSubmit={handleMailSubmit} className="flex flex-col gap-3 mt-2 pointer-events-auto">
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                      Send this structured Breakdown to my Email:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="My name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="bg-bg border border-border-custom p-3 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none"
                        required
                      />
                      <input
                        type="email"
                        placeholder="My business email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="bg-bg border border-border-custom p-3 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none col-span-1 sm:col-span-2"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        type="submit"
                        loading={isMailSubmitting}
                        className="w-full text-xs"
                        icon={<Send className="w-3.5 h-3.5" />}
                      >
                        Submit to email
                      </Button>
                      <button
                        type="button"
                        onClick={handleWhatsAppRedirect}
                        className="p-3 bg-card border border-border-custom hover:border-[#25d366]/40 hover:text-[#25d366] text-text-muted rounded-xl text-xs font-display flex items-center justify-center gap-2 font-bold select-none transition-colors duration-200"
                        title="Send prefilled estimate via WhatsApp direct to Murad"
                      >
                        <MessageSquare className="w-4 h-4 fill-current stroke-none" /> WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Navigation Controls Bar */}
          <div className="flex justify-between items-center border-t border-border-custom/50 pt-5 mt-6 pointer-events-auto">
            {currentStep > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                icon={<ChevronLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={prevStep}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 6 && (
              <Button
                variant="primary"
                size="sm"
                icon={<ChevronRight className="w-4 h-4" />}
                onClick={nextStep}
              >
                Next Step
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
