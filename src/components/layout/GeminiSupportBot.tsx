/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default function GeminiSupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Hello! I am **XenBot**, the AI lead specialist here at **Xenishio Digital**.\n\nAsk me anything about our high-performance **React/Next.js platforms**, pricing budgets, corporate **headless CMS integrations**, or let me help you book a **free 10-minute speed audit** with Md Muradujjaman!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userMsg } as ChatMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: updatedMessages
        }),
      });

      const data = await response.json();
      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', content: "I encountered a minor network latency interruption. Please submit your request again, or contact Muradujjaman directly at +880 1603-539126." }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: "My connection took longer than expected to respond. Don't worry! You can book a direct Zoom session with Md Muradujjaman here: [Schedule Live Session](https://calendar.app.google/N2XWGoRba433WRPs7)" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Safe markdown links and bold renderer helper
  const renderMessageContent = (text: string) => {
    // Escape or translate bold syntax **text** and [label](url)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;

    let parts = text.split('\n').map((line, i) => {
      // Parse links
      let renderedLine: React.ReactNode = line;
      
      // Simple parse for link & bold patterns
      if (boldRegex.test(line) || linkRegex.test(line)) {
        const words = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        renderedLine = words.map((w, idx) => {
          if (w.startsWith('**') && w.endsWith('**')) {
            return <strong key={idx} className="font-extrabold text-white text-xs">{w.slice(2, -2)}</strong>;
          }
          if (w.startsWith('[') && w.includes('](')) {
            const label = w.slice(1, w.indexOf(']'));
            const url = w.slice(w.indexOf('](') + 2, -1);
            return (
              <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-accent-lime underline hover:text-white transition-colors text-xs font-bold inline-flex items-center gap-1">
                {label} <ArrowRight className="w-3 h-3 inline mt-0.5" />
              </a>
            );
          }
          return w;
        });
      }
      return <p key={i} className="mb-2 last:mb-0 leading-relaxed text-xs">{renderedLine}</p>;
    });

    return <div className="space-y-1">{parts}</div>;
  };

  return (
    <div id="xenishio-ai-chatbot-wrapper" className="fixed bottom-24 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* 1. CHATBOX FLOATING WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="w-[340px] sm:w-[380px] h-[480px] rounded-3xl bg-surface/95 border border-border-custom shadow-[0_10px_50px_rgba(3,8,22,0.8)] overflow-hidden flex flex-col pointer-events-auto backdrop-blur-md mb-4"
          >
            {/* Header Banner */}
            <div className="bg-accent-blue/40 border-b border-border-custom p-4 flex items-center justify-between relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-lime via-accent-blue to-accent-lime"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center border border-accent-lime/20">
                  <Bot className="w-5 h-5 text-accent-lime" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider font-mono">Xenishio AI Agent</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                    <span className="text-[9px] text-brand-green font-mono uppercase tracking-widest font-black">Xenbot Active</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-white p-1 rounded-lg bg-bg border border-border-custom/50 hover:border-text-muted/30 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Thread History */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-bg/30 select-text"
            >
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs text-text-main border leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-accent-blue border-accent-lime/20 rounded-tr-none' 
                        : 'bg-surface/80 border-border-custom rounded-tl-none text-text-muted'
                    }`}
                  >
                    {renderMessageContent(msg.content)}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start animate-pulse">
                  <div className="max-w-[50%] rounded-2xl rounded-tl-none p-3.5 bg-surface/80 border border-border-custom text-text-muted">
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Suggesters */}
            <div className="px-4 py-2 border-t border-border-custom bg-surface/30 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button 
                onClick={() => setMessages(prev => [...prev, { role: 'user', content: 'What are your package pricing tiers?' }])}
                className="text-[10px] font-mono border border-border-custom bg-bg hover:border-accent-lime py-1 px-2.5 rounded-lg text-text-muted hover:text-white transition-all shrink-0"
              >
                📁 View Pricing
              </button>
              <button 
                onClick={() => setMessages(prev => [...prev, { role: 'user', content: 'Tell me about founder Md Muradujjaman' }])}
                className="text-[10px] font-mono border border-border-custom bg-bg hover:border-accent-lime py-1 px-2.5 rounded-lg text-text-muted hover:text-white transition-all shrink-0"
              >
                👤 Founder Credentials
              </button>
              <a 
                href="https://calendar.app.google/N2XWGoRba433WRPs7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono border border-brand-green/20 bg-[#22c55e]/10 hover:border-[#22c55e] py-1 px-2.5 rounded-lg text-brand-green flex items-center gap-1 transition-all shrink-0"
              >
                <Calendar className="w-3 h-3" /> Book Speed Audit
              </a>
            </div>

            {/* Chat Input Field Form */}
            <form onSubmit={handleSend} className="p-4 border-t border-border-custom bg-surface flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask XenBot dynamic query..."
                className="flex-1 bg-bg border border-border-custom rounded-xl py-2.5 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-lime placeholder:text-text-muted/60"
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-accent-blue hover:bg-accent-lime text-white hover:text-black hover:border-black p-2.5 rounded-xl border border-border-custom cursor-pointer transition-all disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHATBOT FLAGGED BUBBLE ACTION */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent-blue hover:bg-accent-lime text-accent-lime hover:text-black border border-accent-lime/35 hover:border-black p-4 rounded-full shadow-[0_4px_30px_rgba(15,41,115,0.4)] z-50 flex items-center justify-center cursor-pointer pointer-events-auto transition-all relative group"
        id="gemini-support-bot-floating-trigger"
        aria-label="Toggle Xenishio AI Interactive Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-accent-lime group-hover:text-black animate-pulse" />
        )}
        {!isOpen && (
          <span className="absolute right-16 bg-surface text-white text-[10px] font-mono tracking-wider border border-border-custom px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 uppercase pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap">
            Ask XenBot AI
          </span>
        )}
      </motion.button>

    </div>
  );
}
