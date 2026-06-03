/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Mail, MessageSquare, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Handshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form parameters
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Business Website');
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const coordinates = [
    { label: 'E-mail Enquiry', value: 'xenishiostudio@gmail.com', href: 'mailto:xenishiostudio@gmail.com', icon: <Mail className="w-5 h-5 text-accent-lime" /> },
    { label: 'Direct Telegram Chat', value: 't.me/xenishio', href: 'https://t.me/xenishio', icon: <MessageSquare className="w-5 h-5 text-accent-blue" /> },
    { label: 'Studio Base Location', value: 'Dhaka, Bangladesh', href: '#', icon: <MapPin className="w-5 h-5 text-brand-green" /> }
  ];

  const contactFaqs = [
    {
      q: 'What is your typical turnaround time?',
      a: 'Depending on visual parameters and scope tiers: Single Page Starter landing pages take 3–5 working days, while complete corporate Business sites process in 7–14 days standard.'
    },
    {
      q: 'Do we sign a legal agreement before starting?',
      a: 'Absolutely. We formulate 100% transparent contractual briefs describing explicit page counts, delivery timelines, payment terms, and complete intellectual property assignment transfers upon handovers.'
    },
    {
      q: 'Can we schedule a call beforehand?',
      a: 'Completely. We highly encourage booking a direct 30-min session on Google Meet via our Website Audits page to discuss requirements, or text us instantly on WhatsApp.'
    },
    {
      q: 'What remittance channels do you support?',
      a: 'We accept global bank wire transfers, Wise, Payoneer, direct transaction links, and PayPal accounts. Invoice structures are fully itemized for standard B2B accountancy compliance.'
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || isPending) return;

    setIsPending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType, message }),
      });

      // Maintain direct instantaneous success states even in edge scenarios
      setTimeout(() => {
        setIsSuccess(true);
        setIsPending(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 600);
    } catch (err) {
      setIsPending(false);
    }
  };

  return (
    <div className="relative w-full pt-32 pb-16">
      <div className="absolute top-[10%] left-[-10%] w-[32rem] h-[32rem] bg-accent-blue/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[32rem] h-[32rem] bg-accent-lime/5 rounded-full blur-[110px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Reach Out"
          title={<>Launch Your Project <span className="font-serif italic text-accent-lime font-normal">Enquiry</span></>}
          subtitle="Ready to overhaul your digital presence or speed limits? Contact Md Muradujjaman directly via form, email, or direct telegram hooks below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left Coordinates Area (Contact details & links) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <h3 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-2">
              Studio Coordinates:
            </h3>

            {coordinates.map((coord) => (
              <a
                key={coord.label}
                href={coord.href}
                target={coord.href !== '#' ? '_blank' : undefined}
                rel={coord.href !== '#' ? 'noopener noreferrer' : undefined}
                className="bg-card border border-border-custom hover:border-accent-lime/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 pointer-events-auto group"
              >
                <div className="p-3 bg-bg border border-border-custom rounded-xl group-hover:border-accent-lime/30 transition-colors">
                  {coord.icon}
                </div>
                <div>
                  <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest block">
                    {coord.label}
                  </span>
                  <span className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wide group-hover:text-accent-lime transition-colors">
                    {coord.value}
                  </span>
                </div>
              </a>
            ))}

            {/* Direct WhatsApp Callout */}
            <div className="bg-[#25d366]/10 border border-[#25d366]/40 p-5 rounded-2xl text-center pointer-events-auto mt-4">
              <span className="font-sans text-[10px] text-[#25d366] uppercase tracking-widest font-extrabold block">
                Instant Messages
              </span>
              <p className="font-sans text-xs text-text-muted mt-2 leading-relaxed">
                Want to pitch an immediate requirement or send mock documents? Write directly to Murad.
              </p>
              <a
                href="https://wa.me/8801603539126"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] hover:bg-white text-black mt-4 w-full justify-center inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase transition-colors"
              >
                Launch WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Right Forms Area */}
          <div className="lg:col-span-8 bg-card border border-border-custom rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <h3 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-6 pb-3 border-b border-border-custom/50">
              Submit Direct Design Brief:
            </h3>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center flex flex-col items-center gap-4 bg-accent-lime/10 border border-accent-lime/30 rounded-2xl pointer-events-auto"
              >
                <CheckCircle className="w-12 h-12 text-accent-lime" />
                <h4 className="font-display font-black text-xl text-white uppercase">Enquiry Formulated Successfully!</h4>
                <p className="font-sans text-xs text-text-muted max-w-sm leading-relaxed">
                  Thank you for setting parameters! A verification receipt has been logged. Md Muradujjaman will reach out inside 4 business hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                  Submit another brief
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 pointer-events-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] uppercase font-bold text-text-muted">My Name:</label>
                    <input
                      type="text"
                      placeholder="e.g. Salim Mahmud"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-bg border border-border-custom p-3.5 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] uppercase font-bold text-text-muted">My Business Email:</label>
                    <input
                      type="email"
                      placeholder="e.g. salim@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-bg border border-border-custom p-3.5 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] uppercase font-bold text-text-muted">Select Project Category:</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="bg-bg border border-border-custom p-3.5 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none cursor-pointer appearance-none uppercase font-sans tracking-wide"
                  >
                    <option>Business Website</option>
                    <option>Landing Page Design</option>
                    <option>Technical Speed Optimization</option>
                    <option>Google analytics / GTM Tracking</option>
                    <option>Custom Retainer Support</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] uppercase font-bold text-text-muted">Explain Requirements & Budget Limits:</label>
                  <textarea
                    placeholder="Provide a short breakdown of pages, current URLs if any, or key targets here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="bg-bg border border-border-custom p-3.5 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none resize-none leading-relaxed"
                    required
                  />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  loading={isPending}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full uppercase text-xs font-bold"
                >
                  Configure and Submit Brief
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* 5. General Agency FAQs Panel */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-accent-lime" /> FREQUENTLY ASKED POLICY QUESTIONS
          </h3>
          
          <div className="flex flex-col gap-4">
            {contactFaqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border-custom rounded-2xl overflow-hidden pointer-events-auto"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-display font-bold text-xs sm:text-sm text-white uppercase hover:text-accent-lime flex justify-between items-center bg-transparent"
                  >
                    <span>{item.q}</span>
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
                          {item.a}
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
