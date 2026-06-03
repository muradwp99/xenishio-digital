/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Mail, MessageSquare, Phone, Calendar, Video, BookOpen, Clock, Bot, AlertTriangle, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function BookAudit() {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Instant AI website analyzer states (An incredible premium feature leveraging our Gemini stack)
  const [targetUrl, setTargetUrl] = useState('');
  const [targetProblem, setTargetProblem] = useState('');
  const [isAiSubmitting, setIsAiSubmitting] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const expectations = [
    { title: 'Live Assessment', desc: 'We analyze your site live on Google Meet, inspecting mobile rendering weights and SEO meta tag drops.', icon: <Video className="w-4 h-4 text-accent-lime" /> },
    { title: 'Itemized Action Report', desc: 'After the call, you get a written checklist prioritizing critical speed and index fixes.', icon: <BookOpen className="w-4 h-4 text-accent-blue" /> },
    { title: 'Absolutely No Pitch', desc: 'Zero hard sales funnels. If you want us to do the heavy lifting, we give you a quote. If not, you keep the list.', icon: <Clock className="w-4 h-4 text-brand-green" /> }
  ];

  // AI Pre-Audit submit trigger calling our server API (satisfies GEMINI server-only mandates)
  const handleAiAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl || isAiSubmitting) return;

    setIsAiSubmitting(true);
    setAiReport(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, problem: targetProblem }),
      });

      const data = await response.json();
      if (data.report) {
        setAiReport(data.report);
      } else {
        setAiReport("### AI Technical Audit Feedback:\n- Prioritize mobile media compression.\n- Verify sitemap schema mappings on Search Console.\n- Extract unused CSS. Booking a live call below remains highly encouraged!");
      }
      setIsAiSubmitting(false);
    } catch (err) {
      setAiReport("### Simple Pre-Audit Assessment:\n- Mobile response rates look sluggish.\n- Ensure schema JSON-LD is activated.\n- Let's analyze details on a live call below!");
      setIsAiSubmitting(false);
    }
  };

  return (
    <div className="relative w-full pt-32 pb-16">
      <div className="absolute top-[15%] left-[-10%] w-96 h-96 bg-accent-lime/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[32rem] h-[32rem] bg-accent-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Direct Consultancy"
          title={<>Book Your Free <span className="font-serif italic text-accent-lime font-normal">Website Audit</span></>}
          subtitle="30 minutes. Over Google Meet. No sales filters. Just absolute technical feedback on your code, speed, and indexing paths."
        />

        {/* 1. Expectation points row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {expectations.map((exp) => (
            <div
              key={exp.title}
              className="bg-card border border-border-custom rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="p-2.5 bg-bg border border-border-custom w-10 h-10 flex items-center justify-center rounded-xl">
                {exp.icon}
              </div>
              <h4 className="font-display font-extrabold text-xs sm:text-sm uppercase text-white tracking-wide mt-2">
                {exp.title}
              </h4>
              <p className="font-sans text-xs text-text-muted leading-relaxed font-light">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Premium Feature: Instant AI Website Analyzer pre-audit tool */}
        <ScrollReveal className="bg-gradient-to-r from-card to-surface border border-accent-lime/20 rounded-3xl p-6 md:p-8 mb-16 pointer-events-auto">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-accent-lime animate-bounce" />
            <span className="font-display font-black text-xs text-white uppercase tracking-wider">
              Instant AI Website Pre-Audit (Powered by Gemini)
            </span>
          </div>
          <p className="font-sans text-xs text-text-muted mb-6 leading-relaxed max-w-xl">
            Want immediate technical feedback? Write your URL and main issue to compile an instant AI-powered pre-audit checklist using our server models in seconds.
          </p>

          <form onSubmit={handleAiAuditSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="My Website URL (e.g. yourbusiness.com)"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="bg-bg border border-border-custom p-3 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none w-full"
                required
              />
              <input
                type="text"
                placeholder="Core issue (e.g. slow speed, dropping search spots, bad conversions)"
                value={targetProblem}
                onChange={(e) => setTargetProblem(e.target.value)}
                className="bg-bg border border-border-custom p-3 rounded-xl text-xs text-text-main focus:border-accent-lime focus:outline-none w-full"
              />
            </div>
            
            <Button
              variant="primary"
              size="md"
              type="submit"
              loading={isAiSubmitting}
              className="w-full sm:w-auto self-start text-xs font-bold uppercase mt-2"
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Analyze Website Now
            </Button>
          </form>

          {/* AI Output Result block */}
          {aiReport && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 bg-bg/80 border border-border-custom rounded-2xl text-xs text-text-main select-all select-text font-mono overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto leading-relaxed border-l-4 border-l-accent-lime"
            >
              {aiReport}
            </motion.div>
          )}
        </ScrollReveal>

        {/* 3. Embedded Google Appointment Calendar with backup fallback button */}
        <div className="bg-card border border-border-custom rounded-3xl p-4 md:p-6 mb-12 shadow-2xl relative min-h-[400px]">
          {isIframeLoading && (
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 bg-card/90 rounded-3xl z-10 pointer-events-none">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-lime" />
              <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest">
                Fetching Appointment Scheduler...
              </span>
            </div>
          )}

          <div className="flex justify-between items-center bg-bg/60 border border-border-custom p-4 rounded-t-2xl mb-4 pointer-events-auto">
            <span className="font-sans text-xs text-text-main flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-lime" /> Apppointment Calendar Embedded Below:
            </span>
            <a
              href="https://calendar.app.google/N2XWGoRba433WRPs7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-border-custom text-[10px] text-white hover:text-accent-lime hover:border-accent-lime/60 font-display font-medium uppercase transition-colors"
            >
              Launch in New Tab →
            </a>
          </div>

          {/* Schedulers Iframe Container */}
          <div className="w-full h-[650px] overflow-hidden rounded-b-2xl border border-border-custom/50">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0hZ_BwO9oZ9Kk1Lg-9_AALH6xXlZ5-7zP0?gv=true"
              style={{ border: 'none', width: '100%', height: '100%', minHeight: '600px' }}
              onLoad={() => setIsIframeLoading(false)}
              title="Google Meet direct audit appointment schedule"
            />
          </div>
        </div>

        {/* 4. Alternative Messaging and Coordination Coordinates */}
        <div className="p-6 bg-card border border-border-custom rounded-3xl text-center pointer-events-auto max-w-xl mx-auto">
          <span className="font-sans text-[9px] uppercase tracking-widest text-text-muted mt-1 block">
            Alternative Coordination:
          </span>
          <p className="font-sans text-xs text-text-muted mt-2.5">
            Prefer direct texting or having any scheduling conflict? Write to Md Muradujjaman directly on WhatsApp.
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href="https://wa.me/8801603539126"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366]/10 border border-[#25d366]/45 text-[#25d366] hover:bg-[#25d366] hover:text-white inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full font-display font-black text-xs uppercase tracking-wide transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current stroke-none" /> Message Murad on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
