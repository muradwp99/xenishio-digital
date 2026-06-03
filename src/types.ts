/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  tagline: string;
  icon: string; // Lucide icon name
  description: string;
  problem: string;
  deliverables: string[];
  tools: string[];
  process: string[];
  faq: FAQItem[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: MetricItem[];
  techStack: string[];
  completedAt: string;
  testimonial?: Testimonial;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // Plain text or lightweight HTML/Markdown body
  publishedAt: string;
  categories: string[];
  readTime: number; // in minutes
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  image?: string;
}

export type ActiveRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'work'
  | 'case-studies'
  | 'case-study-detail'
  | 'pricing'
  | 'calculator'
  | 'book-audit'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'admin';

export interface RouteState {
  view: ActiveRoute;
  slug?: string;
}
