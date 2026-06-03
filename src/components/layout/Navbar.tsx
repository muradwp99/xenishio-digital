/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { RouteState, ActiveRoute } from '../../types';
import { SERVICES } from '../../data';
import Button from '../ui/Button';
import { Menu, X, ChevronDown, Sparkles, Linkedin, Facebook, Instagram, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentRoute: RouteState;
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Navbar({ currentRoute, onChangeRoute }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Monitor scrolling to triggers blur aesthetics on header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: ActiveRoute; hasDropdown?: boolean }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Services', view: 'services', hasDropdown: true },
    { label: 'Work', view: 'work' },
    { label: 'Pricing', view: 'pricing' },
    { label: 'Blog', view: 'blog' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (view: ActiveRoute, slug?: string) => {
    onChangeRoute(view, slug);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/92 backdrop-blur-xl border-b border-border-custom'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3.5 cursor-pointer pointer-events-auto group"
        >
          <div className="w-5 h-5 bg-accent-lime rounded-[4px] rotate-45 transition-transform duration-500 group-hover:rotate-[225deg] shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold text-white leading-none uppercase tracking-tight">
              XENISHIO
            </span>
            <span className="font-sans text-[9px] text-text-muted mt-0.5 tracking-widest uppercase">
              DIGITAL
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive =
              currentRoute.view === link.view ||
              (link.view === 'services' && currentRoute.view === 'service-detail');

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleLinkClick('services')}
                    className={`flex items-center gap-1.5 font-sans text-xs tracking-wider uppercase font-medium transition-colors duration-300 pb-1 ${
                      isActive ? 'text-accent-lime' : 'text-text-main hover:text-accent-lime'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isServicesDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isServicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-80 bg-card border border-border-custom rounded-2xl p-4 shadow-2xl z-50 grid grid-cols-1 gap-2"
                      >
                        {SERVICES.map((srv) => (
                          <div
                            key={srv.slug}
                            onClick={() => handleLinkClick('service-detail', srv.slug)}
                            className="p-3 rounded-xl hover:bg-white/5 cursor-pointer flex flex-col group/item transition-colors duration-200"
                          >
                            <span className="font-display font-bold text-xs text-text-main group-hover/item:text-accent-lime uppercase tracking-wide">
                              {srv.title}
                            </span>
                            <span className="font-sans text-[10px] text-text-muted mt-0.5 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                              {srv.tagline}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.view)}
                className={`relative font-sans text-xs tracking-wider uppercase font-medium transition-colors duration-300 ${
                  isActive ? 'text-accent-lime' : 'text-text-main hover:text-accent-lime'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-lime"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Primary Header CTA Trigger & Social links */}
        <div className="hidden lg:flex items-center gap-6 pointer-events-auto">
          <div className="flex items-center gap-3.5 border-r border-border-custom pr-5">
            <a
              href="https://linkedin.com/company/xenishio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/xenishio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="p-2 rounded-lg bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/xenishio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2 rounded-lg bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/8801603539126"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Chat"
              className="p-2 rounded-lg bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => handleLinkClick('book-audit')}
          >
            Get Free Audit
          </Button>
        </div>

        {/* Mobile Menu Toggle button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-text-main hover:text-accent-lime p-2 transition-colors duration-200 pointer-events-auto"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 bg-bg z-40 flex flex-col p-6 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-6 my-auto pointer-events-auto">
              {navLinks.map((link, index) => {
                const isActive =
                  currentRoute.view === link.view ||
                  (link.view === 'services' && currentRoute.view === 'service-detail');

                return (
                  <div key={link.label} className="border-b border-white/5 pb-4">
                    <button
                      onClick={() => handleLinkClick(link.view)}
                      className="font-display font-extrabold text-2xl uppercase text-left w-full tracking-tight text-white hover:text-accent-lime flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-sans font-normal text-text-muted">
                        0{index + 1}
                      </span>
                    </button>

                    {/* If Services, show rapid bullet sub-links */}
                    {link.hasDropdown && (
                      <div className="mt-3 pl-4 flex flex-col gap-2 border-l border-border-custom">
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.slug}
                            onClick={() => handleLinkClick('service-detail', srv.slug)}
                            className="font-sans text-xs uppercase hover:text-accent-lime tracking-wider text-left text-text-muted py-1"
                          >
                            ✦ {srv.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="mt-8 flex flex-col gap-6 pointer-events-auto items-center">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => handleLinkClick('book-audit')}
              >
                Get Free Audit →
              </Button>

              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://linkedin.com/company/xenishio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/xenishio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 rounded-xl bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/xenishio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 rounded-xl bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/8801603539126"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-3 rounded-xl bg-surface hover:bg-accent-lime text-text-muted hover:text-black border border-border-custom hover:border-black transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
