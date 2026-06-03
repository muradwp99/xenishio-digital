/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RouteState, ActiveRoute } from './types';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import CostCalculator from './pages/CostCalculator';
import BookAudit from './pages/BookAudit';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Admin from './pages/Admin';
import GeminiSupportBot from './components/layout/GeminiSupportBot';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [route, setRoute] = useState<RouteState>({ view: 'home' });

  const handleRouteChange = (view: ActiveRoute, slug?: string) => {
    setRoute({ view, slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    switch (route.view) {
      case 'home':
        return <Home onChangeRoute={handleRouteChange} />;
      case 'about':
        return <About onChangeRoute={handleRouteChange} />;
      case 'services':
      case 'service-detail':
        return <Services currentRoute={route} onChangeRoute={handleRouteChange} />;
      case 'work':
        return <Work onChangeRoute={handleRouteChange} />;
      case 'case-study-detail':
        return <CaseStudies currentRoute={route} onChangeRoute={handleRouteChange} />;
      case 'pricing':
        return <Pricing onChangeRoute={handleRouteChange} />;
      case 'calculator':
        return <CostCalculator />;
      case 'book-audit':
        return <BookAudit />;
      case 'blog':
      case 'blog-detail':
        return <Blog currentRoute={route} onChangeRoute={handleRouteChange} />;
      case 'contact':
        return <Contact />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-and-conditions':
        return <TermsAndConditions />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onChangeRoute={handleRouteChange} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-main font-sans selection:bg-accent-lime/30 selection:text-white overflow-x-hidden">
      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* Sticky Top Header */}
      <Navbar currentRoute={route} onChangeRoute={handleRouteChange} />

      {/* Primary Transition Board */}
      <main className="w-full relative z-10 min-h-[85vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={route.view + (route.slug || '')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer currentRoute={route} onChangeRoute={handleRouteChange} />

      {/* Trained Gemini Support AI Robot Assistant */}
      <GeminiSupportBot />
    </div>
  );
}
