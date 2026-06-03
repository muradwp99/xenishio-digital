/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Database, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  Calculator, 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Share2, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  LogOut, 
  CheckCircle,
  FileText,
  Upload,
  Globe,
  Code
} from 'lucide-react';
import { 
  loginAdmin, 
  logoutAdmin, 
  subscribeToAuth, 
  listDocuments, 
  writeDocument, 
  deleteDocument 
} from '../lib/firebase';
import { BlogPost, ProjectItem, FAQItem, Testimonial } from '../types';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');

  // Operational State Collections from Firestore
  const [blogs, setBlogs] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [calcOptions, setCalcOptions] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [calcLeads, setCalcLeads] = useState<any[]>([]);
  const [socials, setSocials] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    logoText: 'XENISHIO',
    logoUrl: '',
    googleTagsCode: '',
    customHeadCode: '',
    customFootCode: '',
    facebookPixelCode: ''
  });

  // Modal / Editing Fields States
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editorType, setEditorType] = useState<'create' | 'edit' | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Subscribe to Auth status
  useEffect(() => {
    const unsub = subscribeToAuth((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Fetch all collections on user login
  useEffect(() => {
    if (user) {
      loadAllDatabaseRecords();
    }
  }, [user]);

  // Listen to local DB updates in simulator mode
  useEffect(() => {
    const handleUpdate = () => {
      if (user) {
        loadAllDatabaseRecords();
      }
    };
    window.addEventListener('xenishio-local-db-update', handleUpdate);
    return () => window.removeEventListener('xenishio-local-db-update', handleUpdate);
  }, [user]);

  const loadAllDatabaseRecords = async () => {
    try {
      const liveBlogs = await listDocuments('blog_posts');
      const liveProjects = await listDocuments('projects');
      const livePricing = await listDocuments('pricing_tiers');
      const liveCalcOpts = await listDocuments('calculator_options');
      const liveTests = await listDocuments('testimonials');
      const liveFaqs = await listDocuments('faqs');
      const liveContacts = await listDocuments('contact_entries');
      const liveLeads = await listDocuments('calculator_submissions');
      const liveSocials = await listDocuments('social_links');
      const liveSettingsList = await listDocuments('settings_custom');

      setBlogs(liveBlogs);
      setProjects(liveProjects);
      setPricing(livePricing);
      setCalcOptions(liveCalcOpts);
      setTestimonials(liveTests);
      setFaqs(liveFaqs);
      setContacts(liveContacts);
      setCalcLeads(liveLeads);
      setSocials(liveSocials);

      if (liveSettingsList && liveSettingsList.length > 0) {
        // Load the merged settings from specific "global" config document
        const globalSettings = liveSettingsList.find(s => s.id === 'global') || liveSettingsList[0];
        setSettings(globalSettings);
      }
    } catch (e) {
      console.error('[Admin DB Load Error]', e);
    }
  };

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Submit Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const authenticatedUser = await loginAdmin(usernameInput, passwordInput);
      setUser(authenticatedUser);
      triggerToast('Welcome Md Muradujjaman! Admin session initiated.');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
    triggerToast('Logged out of workspace.');
  };

  // Collection CRUD Handlers
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let colName = '';
    let docId = editingItem.id || editingItem.slug || `item-${Date.now()}`;

    // Map active tab to database collection
    switch (activeTab) {
      case 'blogs':
        colName = 'blog_posts';
        docId = editingItem.slug || docId;
        break;
      case 'projects':
        colName = 'projects';
        docId = editingItem.slug || docId;
        break;
      case 'pricing':
        colName = 'pricing_tiers';
        break;
      case 'calculator':
        colName = 'calculator_options';
        break;
      case 'reviews':
        colName = 'testimonials';
        break;
      case 'faqs':
        colName = 'faqs';
        break;
      case 'socials':
        colName = 'social_links';
        break;
      default:
        return;
    }

    try {
      await writeDocument(colName, docId, { ...editingItem, id: docId });
      triggerToast('Record updated successfully!');
      setEditingItem(null);
      setEditorType(null);
      loadAllDatabaseRecords();
    } catch (error: any) {
      triggerToast(`Could not persist record: ${error.message}`, 'error');
    }
  };

  const handleDeleteItem = async (colName: string, id: string) => {
    if (!window.confirm('Are you absolutely sure you want to remove this record? This action cannot be undone on live systems.')) {
      return;
    }
    try {
      await deleteDocument(colName, id);
      triggerToast('Record removed successfully.');
      loadAllDatabaseRecords();
    } catch (error: any) {
      triggerToast(`Deletion failed: ${error.message}`, 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeDocument('settings_custom', 'global', settings);
      triggerToast('Custom brand settings and SEO scripts published.');
      
      // Attempt to load dynamic pixels inject trigger on frontend
      window.dispatchEvent(new CustomEvent('xenishio-settings-saved'));
    } catch (error: any) {
      triggerToast(`Failed to update site properties: ${error.message}`, 'error');
    }
  };

  // Pre-fill Forms
  const startCreate = () => {
    setEditorType('create');
    switch (activeTab) {
      case 'blogs':
        setEditingItem({
          slug: '',
          title: '',
          excerpt: '',
          body: '',
          publishedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          categories: ['Web Development'],
          readTime: 5,
          seoTitle: '',
          seoDescription: '',
          featured: false,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60'
        });
        break;
      case 'projects':
        setEditingItem({
          slug: '',
          title: '',
          client: '',
          industry: '',
          services: ['Website Design & Development'],
          tags: ['React', 'Tailwind CSS'],
          description: '',
          challenge: '',
          solution: '',
          techStack: ['React', 'Tailwind CSS'],
          completedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
          image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
          results: [
            { label: 'Page response', value: '1.1s' },
            { label: 'SEO rankings', value: '+120%' }
          ]
        });
        break;
      case 'pricing':
        setEditingItem({
          id: `plan-${Date.now()}`,
          name: '',
          price: '',
          period: 'one-time',
          description: '',
          features: [''],
          highlighted: false,
          ctaText: 'Activate Package'
        });
        break;
      case 'calculator':
        setEditingItem({
          id: `calc-${Date.now()}`,
          category: 'Platform Stack',
          name: '',
          minPrice: 1000,
          maxPrice: 2000
        });
        break;
      case 'reviews':
        setEditingItem({
          id: `testimonial-${Date.now()}`,
          quote: '',
          author: '',
          role: '',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        });
        break;
      case 'faqs':
        setEditingItem({
          id: `faq-${Date.now()}`,
          question: '',
          answer: ''
        });
        break;
      case 'socials':
        setEditingItem({
          id: `social-${Date.now()}`,
          platform: '',
          url: '',
          iconName: 'Share2'
        });
        break;
    }
  };

  const startEdit = (item: any) => {
    setEditorType('edit');
    setEditingItem({ ...item });
  };

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    if (!editingItem) return;
    const arrayCopy = [...(editingItem[field] || [])];
    arrayCopy[index] = value;
    setEditingItem({ ...editingItem, [field]: arrayCopy });
  };

  const addArrayFieldItem = (field: string) => {
    if (!editingItem) return;
    const arrayCopy = [...(editingItem[field] || []), ''];
    setEditingItem({ ...editingItem, [field]: arrayCopy });
  };

  const removeArrayFieldItem = (field: string, index: number) => {
    if (!editingItem) return;
    const arrayCopy = [...(editingItem[field] || [])].filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, [field]: arrayCopy });
  };

  const handleResultsFieldChange = (index: number, key: 'label' | 'value', value: string) => {
    if (!editingItem) return;
    const resultsCopy = [...(editingItem.results || [])];
    resultsCopy[index] = { ...resultsCopy[index], [key]: value };
    setEditingItem({ ...editingItem, results: resultsCopy });
  };

  const addResultItem = () => {
    if (!editingItem) return;
    const resultsCopy = [...(editingItem.results || []), { label: '', value: '' }];
    setEditingItem({ ...editingItem, results: resultsCopy });
  };

  const removeResultItem = (index: number) => {
    if (!editingItem) return;
    const resultsCopy = [...(editingItem.results || [])].filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, results: resultsCopy });
  };

  return (
    <div id="admin-page-workspace" className="min-h-screen bg-bg text-text-main py-12 px-4 md:px-8 sleek-hero-radial relative">
      
      {/* Dynamic Toast Alerts */}
      {toast && (
        <div 
          id="admin-toast-feedback"
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border shadow-xl transition-all duration-300 animate-bounce ${
            toast.type === 'success' ? 'bg-surface border-green-500/30 text-green-400' : 'bg-surface border-red-500/30 text-red-400'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          1. SIGN-IN INTERFACE
          ──────────────────────────────────────────────────────── */}
      {!user && (
        <div id="admin-unauthorized-gate" className="max-w-md mx-auto my-12 bg-surface/50 backdrop-blur-md rounded-3xl p-8 border border-border-custom relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-lime via-accent-blue to-accent-lime"></div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 mb-4 animate-pulse">
              <Lock className="w-8 h-8 text-accent-lime" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 uppercase">Xenishio Admin</h1>
            <p className="text-xs text-text-muted font-mono bg-bg py-1 px-3 rounded-full border border-border-custom text-center">
              Enter credentials below to modify live systems.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Administrative Username</label>
              <input 
                type="text" 
                value={usernameInput} 
                onChange={(e) => setUsernameInput(e.target.value)} 
                placeholder="adminMurad" 
                required 
                className="w-full bg-bg border border-border-custom rounded-xl py-3.5 px-4 font-mono text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-lime focus:border-accent-lime"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Access Key Code</label>
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                placeholder="••••••" 
                required 
                className="w-full bg-bg border border-border-custom rounded-xl py-3.5 px-4 font-mono text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-lime focus:border-accent-lime"
              />
            </div>

            {loginError && (
              <div className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 py-2.5 px-3 rounded-lg font-mono space-y-2">
                <p>{loginError}</p>
                {loginError.includes('https://') && (
                  <div className="pt-1.5 border-t border-red-500/10">
                    <a 
                      href={loginError.substring(loginError.indexOf('https://'))} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 font-bold text-accent-lime underline hover:text-white transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Configure Firebase Auth Provider
                    </a>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full bg-accent-blue text-white py-3.5 px-6 rounded-xl hover:bg-accent-lime hover:text-black font-semibold text-sm transition-all duration-300"
            >
              {loginLoading ? 'Authenticating Access...' : 'De-authorize & Unlock Control'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-text-muted/60 bg-bg p-4 rounded-xl border border-border-custom/50">
            <p>Admin Login Help: User <strong>adminMurad</strong> and security pass <strong>342832</strong> are validated.</p>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          2. ADMIN DASHBOARD WORKSPACE
          ──────────────────────────────────────────────────────── */}
      {user && (
        <div id="admin-main-interface" className="max-w-7xl mx-auto space-y-8 animate-fade-in">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-custom pb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-4 p-1.5 rounded bg-brand-green/10 flex items-center justify-center border border-brand-green/30 animate-pulse">
                  <Database className="w-4 h-4 text-brand-green" />
                </div>
                <span className="text-xs font-mono text-brand-green tracking-widest uppercase">Live Datastore Link Sync Active</span>
              </div>
              <h1 className="text-4xl font-black text-white mt-1 uppercase tracking-tight">Xenishio Admin Console</h1>
              <p className="text-sm text-text-muted">Welcome, founder Md Muradujjaman. Live content configurations.</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="md:self-start bg-surface border border-border-custom py-2.5 px-5 rounded-xl text-xs font-mono text-text-muted hover:text-red-400 hover:border-red-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Terminate Session
            </button>
          </div>

          {/* Navigation Tab Hub */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border-custom/50 pb-4 overflow-x-auto">
            {[
              { id: 'blogs', label: 'Blog Posts', icon: BookOpen },
              { id: 'projects', label: 'Portfolio Works', icon: Briefcase },
              { id: 'pricing', label: 'Pricing Plans', icon: DollarSign },
              { id: 'calculator', label: 'Calculator Rules', icon: Calculator },
              { id: 'reviews', label: 'Client Reviews', icon: MessageSquare },
              { id: 'faqs', label: 'FAQs List', icon: HelpCircle },
              { id: 'contacts', label: 'Contact Briefs', icon: Mail },
              { id: 'leads', label: 'Calculator Leads', icon: FileText },
              { id: 'socials', label: 'Social Networks', icon: Share2 },
              { id: 'settings', label: 'SEO & Site Custom scripts', icon: Settings },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setEditingItem(null);
                    setEditorType(null);
                  }}
                  className={`flex items-center gap-2.5 py-3 px-5 rounded-xl text-xs uppercase font-mono tracking-wider transition-all border ${
                    activeTab === tab.id 
                      ? 'bg-accent-blue border-accent-lime text-accent-lime shadow-[0_0_15px_rgba(15,41,115,0.4)]' 
                      : 'bg-surface/30 border-border-custom text-text-muted hover:text-white hover:border-text-muted/30'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Workspaces */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List Panels (Left / Main Layout Columns) */}
            <div className={`lg:col-span-8 space-y-6 ${editorType ? 'hidden lg:block' : 'lg:col-span-12'}`}>
              
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <Database className="w-5 h-5 text-accent-lime" />
                  {activeTab.replace('_', ' ')} list ({
                    activeTab === 'blogs' ? blogs.length :
                    activeTab === 'projects' ? projects.length :
                    activeTab === 'pricing' ? pricing.length :
                    activeTab === 'calculator' ? calcOptions.length :
                    activeTab === 'reviews' ? testimonials.length :
                    activeTab === 'faqs' ? faqs.length :
                    activeTab === 'contacts' ? contacts.length :
                    activeTab === 'leads' ? calcLeads.length :
                    activeTab === 'socials' ? socials.length : 1
                  } records)
                </h2>

                {activeTab !== 'contacts' && activeTab !== 'leads' && activeTab !== 'settings' && (
                  <button 
                    onClick={startCreate}
                    className="bg-accent-lime text-black py-2 px-4 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transiton-all"
                  >
                    <Plus className="w-4 h-4 mt-0.5" />
                    Create New
                  </button>
                )}
              </div>

              {/* LIST VIEWS */}

              {/* A. Blogs List */}
              {activeTab === 'blogs' && (
                <div className="space-y-4">
                  {blogs.map((b) => (
                    <div key={b.id || b.slug} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{b.title}</h4>
                        <p className="text-xs uppercase font-mono text-accent-lime mb-2">Slug: {b.slug} | Date: {b.publishedAt} | Read: {b.readTime} mins</p>
                        <p className="text-xs text-text-muted max-w-2xl line-clamp-2">{b.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(b)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('blog_posts', b.id || b.slug)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* B. Projects List */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id || p.slug} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{p.title}</h4>
                        <p className="text-xs uppercase font-mono text-accent-lime mb-2">Slug: {p.slug} | Client: {p.client} | Completed: {p.completedAt}</p>
                        <p className="text-xs text-text-muted max-w-2xl line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('projects', p.id || p.slug)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* C. Pricing List */}
              {activeTab === 'pricing' && (
                <div className="space-y-4">
                  {pricing.map((pr) => (
                    <div key={pr.id} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-white">{pr.name}</h4>
                          {pr.highlighted && <span className="text-[10px] uppercase font-mono tracking-widest bg-accent-lime/10 border border-accent-lime/30 text-accent-lime px-2 py-0.5 rounded-full">Primary Highlight</span>}
                        </div>
                        <p className="text-xs uppercase font-mono text-accent-lime mb-2">ID: {pr.id} | Cost: ${pr.price} / {pr.period}</p>
                        <p className="text-xs text-text-muted max-w-2xl">{pr.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {pr.features && pr.features.map((f: string, i: number) => (
                            <span key={i} className="text-[11px] bg-bg py-0.5 px-2 rounded border border-border-custom font-mono text-text-muted">✓ {f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(pr)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('pricing_tiers', pr.id)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* D. Calculator Options */}
              {activeTab === 'calculator' && (
                <div className="space-y-4">
                  {calcOptions.map((co) => (
                    <div key={co.id} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest bg-accent-blue/40 text-accent-lime border border-accent-blue px-2 py-1 rounded">
                          {co.category}
                        </span>
                        <h4 className="text-lg font-bold text-white mt-2 mb-1">{co.name}</h4>
                        <p className="text-xs uppercase font-mono text-accent-lime">Range: ${co.minPrice} - ${co.maxPrice}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(co)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('calculator_options', co.id)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* E. Testimonials List */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <p className="italic text-sm text-white mb-2 font-serif">"{t.quote}"</p>
                        <p className="text-xs uppercase font-mono text-accent-lime">Author: {t.author} | Role: {t.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(t)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('testimonials', t.id)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* F. FAQs List */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  {faqs.map((f) => (
                    <div key={f.id} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-white mb-1.5">Q: {f.question}</h4>
                        <p className="text-xs text-text-muted">A: {f.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(f)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('faqs', f.id)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* G. Contact Enquiries List */}
              {activeTab === 'contacts' && (
                <div className="space-y-4 animate-fade-in">
                  {contacts.length === 0 ? (
                    <div className="bg-surface/20 border border-border-custom rounded-3xl p-8 text-center text-text-muted text-sm font-mono">
                      No customer enquiries logged in database.
                    </div>
                  ) : (
                    contacts.map((c) => (
                      <div key={c.id} className="bg-surface/50 p-6 rounded-2xl border border-border-custom space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-blue"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-base font-bold text-white">{c.name}</h4>
                            <p className="text-xs uppercase font-mono text-accent-lime">Email: {c.email} | Project interest: {c.projectType || 'General inquiry'}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono bg-bg text-text-muted border border-border-custom px-2 py-1 rounded">Date: {new Date(c.createdAt || Date.now()).toLocaleDateString()}</span>
                            <button onClick={() => handleDeleteItem('contact_entries', c.id)} className="p-2 bg-bg hover:text-red-400 border border-border-custom hover:border-red-500/20 rounded-xl transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="bg-bg/40 p-3.5 rounded-xl border border-border-custom font-sans text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
                          {c.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* H. Calculator Leads List */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  {calcLeads.length === 0 ? (
                    <div className="bg-surface/20 border border-border-custom rounded-3xl p-8 text-center text-text-muted text-sm font-mono">
                      No calculator leads captured in database.
                    </div>
                  ) : (
                    calcLeads.map((cl) => (
                      <div key={cl.id} className="bg-surface/50 p-6 rounded-2xl border border-border-custom space-y-3 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-green"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-base font-bold text-white">{cl.name}</h4>
                            <p className="text-xs uppercase font-mono text-accent-lime">Email: {cl.email} | Co: {cl.company || 'Not Specified'}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-black text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded">Est: ${cl.min} - ${cl.max}</span>
                            <button onClick={() => handleDeleteItem('calculator_submissions', cl.id)} className="p-2 bg-bg hover:text-red-400 border border-border-custom hover:border-red-500/20 rounded-xl transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        {cl.breakdownText && (
                          <div className="bg-bg/40 p-3.5 rounded-xl border border-border-custom font-mono text-[10px] text-text-muted leading-relaxed whitespace-pre-wrap">
                            {cl.breakdownText}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* I. Social Links List */}
              {activeTab === 'socials' && (
                <div className="space-y-4">
                  {socials.map((s) => (
                    <div key={s.id} className="bg-surface/50 p-5 rounded-2xl border border-border-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1 font-mono">{s.platform}</h4>
                        <p className="text-xs text-text-muted break-all uppercase font-mono">Url: <a href={s.url} target="_blank" rel="noreferrer" className="text-accent-lime italic">{s.url}</a> | Icon: {s.iconName || 'Share2'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(s)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-white rounded-xl transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteItem('social_links', s.id)} className="p-2.5 bg-bg border border-border-custom text-text-muted hover:text-red-400 hover:border-red-500/20 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* J. System Settings Editor */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="bg-surface/30 border border-border-custom rounded-3xl p-6 space-y-6 animate-fade-in">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border-custom/50">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Corporate Logo text</label>
                      <input 
                        type="text" 
                        value={settings.logoText || ''} 
                        onChange={(e) => setSettings({ ...settings, logoText: e.target.value })} 
                        className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-lime"
                        placeholder="XENISHIO"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Custom Logo Image URL</label>
                      <input 
                        type="text" 
                        value={settings.logoUrl || ''} 
                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                        className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-lime"
                        placeholder="https://example.com/logo.png"
                      />
                      <p className="text-[10px] text-text-muted mt-1.5 italic">Leave empty to display sleek textual logo typography.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-accent-lime" />
                        Google Tags Integration (ID / script code)
                      </label>
                      <textarea
                        value={settings.googleTagsCode || ''}
                        onChange={(e) => setSettings({ ...settings, googleTagsCode: e.target.value })}
                        rows={4}
                        className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-lime"
                        placeholder="<!-- G-XXXXXX GTM scripts -->"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4 text-accent-lime" />
                        Facebook Pixel custom Tracking Pixel (FBQ)
                      </label>
                      <textarea
                        value={settings.facebookPixelCode || ''}
                        onChange={(e) => setSettings({ ...settings, facebookPixelCode: e.target.value })}
                        rows={3}
                        className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-lime"
                        placeholder="fbq('init', 'PIXEL_ID');"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Custom Head Scripts (&lt;head&gt; inserts)</label>
                        <textarea
                          value={settings.customHeadCode || ''}
                          onChange={(e) => setSettings({ ...settings, customHeadCode: e.target.value })}
                          rows={6}
                          className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-lime"
                          placeholder="<meta name='additional-seo' content='code'>"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider font-mono text-text-muted mb-2">Custom Foot Scripts (before &lt;/body&gt;)</label>
                        <textarea
                          value={settings.customFootCode || ''}
                          onChange={(e) => setSettings({ ...settings, customFootCode: e.target.value })}
                          rows={6}
                          className="w-full bg-bg border border-border-custom rounded-xl py-3 px-4 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-accent-lime"
                          placeholder="<!-- Analytics scripts -->"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      className="bg-accent-blue hover:bg-accent-lime hover:text-black border border-accent-lime/30 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save & Publish Configurations
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Editing / Create Form Drawer (Right Columns) */}
            {editorType && editingItem && (
              <div className="lg:col-span-4 bg-surface/50 border border-border-custom rounded-3xl p-6 sticky top-6 space-y-6 animate-slide-in">
                
                <div className="flex items-center justify-between border-b border-border-custom pb-4">
                  <h3 className="text-base uppercase tracking-wider font-mono text-accent-lime font-black">
                    {editorType === 'create' ? 'Create New' : 'Edit Details'}
                  </h3>
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setEditorType(null);
                    }}
                    className="text-xs font-mono text-text-muted hover:text-white bg-bg px-2.5 py-1 rounded border border-border-custom"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveItem} className="space-y-5">
                  
                  {/* Blogs Form config */}
                  {activeTab === 'blogs' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Article Title</label>
                        <input type="text" required value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">SEO Slug</label>
                        <input type="text" required disabled={editorType === 'edit'} value={editingItem.slug} onChange={(e) => setEditingItem({...editingItem, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-')})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs disabled:opacity-50"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Excerpt Summary</label>
                        <textarea rows={3} required value={editingItem.excerpt} onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Featured Banner Image URL</label>
                        <input type="text" value={editingItem.image || ''} onChange={(e) => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Read Time (minutes)</label>
                        <input type="number" value={editingItem.readTime} onChange={(e) => setEditingItem({...editingItem, readTime: parseInt(e.target.value)})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">SEO Title Tag</label>
                          <input type="text" value={editingItem.seoTitle || ''} onChange={(e) => setEditingItem({...editingItem, seoTitle: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">SEO Meta Desc</label>
                          <input type="text" value={editingItem.seoDescription || ''} onChange={(e) => setEditingItem({...editingItem, seoDescription: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 py-1">
                        <input type="checkbox" id="checked-featured" checked={editingItem.featured} onChange={(e) => setEditingItem({...editingItem, featured: e.target.checked})} className="rounded border-border-custom bg-bg text-accent-lime focus:ring-0"/>
                        <label htmlFor="checked-featured" className="text-xs text-white">Feature on main columns</label>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">HTML Body Content</label>
                        <textarea rows={10} required value={editingItem.body} onChange={(e) => setEditingItem({...editingItem, body: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs font-mono"></textarea>
                      </div>
                    </div>
                  )}

                  {/* Projects Case Study Form config */}
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Work Title</label>
                        <input type="text" required value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Slug URL</label>
                        <input type="text" required disabled={editorType === 'edit'} value={editingItem.slug} onChange={(e) => setEditingItem({...editingItem, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-')})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs disabled:opacity-50"/>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Client Name</label>
                          <input type="text" required value={editingItem.client} onChange={(e) => setEditingItem({...editingItem, client: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Industry Segment</label>
                          <input type="text" required value={editingItem.industry || ''} onChange={(e) => setEditingItem({...editingItem, industry: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Showcase Image URL</label>
                        <input type="text" value={editingItem.image || ''} onChange={(e) => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">General description</label>
                        <textarea rows={3} required value={editingItem.description} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">The Challenge</label>
                        <textarea rows={3} required value={editingItem.challenge} onChange={(e) => setEditingItem({...editingItem, challenge: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">The Solution Rebuilt</label>
                        <textarea rows={3} required value={editingItem.solution} onChange={(e) => setEditingItem({...editingItem, solution: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted">Results Accomplished</label>
                          <button type="button" onClick={addResultItem} className="text-[10px] text-accent-lime font-mono bg-bg py-0.5 px-2 rounded border border-border-custom">+ Add Metric</button>
                        </div>
                        <div className="space-y-2">
                          {editingItem.results && editingItem.results.map((res: any, index: number) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input type="text" placeholder="Label (e.g. Speed)" value={res.label} onChange={(e) => handleResultsFieldChange(index, 'label', e.target.value)} className="w-1/2 bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                              <input type="text" placeholder="Value (e.g. 1s)" value={res.value} onChange={(e) => handleResultsFieldChange(index, 'value', e.target.value)} className="w-1/3 bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                              <button type="button" onClick={() => removeResultItem(index)} className="p-2 text-red-400 bg-bg hover:bg-neutral-900 border border-border-custom rounded-lg"><Trash2 className="w-3 h-3"/></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing Tiers Form Config */}
                  {activeTab === 'pricing' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Package title Name</label>
                        <input type="text" required value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Cost ($ / USD)</label>
                          <input type="text" required value={editingItem.price} onChange={(e) => setEditingItem({...editingItem, price: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Period</label>
                          <select value={editingItem.period} onChange={(e) => setEditingItem({...editingItem, period: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs">
                            <option value="one-time">One-time payment</option>
                            <option value="month">Monthly Retainer</option>
                            <option value="year">Annual Retainer</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Cta Button text</label>
                        <input type="text" value={editingItem.ctaText || ''} onChange={(e) => setEditingItem({...editingItem, ctaText: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Summary pitch</label>
                        <textarea rows={2.5} required value={editingItem.description} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>

                      <div className="flex items-center gap-2 py-1">
                        <input type="checkbox" id="checked-recommended" checked={editingItem.highlighted} onChange={(e) => setEditingItem({...editingItem, highlighted: e.target.checked})} className="rounded border-border-custom bg-bg text-accent-lime focus:ring-0"/>
                        <label htmlFor="checked-recommended" className="text-xs text-white">Mark as Featured / Recommended</label>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted">Included Features Checkbox</label>
                          <button type="button" onClick={() => addArrayFieldItem('features')} className="text-[10px] text-accent-lime font-mono bg-bg py-0.5 px-2 rounded border border-border-custom">+ Add Feature</button>
                        </div>
                        <div className="space-y-2">
                          {editingItem.features && editingItem.features.map((feat: string, index: number) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input type="text" required value={feat} onChange={(e) => handleArrayFieldChange('features', index, e.target.value)} className="w-full bg-bg border border-border-custom rounded-lg py-1.5 px-3 text-white text-xs"/>
                              <button type="button" onClick={() => removeArrayFieldItem('features', index)} className="p-1 px-2 text-red-400 bg-bg hover:bg-neutral-900 border border-border-custom rounded-lg"><Trash2 className="w-3 h-3"/></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Calculator options Form config */}
                  {activeTab === 'calculator' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Calculator Category</label>
                        <select value={editingItem.category} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs">
                          <option value="Platform Stack">Platform Stack</option>
                          <option value="Feature Bundles">Feature Bundles</option>
                          <option value="Care retainer">Care retainer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Service Name</label>
                        <input type="text" required value={editingItem.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Minimum Price ($)</label>
                          <input type="number" required value={editingItem.minPrice} onChange={(e) => setEditingItem({...editingItem, minPrice: parseInt(e.target.value)})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Maximum Price ($)</label>
                          <input type="number" required value={editingItem.maxPrice} onChange={(e) => setEditingItem({...editingItem, maxPrice: parseInt(e.target.value)})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FAQs Form config */}
                  {activeTab === 'faqs' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Question Text</label>
                        <input type="text" required value={editingItem.question} onChange={(e) => setEditingItem({...editingItem, question: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Answer Text Explanation</label>
                        <textarea rows={5} required value={editingItem.answer} onChange={(e) => setEditingItem({...editingItem, answer: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>
                    </div>
                  )}

                  {/* Testimonial Form Config */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Client Nominee Name</label>
                        <input type="text" required value={editingItem.author} onChange={(e) => setEditingItem({...editingItem, author: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Corporate Position / Company Co</label>
                        <input type="text" required value={editingItem.role} onChange={(e) => setEditingItem({...editingItem, role: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Testimonial Quote Comment</label>
                        <textarea rows={4} required value={editingItem.quote} onChange={(e) => setEditingItem({...editingItem, quote: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"></textarea>
                      </div>
                    </div>
                  )}

                  {/* Social Links Form Config */}
                  {activeTab === 'socials' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Platform Identifier (e.g. LinkedIn)</label>
                        <input type="text" required value={editingItem.platform} onChange={(e) => setEditingItem({...editingItem, platform: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Profile Web Address Address (URL)</label>
                        <input type="url" required value={editingItem.url} onChange={(e) => setEditingItem({...editingItem, url: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-mono text-text-muted mb-1.5">Lucide Icon identifier (e.g. Facebook, Linkedin, Twitter, MessageSquare)</label>
                        <input type="text" required value={editingItem.iconName} onChange={(e) => setEditingItem({...editingItem, iconName: e.target.value})} className="w-full bg-bg border border-border-custom rounded-lg py-2 px-3 text-white text-xs"/>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full bg-accent-lime text-black py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(233,175,49,0.1)]"
                  >
                    <Save className="w-4 h-4" />
                    Commit and Save
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
