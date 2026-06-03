/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, ProjectItem, Testimonial, BlogPost } from './types';

export const SERVICES: ServiceItem[] = [
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    tagline: 'High-Performance Web Engineering',
    icon: 'Monitor',
    description: 'Custom WordPress, Next.js, and Webflow sites engineered for speed, SEO, and corporate conversions.',
    problem: 'Most websites are slow, hard to update, and fail of turning visitors into signed clients.',
    deliverables: [
      'Tailwind CSS UI/UX Design System',
      'Ultra-fast Next.js or light WordPress custom theme',
      'Responsive design styled for mobile, tablet, and 4K displays',
      'CMS setup (WordPress admin or headless Sanity)',
      '100% Core Web Vitals score alignment'
    ],
    tools: ['WordPress', 'Webflow', 'Next.js', 'Tailwind CSS', 'Figma', 'Framer'],
    process: [
      'Visual UI wireframing & mapping',
      'Bespoke structure & layout coding',
      'CMS editing integrations',
      'Cross-device responsive tuning'
    ],
    faq: [
      {
        question: 'Which platform should I choose?',
        answer: 'For content-rich sites, WordPress or Webflow is perfect. If you need bespoke functionality or maximum performance, a Next.js full-stack app is the ultimate solution.'
      },
      {
        question: 'Is SEO included in development?',
        answer: 'Yes! Every site we build includes high-standard technical SEO foundations, descriptive metadata, and responsive schema structure.'
      }
    ]
  },
  {
    slug: 'seo-search-visibility',
    title: 'SEO & Search Visibility',
    tagline: 'Own the First Page of Google',
    icon: 'Search',
    description: 'Technical SEO, on-page optimization, rich snippets markup, and data-driven keyword strategy that gets you found.',
    problem: 'A beautiful website is useless if your target accounts can never find it on Google.',
    deliverables: [
      'Aggressive Keyword Gap Analysis',
      'Technical Crawling & Speed Optimization',
      'Schema.org Structured Data integration',
      'Competitor link-profile audit & planning',
      'RankMath / Yoast or JSON-LD setup'
    ],
    tools: ['Ahrefs', 'Search Console', 'Screaming Frog', 'RankMath', 'Semrush'],
    process: [
      'Complete Search Engine visibility audit',
      'Targeted keyword and cluster discovery',
      'On-page copy, headers, and media alignment',
      'Sitemap and indexing prioritization'
    ],
    faq: [
      {
        question: 'How long until I see results from SEO?',
        answer: 'Most clients notice improvements in crawling index and ranking positions for long-tail keywords within 4 to 6 weeks, with compounding organic conversions at 3 to 6 months.'
      },
      {
        question: 'Do you configure Google Search Console?',
        answer: 'Absolutely. We submit clean sitemaps and ensure your domain has zero mobile usability errors.'
      }
    ]
  },
  {
    slug: 'landing-page-optimization',
    title: 'Landing Page Optimization',
    tagline: 'Convert Clicks into B2B Clients',
    icon: 'Layout',
    description: 'Conversion-focused, highly structured landing pages for search ads, LinkedIn campaigns, and enterprise RFPs.',
    problem: 'SaaS and service businesses waste thousands on ads that bounce because their page landing flow is chaotic.',
    deliverables: [
      'Single-screen direct responsive pages',
      'Interactive micro-animations (Framer Motion)',
      'Micro-friction booking form designs',
      'Multi-variant A/B headline templates',
      'Direct CRM webhook integrations'
    ],
    tools: ['Webflow', 'React', 'Framer', 'HubSpot', 'Google Optimize'],
    process: [
      'Value Proposition & narrative refinement',
      'High-contrast CTA wireframing',
      'Single-millisecond CSS weight reduction',
      'Interactive feedback form development'
    ],
    faq: [
      {
        question: 'What is a typical conversion rate increase?',
        answer: 'By removing structural distraction and speeding up execution, our landing pages routinely lift conversion margins from a generic 1.5% up to 4% or 6%.'
      },
      {
        question: 'Can you integrate this with my existing stack?',
        answer: 'Yes, we map contact records directly into Salesforce, HubSpot, Mailchimp, or custom databases.'
      }
    ]
  },
  {
    slug: 'performance-optimization',
    title: 'Performance Optimization',
    tagline: 'Blazing Fast Response Times',
    icon: 'Zap',
    description: 'Core Web Vitals remediation, server-side caching, edge CDN configurations, and ultra-lightweight asset sizing.',
    problem: 'Slow sites fail customers. 40% of page views leave completely if loading exceeds 3 seconds.',
    deliverables: [
      'Mobile Lighthouse performance push to 95+',
      'Unused JS/CSS extraction and stripping',
      'Cloudflare Edge caching rules',
      'WebP/AVIF dynamic image layout serving',
      'Server-side rendering setup'
    ],
    tools: ['GTmetrix', 'Lighthouse', 'Cloudflare', 'PageSpeed Insights', 'Vite'],
    process: [
      'Lighthouse bottleneck analysis & recording',
      'Resource weight and asset compression',
      'Caching headers & global CDN tuning',
      'Asynchronous component loading scripts'
    ],
    faq: [
      {
        question: 'Why is mobile performance harder to optimize?',
        answer: 'Mobile devices run on restricted processors and unstable cellular networks. We prioritize CSS delivery and strip third-party scripts to bypass this latency.'
      },
      {
        question: 'Will this affect the design or quality of my site?',
        answer: 'No. Modern high-speed rendering techniques deliver crisp vector assets and smooth effects without high asset sizes.'
      }
    ]
  },
  {
    slug: 'analytics-tracking',
    title: 'Analytics & Tracking',
    tagline: 'Measure What Matters to Growth',
    icon: 'BarChart',
    description: 'Advanced GA4 setup, server-side GTM, conversion funnels mapping, and visual heatmaps so you always know what works.',
    problem: 'You cannot scale marketing when you are blind to where traffic goes or where buyers drop off.',
    deliverables: [
      'Custom GA4 Client-side and server event streams',
      'Google Tag Manager custom datalayer logic',
      'Form submissions and outbound click logs',
      'Hotjar or Microsoft Clarity heatmaps',
      'Dynamic dashboard reporting loops'
    ],
    tools: ['Google Analytics 4', 'GTM', 'Clarity', 'Looker Studio', 'Search Console'],
    process: [
      'Key Metric conversion definition mapping',
      'GTM Tag container architecture deployment',
      'Datalayer variables setup & testing',
      'Visual performance boards design'
    ],
    faq: [
      {
        question: 'What is GA4 custom events tracking?',
        answer: 'Instead of plain pageviews, custom events capture when high-intent prospects scroll 80%, fill fields, watch reviews, or download estimates.'
      }
    ]
  },
  {
    slug: 'monthly-care-plans',
    title: 'Monthly Care Plans',
    tagline: 'Worry-Free Security & Growth',
    icon: 'Shield',
    description: 'Hourly database backups, malware monitoring, automatic code security patches, page changes, and continuous upkeep.',
    problem: 'Neglected platforms eventually suffer breaking plugins, security intrusions, or random page offline states.',
    deliverables: [
      '24/7 Security firewall & malware scans',
      'Daily database and media backups with cloud replication',
      'Immediate PHP / node / plugin package minor updates',
      'Monthly structural audits & crawl fixes',
      'Included dev hours for content updates and tweaks'
    ],
    tools: ['UpdraftPlus', 'Wordfence', 'Node Package Manager', 'UptimeRobot'],
    process: [
      'Uptime surveillance hook integration',
      'Automated nightly cloud replication script',
      'Plugin sandbox testing before live update',
      'Monthly status checklist delivery report'
    ],
    faq: [
      {
        question: 'Are edits included in the Care Plan?',
        answer: 'Yes! Depending on your chosen level, you get 2 to 5 hours of dedicated developer modifications for any design or messaging tweaks every month.'
      }
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'beige-corporation-suite',
    title: 'Beige Corporation digital ecosystem',
    client: 'Beige Corporation',
    industry: 'US Business Advisory & B2B Services',
    services: ['Website Design & Development', 'SEO & Search Visibility', 'Performance Optimization'],
    tags: ['WordPress', 'SEO', 'Webflow', 'Performance'],
    description: 'Engineered a unified multi-site architecture managing 10+ corporate web properties and 100+ landing pages with fully standardized indexing.',
    challenge: 'Beige Corporation managed multiple separate brand landing spaces that had conflicting styles, sluggish load times of 6.2 seconds, and chaotic SEO indexing hierarchies.',
    solution: 'Designed and deployed a modular component block library using speed-optimized React engines and light WordPress headless configurations. Restructured keyword taxonomies and on-page schemas across all corporate assets.',
    results: [
      { label: 'Platform load speed', value: '1.2s' },
      { label: 'Organic search acquisition', value: '+140%' },
      { label: 'Core Web Vitals Rating', value: 'Grade A' }
    ],
    techStack: ['WordPress', 'React', 'Framer Motion', 'Yoast SEO', 'Cloudflare CDN'],
    completedAt: 'September 2024',
    testimonial: {
      quote: "Murad and his agency transformed our confusing web footprint into a sleek, ultra-fast pipeline. Managing changes is now effortless and search rankings have broken all records.",
      author: "Robert G.",
      role: "Operations VP, Beige Corp"
    }
  },
  {
    slug: 'jamuna-bank-redesign',
    title: 'Jamuna Bank corporate portal',
    client: 'Jamuna Bank PLC',
    industry: 'Financial Institutional Banking',
    services: ['Website Design & Development', 'Performance Optimization', 'Analytics & Tracking'],
    tags: ['WordPress', 'Security', 'Fintech', 'Analytics'],
    description: 'A complete structural design and security audits overhaul for one of Bangladesh\'s premiere commercial banking institutions.',
    challenge: 'The existing institutional portal had legacy table-based HTML, making mobile account access completely broken, and lacked adequate analytic instrumentation to gauge loan application drop-offs.',
    solution: 'Engineered an accessible custom design adhering to AA standards, powered by a heavily hardened WordPress core with two-factor authorization modules, custom server caching hierarchies, and advanced GA4 tag containers.',
    results: [
      { label: 'Mobile transaction rate', value: '+85%' },
      { label: 'Average server response', value: '-64%' },
      { label: 'Daily active loan clicks', value: '+40%' }
    ],
    techStack: ['WordPress Custom Core', 'Custom PHP', 'Google Analytics 4', 'Sass', 'Hardened Server Configurations'],
    completedAt: 'March 2024',
    testimonial: {
      quote: "Working with Md Muradujjaman felt like having an in-house security and UI staff. Highly precise, disciplined about deadlines, and solved our bank's difficult migration issues perfectly.",
      author: "Hassan Al-M.",
      role: "Digital Banking lead, Jamuna Bank"
    }
  },
  {
    slug: 'lead-generation-platform',
    title: 'Enterprise B2B Lead Gen system',
    client: 'Apex Industrial',
    industry: 'Manufacturing & Distribution Logistics',
    services: ['Landing Page Optimization', 'Analytics & Tracking', 'Website Design & Development'],
    tags: ['Next.js', 'Node.js', 'HubSpot', 'Analytics'],
    description: 'Created an intelligent customer acquisition engine with integrated pricing estimators, dynamic CRM routes, and real-time lead grading.',
    challenge: 'High-intent manufacturers left the site because they had to wait 24 hours to get standard shipping estimates and custom layout prices through emails.',
    solution: 'Developed a custom full-stack Next.js single-page software application featuring a dynamic React estimation sheet, immediately outputting fully itemized layouts and copying structured quote metadata directly into HubSpot CRM.',
    results: [
      { label: 'Inbound leads collected', value: '3.4x' },
      { label: 'Quotes formulated', value: '4,100+' },
      { label: 'Client save hours per week', value: '18 hrs' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'HubSpot API', 'PostgreSQL'],
    completedAt: 'November 2023',
    testimonial: {
      quote: "Our sales reps are getting incredibly descriptive leads before even placing a call. The interactive cost estimator md murad created became our primary growth lever.",
      author: "Sarah T.",
      role: "Revenue Director, Apex Logistics"
    }
  },
  {
    slug: 'dhaka-housing-portal',
    title: 'Dhaka Real Estate listing hub',
    client: 'Urban Living BD',
    industry: 'Real Estate & Property Development',
    services: ['Website Design & Development', 'SEO & Search Visibility'],
    tags: ['Next.js', 'React', 'SEO', 'Tailwind CSS'],
    description: 'A speed-engineered architectural map and real estate directory matching listings in Dhaka with verified local B2B offices.',
    challenge: 'Heavy property banner images and legacy listing plugins created massive visual layout shift, causing Google to penalize listing rankings.',
    solution: 'Built a clean database design with client-side filters, AVIF dynamic rendering, custom map vectors, and fully optimized site indexing for major residential keywords.',
    results: [
      { label: 'Search ranking placement', value: 'Top 3' },
      { label: 'Organic session count', value: '+210%' },
      { label: 'Client acquisition rate', value: '+52%' }
    ],
    techStack: ['Next.js', 'IndexedDB', 'Algolia Search', 'Tailwind CSS', 'Schema.org'],
    completedAt: 'January 2025'
  },
  {
    slug: 'evofe-saas-acceleration',
    title: 'Evofe SaaS marketing overhaul',
    client: 'Evofe digital',
    industry: 'Global Digital Agency & SaaS',
    services: ['Performance Optimization', 'Landing Page Optimization', 'Analytics & Tracking'],
    tags: ['React', 'Framer', 'Analytics', 'Tailwind CSS'],
    description: 'Accelerated conversion actions for high-traffic SaaS landing assets using light motion, clear responsive loops, and advanced funnels.',
    challenge: 'High bounce rate on trial signup forms on tablet and mobile browser sizes due to lengthy scripts and bad field alignment.',
    solution: 'Optimized JS payload execution, created fluid animated entry stages with Framer Motion, and simplified the sign-up flow to a single input tab.',
    results: [
      { label: 'SaaS Signup trials', value: '+48%' },
      { label: 'Asset budget size', value: '-72%' },
      { label: 'Form completion speed', value: '4.1s faster' }
    ],
    techStack: ['Vite', 'React 18', 'Framer Motion', 'LogRocket', 'Vercel Performance'],
    completedAt: 'May 2024'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Murad didn't just build a website, he understood our business and created something that actually brings in leads. The project cost calculator alone saved us hours of explanation.",
    author: "Rafi H.",
    role: "CEO, Nexo Global Systems"
  },
  {
    quote: "Google rankings improved within 6 weeks. Our technical SEO flaws vanished, and overall mobile page speed went from red to an outstanding green. Best B2B decision we made in 2024.",
    author: "James M.",
    role: "Agency Founder, Elevate Media"
  },
  {
    quote: "Working with Md Muradujjaman felt like having an in-house expert dev team. Creative, responsive, obsessed with quality and speed of delivery. Highly recommended.",
    author: "Lena K.",
    role: "Marketing Director, BioTech Advisors"
  },
  {
    quote: "Their monthly care plan gives us absolute peace of mind. Regular updates, clean backups, and quick content tweaks are done within a couple of hours. Brilliant service.",
    author: "Ziad Rahman",
    role: "Principal Architect, ArchiStudio Dhaka"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-your-business-website-is-losing-google-rankings',
    title: 'Why Your Business Website Is Losing Google Rankings (And How to Reclaim Them)',
    excerpt: 'Is your search visibility sinking? Explore the 4 key technical SEO leaks that drain rankings and how to fix them immediately.',
    publishedAt: 'May 24, 2026',
    categories: ['SEO', 'Marketing'],
    readTime: 6,
    seoTitle: 'Fix Google Ranking Drops: Corporate website SEO recovery manual',
    seoDescription: 'Discover why your website is losing ranking spots. Learn step-by-step how to repair technical indexing, speed issues, and broken schemas.',
    featured: true,
    body: `<h2>The Organic Search Emergency</h2>
<p>You review your search dashboard and realize your organic traffic is declining. For a B2B business, sinking in search rankings isn't just a vanity loss—it's a direct leak of your pipeline revenue. When your search positions slip, your potential customers are guided directly into the pages of your competitors.</p>

<p>At Xenishio Digital, we review hundreds of site technical records every month. Usually, ranking drops do not happen because of mysterious algorithm shifts. They happen because of critical, compounding structural leaks underneath the layout. Let's cover the 4 most common causes and how to fix them.</p>

<h3>1. Sinking Page Speed (Core Web Vitals Failures)</h3>
<p>Google prioritizes user experience. If your pages take more than 2.5 seconds to load (especially on mobile devices on 4G networks), Google actively down-ranks your URL. Large uncompressed images, heavy unused JavaScript, and missing cache configurations are the primary causes.</p>
<p><strong>The Fix:</strong> Convert image assets to modern WebP or AVIF formats. Extract unused CSS blocks and route assets through premium CDNs like Cloudflare.</p>

<h3>2. Rotten and Outdated Schema Markups</h3>
<p>Search engines rely on structured JSON-LD data to read what your site sells, your pricing, and your localized address coordinates. If you have legacy, malformed, or missing schema codes, Google cannot display rich snippets for your services.</p>
<p><strong>The Fix:</strong> Implement clean schema models describing your localized business, core services, and customer testimonials.</p>

<h3>3. Intrusive Page Layout Shift (CLS)</h3>
<p>Does your page layout jump or flicker when loading reviews or advertisements? Cumulative Layout Shift (CLS) is a major usability ranking factor. If elements shift abruptly, users click the wrong buttons, ruining the user retention rate.</p>
<p><strong>The Fix:</strong> Secure layout aspect ratios for all containers and images beforehand so elements do not resize mid-loading.</p>

<h3>4. Sitemaps and Crawling Exclusions</h3>
<p>During plugin updates or page changes, it\'s easy to accidentally trigger the 'noindex' tag or corrupt your primary sitemap file. If Google\'s bots hit a blocked path, they remove your page from matching index cards immediately.</p>
<p><strong>The Fix:</strong> Audit your Google Search Console coverage index daily to instantly flag excluded URLs.`
  },
  {
    slug: 'wordpress-vs-next-js-which-is-right-for-your-business',
    title: 'WordPress vs Next.js: Which Is Right for Your Business Website?',
    excerpt: 'Should you select the absolute convenience of custom WordPress, or the custom speed and engineering power of Next.js? We break it down fairly.',
    publishedAt: 'April 12, 2026',
    categories: ['Web Development', 'Technology'],
    readTime: 5,
    seoTitle: 'WordPress vs Next.js: Choosing the right tech stack for B2B development',
    seoDescription: 'Confused between WordPress and Next.js? Compare speed, editing capabilities, security levels, and cost margins to pick the best platform.',
    featured: false,
    body: `<h2>The Technical Double Choice</h2>
<p>Choosing your website's engine is one of the most critical decisions. It determines how fast you can launch marketing campaigns, how secure your data remains, and how long your web infrastructure lasts without complete redesigns.</p>

<p>Today, the major choice stands between <strong>WordPress</strong> (powering 43% of the internet) and modern web application structures like <strong>Next.js</strong>. As an agency specialized in both, Md Muradujjaman breaks down which environment fits your operational needs best.</p>

<h3>WordPress: The King of Content Editing</h3>
<p>WordPress is unmatched when your marketing team needs to write 3 blog articles a day, change localized text, or update page banners inside a visual editor without writing code. With components like Gutenberg and robust plugins, it represents ultimate freedom for marketing departments.</p>
<ul>
  <li><strong>Pros:</strong> Immediate content editing control, thousands of reliable plugins, lower initial asset costs.</li>
  <li><strong>Cons:</strong> Plugins conflict, regular maintenance is required, speed declines without optimization.</li>
</ul>

<h3>Next.js: The Ultimate Speed and Scale Engine</h3>
<p>Next.js is a React development framework that outputs pre-compiled, static HTML pages served directly from global edge servers. It has zero databases linked to the browser, making page speeds close to instantaneous, and represents ultimate safety from cyber threats.</p>
<ul>
  <li><strong>Pros:</strong> Blazing-fast page speeds, maximum conversion loops, zero plugin maintenance, absolute security.</li>
  <li><strong>Cons:</strong> Every custom content structure requires a headless CMS setup and initial engineering blocks.</li>
</ul>

<h3>The Decision Guide</h3>
<p><strong>Choose WordPress if</strong> you are a localized service business, require standard layout templates, are focused on rich blogging output, and have a marketing team that wants control without coding.</p>
<p><strong>Choose Next.js if</strong> you are a SaaS platform, want to provide interactive estimators and dashboards, operate heavy ad budgets where every millisecond affects conversion rates, or require highly custom software integrations.</p>`
  },
  {
    slug: 'how-we-improved-a-banks-website-speed-by-60',
    title: 'How We Improved a Major Commercial Bank’s Website Speed by 60%',
    excerpt: 'An itemized breakdown of our custom engineering audit for Jamuna Bank—fixing legacy scripts, caching headers, and visual loading latency.',
    publishedAt: 'March 18, 2026',
    categories: ['Web Development', 'Case Study'],
    readTime: 7,
    seoTitle: 'Case Study: Accelerating Jamuna Bank’s corporate portal speed',
    seoDescription: 'See the step-by-step performance optimizations md murad applied to Jamuna Bank PLC to double mobile responsiveness and secure financial servers.',
    featured: false,
    body: `<h2>The Speed Requirements of Trust</h2>
<p>For a public financial banking portal, speed does not just affect rankings—it represents brand stability and security. If a banking customer waits 6 seconds to load their mobile banking coordinates page, their level of confidence in that financial institution drops immediately.</p>

<p>When Jamuna Bank reached out to Md Muradujjaman of Xenishio Digital, their site faced severe layout shifts and significant waiting latency during high-traffic times. Here is how we rebuilt their speed parameters without risking active database downtime.</p>

<h3>1. Identifying Bottlenecks through Deep Diagnostics</h3>
<p>Our initial GTmetrix audit flagged two major problems:</p>
<ol>
  <li>Excessive legacy JavaScript packages blocking the main rendering thread.</li>
  <li>No server-level page caching in place, forcing financial servers to recompose the entire corporate portal for every visitor.</li>
</ol>

<h3>2. The Modular Remediation Plan</h3>
<p>We started by introducing optimized caching levels on our proxy layer, separating dynamic transaction features from generic marketing layout contents. Next, we extracted CSS and async-configured all non-critical scripts.</p>

<p>Finally, we resized heavy property graphics and localized custom vector SVGs directly inside responsive containers.</p>

<h3>3. Outstanding Outcome Results</h3>
<ul>
  <li><strong>Lighthouse Score:</strong> Lifted from mobile 34 points to 92 points.</li>
  <li><strong>Total Server Response Time:</strong> Reduced from average 840ms down to 190ms.</li>
  <li><strong>Overall Page Loading Speed:</strong> Improved by 61%, reducing visitor dropoffs.</li>
</ul>`
  }
];
