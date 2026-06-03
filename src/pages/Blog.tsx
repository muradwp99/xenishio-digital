/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RouteState, ActiveRoute } from '../types';
import { BLOG_POSTS } from '../data';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import ScrollReveal from '../components/ui/ScrollReveal';
import { Mail, Calendar, Clock, ArrowLeft, ArrowRight, Share2, Linkedin, Facebook, Link, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface BlogProps {
  currentRoute: RouteState;
  onChangeRoute: (view: ActiveRoute, slug?: string) => void;
}

export default function Blog({ currentRoute, onChangeRoute }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shareFeedback, setShareFeedback] = useState(false);

  const isDetailView = currentRoute.view === 'blog-detail' && currentRoute.slug;
  const currentPost = isDetailView
    ? BLOG_POSTS.find((p) => p.slug === currentRoute.slug)
    : null;

  // Grab categories list dynamically
  const categoriesList = ['All', 'SEO', 'Web Development', 'Technology', 'Case Study'];

  // Filter listings
  const filteredPosts = BLOG_POSTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.categories.includes(selectedCategory);
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  const handleLinkClick = (view: ActiveRoute, slug?: string) => {
    onChangeRoute(view, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clipboard copy helper for article shares
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  // ────────────────────────────────────────────────────────
  // INDIVIDUAL POST DETAIL READER
  // ────────────────────────────────────────────────────────
  if (isDetailView && currentPost) {
    // Find related items containing overlapping categories
    const relatedPosts = BLOG_POSTS.filter(
      (p) => p.slug !== currentPost.slug && p.categories.some((c) => currentPost.categories.includes(c))
    ).slice(0, 3);

    return (
      <article className="relative w-full pt-32 pb-16">
        <div className="absolute top-[12%] right-[-5%] w-80 h-80 bg-accent-lime/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-5%] w-80 h-80 bg-accent-blue/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6">
          {/* Top back bar navigation */}
          <div className="mb-10 pointer-events-auto">
            <button
              onClick={() => handleLinkClick('blog')}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase text-text-muted hover:text-accent-lime tracking-widest transition-colors duration-200"
            >
              ← Back to All Insights
            </button>
          </div>

          {/* Heading parameters box */}
          <div className="pb-8 border-b border-border-custom mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPost.categories.map((c) => (
                <Badge key={c} variant="lime">
                  {c}
                </Badge>
              ))}
            </div>

            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight tracking-tight">
              {currentPost.title}
            </h1>

            <div className="flex items-center gap-6 mt-6 font-sans text-[11px] text-text-muted tracking-wide uppercase">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Calendar className="w-4 h-4 text-accent-lime" /> Published: {currentPost.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-blue" /> Reading Time: {currentPost.readTime} mins
              </span>
            </div>
          </div>

          {/* Article main text body */}
          <div 
            className="prose prose-invert prose-lime min-w-full font-sans text-xs sm:text-sm text-text-main leading-relaxed space-y-6 select-all select-text blog-viewer-box"
            dangerouslySetInnerHTML={{ __html: currentPost.body }}
          />

          {/* Share widgets bar */}
          <div className="mt-12 pt-8 border-t border-border-custom flex flex-row items-center justify-between gap-4 flex-wrap pointer-events-auto">
            <span className="font-sans text-[10px] text-text-muted tracking-widest uppercase flex items-center gap-2">
              <Share2 className="w-4 h-4 text-accent-lime" /> Share this Article:
            </span>
            <div className="flex gap-2">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-card hover:bg-white/5 border border-border-custom hover:border-accent-blue rounded-xl transition-all flex items-center gap-1 text-[10px] uppercase font-sans text-text-muted hover:text-accent-blue"
              >
                <Linkedin className="w-4 h-4 fill-current stroke-none" /> LinkedIn
              </a>
              <button
                onClick={handleCopyLink}
                className="p-2.5 bg-card hover:bg-white/5 border border-border-custom hover:border-accent-lime rounded-xl transition-all flex items-center gap-1 text-[10px] uppercase font-sans text-text-muted hover:text-accent-lime"
              >
                <Link className="w-4 h-4" /> {shareFeedback ? 'Copied URL!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Bottom Founder Bio summary */}
          <div className="bg-card border border-border-custom rounded-3xl p-6 flex flex-col sm:flex-row gap-4 items-center mt-12 mb-16">
            <div className="w-12 h-12 rounded-full bg-bg border border-border-custom flex items-center justify-center font-display font-black text-xs text-accent-lime shrink-0">
              MM
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-sans text-xs font-bold text-white uppercase">Written by Md Muradujjaman</h4>
              <p className="font-sans text-[11px] text-text-muted mt-1 leading-relaxed">
                Founder and Principal Engineer at Xenishio Digital. Md Muradujjaman holds a BS in Software Engineering and writes about web speeds and SEO acquisition checklists.
              </p>
            </div>
          </div>

          {/* Related articles grid summary */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-border-custom">
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-8">
                Related Technical Insights:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <div
                    key={post.slug}
                    onClick={() => handleLinkClick('blog-detail', post.slug)}
                    className="bg-card border border-border-custom hover:border-accent-lime/40 rounded-xl p-4.5 cursor-pointer flex flex-col justify-between h-48 pointer-events-auto"
                  >
                    <div>
                      <span className="font-sans text-[8px] text-accent-lime uppercase tracking-widest block mb-2">{post.publishedAt}</span>
                      <h4 className="font-display font-bold text-xs uppercase text-white line-clamp-3 leading-snug">{post.title}</h4>
                    </div>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-text-muted mt-3 inline-flex items-center gap-1 hover:text-white">
                      Read now <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  // ────────────────────────────────────────────────────────
  // BLOG LISTINGS INDEX PAGE
  // ────────────────────────────────────────────────────────
  return (
    <div className="relative w-full pt-32 pb-16">
      <div className="absolute top-[20%] left-[-10%] w-[32rem] h-[32rem] bg-accent-lime/5 rounded-full blur-[110px] pointer-events-none" />

      <section className="px-6 max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Technical Insights"
          title={<>From Our <span className="font-serif italic text-accent-lime font-normal">Journal Room</span></>}
          subtitle="Explore itemized, step-by-step technical guides on speed optimization, crawl indexing fixes, and organic acquisition rules for B2B channels."
        />

        {/* Categories checklist sort tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 border-b border-border-custom pb-8 pointer-events-auto">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-[10px] tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-accent-lime text-black border-accent-lime font-bold'
                  : 'border-border-custom bg-card text-text-muted hover:border-text-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured blog module (Large full-width post card) */}
        {featuredPost && (
          <ScrollReveal className="bg-card border border-border-custom rounded-3xl p-6 md:p-8 lg:p-10 mb-16 relative overflow-hidden flex flex-col justify-between min-h-[300px] pointer-events-auto shadow-2xl">
            {/* Visual highlighted glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-lime/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl">
              <Badge variant="lime" className="mb-4">
                Featured Insight Article
              </Badge>
              <span className="font-sans text-[10px] text-text-muted uppercase tracking-widest font-bold flex items-center gap-1 mb-2">
                <Calendar className="w-3.5 h-3.5 text-accent-lime" /> {featuredPost.publishedAt} · {featuredPost.readTime} min read
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-white leading-tight tracking-tight mt-1">
                {featuredPost.title}
              </h2>
              <p className="font-sans text-xs md:text-sm text-text-muted mt-4 leading-relaxed font-light max-w-3xl">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="mt-8 border-t border-border-custom/40 pt-6 flex justify-between items-center relative z-10">
              <div className="flex gap-2">
                {featuredPost.categories.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkClick('blog-detail', featuredPost.slug)}
              >
                Read Fully Article →
              </Button>
            </div>
          </ScrollReveal>
        )}

        {/* Remaining posts 3-column index grid */}
        {gridPosts.length > 0 ? (
          <div>
            <h3 className="font-display font-extrabold text-xs text-text-muted uppercase tracking-wider mb-8">
              All Technical Guides:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post, idx) => (
                <ScrollReveal
                  key={post.slug}
                  delay={idx * 0.05}
                  className="bg-card border border-border-custom rounded-2xl p-5 flex flex-col justify-between hover:border-accent-lime/30 transition-colors duration-300 pointer-events-auto h-72 group"
                >
                  <div>
                    <span className="font-sans text-[8px] text-accent-lime uppercase tracking-widest font-bold block mb-3">
                      ✦ {post.publishedAt}
                    </span>
                    <h4 className="font-display font-bold text-base uppercase text-white leading-tight tracking-tight group-hover:text-accent-lime transition-all duration-200">
                      {post.title}
                    </h4>
                    <p className="font-sans text-xs text-text-muted mt-2.5 line-clamp-3 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="border-t border-border-custom/50 pt-4 flex justify-between items-center mt-4">
                    <span className="font-sans text-[8px] text-text-muted uppercase tracking-widest">
                      {post.readTime} min read
                    </span>
                    <button
                      onClick={() => handleLinkClick('blog-detail', post.slug)}
                      className="inline-flex items-center gap-1 font-display font-bold text-[10px] text-accent-lime uppercase hover:text-white transition-colors"
                    >
                      Read →
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          selectedCategory !== 'All' && (
            <div className="text-center py-16 bg-card/15 border border-border-custom rounded-3xl">
              <span className="font-sans text-xs text-text-muted uppercase">No insights match the selected categorisation.</span>
            </div>
          )
        )}
      </section>
    </div>
  );
}
