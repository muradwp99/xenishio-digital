/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body Parsing Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Shared Gemini instance under lazy instantiation to prevent startup key checks from crashing the dev server
  let genAiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!genAiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('GEMINI_API_KEY is not defined in the environment secrets.');
      }
      genAiClient = new GoogleGenAI({
        apiKey: apiKey || 'MOCK_KEY',
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return genAiClient;
  }

  // ────────────────────────────────────────────────────────
  // FULL-STACK SERVER SEGMENTS — API ENDPOINTS
  // ────────────────────────────────────────────────────────

  // API 1: Health Monitor
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', agency: 'Xenishio Digital', runtime: 'Node' });
  });

  // API 2: Contact Enquiry Submit Hook
  app.post('/api/contact', (req, res) => {
    const { name, email, projectType, message } = req.body;
    console.log(`[Contact Submission] Name: ${name} | Email: ${email} | Project: ${projectType}`);
    console.log(`[Details]: ${message}`);

    // Mock successful email log
    res.json({
      success: true,
      message: 'Brief formulated and logged. Murad will respond shortly!',
    });
  });

  // API 3: Cost Calculator Quote Submit Hook
  app.post('/api/quote', (req, res) => {
    const { name, email, company, breakdownText, min, max } = req.body;
    console.log(`[Cost Estimator Quote] Client: ${name} (${email}) | Co: ${company || 'None'}`);
    console.log(`[Calculated Cost Range]: $${min} - $${max}`);
    console.log(`[Breakdown]:\n${breakdownText}`);

    res.json({
      success: true,
      message: 'Quote formulated and logged successfully.',
    });
  });

  // API 4: Instant AI Website Analyzer Audits Hook
  app.post('/api/audit', async (req, res) => {
    const { url, problem } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Website URL argument is required.' });
    }

    try {
      if (!process.env.GEMINI_API_KEY) {
        // Safe placeholder fallback
        return res.json({
          report: `### Instant AI Web Checkup (Gemma Mock Engine):\n- **URL:** ${url}\n- **Core Concern:** ${problem || 'General indexing and speed performance check'}\n- **Identified Failure:** Desktop rendering shows deep, uncompressed hero backgrounds, causing layout shift bottlenecks.\n- **Technical Audits Action:** Convert files to next-generation \`.webp\` formats, map semantic \`h1\` headers correctly.\n\n*Note: Provide a real GEMINI_API_KEY in the Secrets panel to activate live Gemini AI technical audits instantly!*`
        });
      }

      const client = getGeminiClient();
      const promptText = `You are Md Muradujjaman, founder and principal developer of Xenishio Digital in Dhaka.
Analyze the following client metrics context:
- URL of the Slow Website: ${url}
- Reporting Problem: ${problem || 'General site optimization, search indexing drop, slow loading times'}

Compile a highly professional, expert bullet-point technical audit checklist (300 words maximum). Focus strictly on identifying critical development gaps:
1. Core Web Vitals (Largest Contentful Paint LCP issues, Cumulative Layout Shift CLS, uncompressed media).
2. On-Page Search Index Visibility (Structured JSON-LD schema integration, meta title length bounds, crawler indexing blocks).
3. Client Experience & Contact Leaks (No clear CTA on first fold, confusing menus).

Make your advice highly actionable, structural, technical, and objective. Use JetBrains Mono style inline highlighting for code issues, and markdown for layout. Encourage them to book a live meet call with you at the end.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });

      res.json({ report: response.text });
    } catch (error: any) {
      console.error('Gemini Audit Failure:', error);
      res.status(500).json({
        error: 'Failed to complete AI audit context.',
        message: error.message,
      });
    }
  });

  // API 5: Fully-Trained Gemini Support Chatbot Bot Hook
  app.post('/api/chat', async (req, res) => {
    const { history } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Conversation history is required.' });
    }

    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "Hello! I am XenBot, representing founder Md Muradujjaman and Xenishio Digital. *[Sandbox Mode]* I'm happy to chat! Once the final Gemini API Key is configured in the Secrets panel, I will respond with full live AI comprehension."
        });
      }

      const client = getGeminiClient();
      
      // Structure the conversation history correctly for the Google GenAI SDK
      const contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const systemPrompt = `You are 'XenBot', an intelligent, elite AI web architecture engineer representing 'Xenishio Digital'.
Your founder is the principal developer Md Muradujjaman based in Dhaka, Bangladesh (Contact: +880 1603-539126, Email: muradujjaman05@gmail.com).

YOUR COMPREHENSIVE KNOWLEDGE DIRECTORY:
1. SERVICES:
   - Static Web Application Systems: Crafted with React, Vite, Next.js for high-speed, 100% Core Web Vitals alignment (from $1,200).
   - Headless WordPress Solutions: Pairs corporate content management autonomy with blinding performance speeds (from $1,800).
   - SEO Diagnostics & Technical Auditing: Full keywords positioning schemas, search visibility improvements (from $800).
   - Upkeep & Security Retainers: 24/7 client systems monitoring, daily safe backups, malware blocking (from $250/mo).
2. CONVERSION PHILOSOPHY: We never build generic layouts. We design around Swiss and Modernist typographic systems that capture attention and turn traffic into paying clients.
3. CONVERSION CALC: If people want a cost estimate, tell them they can use our floating Cost Calculator bubble in the bottom-left corner of the screen!
4. BOOKINGS: Tell customers they should schedule a direct 1-on-1 Zoom setup audit with Md Muradujjaman using his personal Google Calendar Schedule Hook: https://calendar.app.google/N2XWGoRba433WRPs7

YOUR BEHAVIORIAL RULES:
- Identify yourself as XenBot. Be warm, professional, concise, and focused on converting the user.
- Highlight terms using Markdown. Keep paragraphs short (maximum 2-3 lines each) to make chat messages incredibly easy to read on mobile screen views.
- Under NO circumstance invent unverified costs, fake services, or mock other software. If unsure, tell them you can notify Muradujjaman directly with their email.
- Always offer to share Murad's booking path: https://calendar.app.google/N2XWGoRba433WRPs7`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error('Gemini Support Bot Failure:', error);
      res.status(500).json({
        error: 'Technical support connection failed.',
        message: error.message,
      });
    }
  });

  // ────────────────────────────────────────────────────────
  // FULL-STACK SERVER SEGMENTS — VITE HANDLERS
  // ────────────────────────────────────────────────────────

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bound to the hardcoded secure port 3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Xenishio Full Stack Server] Active under host 0.0.0.0 on port ${PORT}`);
  });
}

startServer();
