/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { BLOG_POSTS, PROJECTS, TESTIMONIALS, SERVICES } from '../data';

// Keep track of Firebase initialization state
let app;
let db: any = null;
let auth: any = null;
let isFirebaseActive = false;

// Safe dynamic initialization
try {
  if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'placeholder-api-key') {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);
    isFirebaseActive = true;
    console.log('[Firebase Admin Integration] Active & initialized with project:', firebaseConfig.projectId);
  } else {
    console.warn('[Firebase SDK] Using local-storage fallback. Please accept Firebase terms in the UI.');
  }
} catch (e) {
  console.error('[Firebase Init Error]', e);
}

// ────────────────────────────────────────────────────────
// ERROR HANDLER SPECS IN ALIGNMENT WITH FIRESTORE SKILL
// ────────────────────────────────────────────────────────
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ────────────────────────────────────────────────────────
// INITIAL CONNECTION TEST
// ────────────────────────────────────────────────────────
export async function testConnection() {
  if (!isFirebaseActive) return false;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.error("Please check your Firebase configuration status.");
    }
    return false;
  }
}

// Execute connection diagnostics if active
if (isFirebaseActive) {
  testConnection();
}

// ────────────────────────────────────────────────────────
// AUTHENTICATION INTERFACE (username: adminMurad, password: 342832)
// ────────────────────────────────────────────────────────
export const loginAdmin = async (usernameInput: string, passwordInput: string): Promise<User> => {
  if (!isFirebaseActive) {
    // Local fallback login for simulation if Firebase is not active yet
    if (usernameInput.toLowerCase() === 'adminmurad' && passwordInput === '342832') {
      const mockUser = {
        uid: 'demo-admin-uid-12345',
        email: 'adminmurad@xenishio.com',
        displayName: 'adminMurad',
        emailVerified: true
      } as any;
      localStorage.setItem('xen_mock_admin', JSON.stringify(mockUser));
      return mockUser;
    }
    throw new Error('Invalid credentials');
  }

  const normalizedUsername = usernameInput.trim().toLowerCase();
  
  if (normalizedUsername !== 'adminmurad') {
    throw new Error('Unauthorized administrative username');
  }

  const email = 'adminmurad@xenishio.com';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, passwordInput);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed' || error.message?.includes('operation-not-allowed')) {
      const projectId = firebaseConfig?.projectId || 'placeholder-project-id';
      throw new Error(`Firebase Error: Email/Password login is not enabled in your Firebase Console. Please enable the 'Email/Password' sign-in provider under Go to Authentication -> Sign-in method in your console at: https://console.firebase.google.com/project/${projectId}/authentication/providers`);
    }

    // If the user does not exist on first deployment, automatically bootstrap/register the credentials!
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.message?.includes('user-not-found')) {
      try {
        console.log('[Firebase Auth] Admin account not found. Bootstrapping user creds...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, passwordInput);
        
        // Write the admin record documents synchronously to ensure authorization rules pass
        try {
          await setDoc(doc(db, 'admins', userCredential.user.uid), {
            email: email,
            username: 'adminMurad',
            role: 'superadmin',
            createdAt: serverTimestamp()
          });
        } catch (dbErr) {
          console.warn('[Firebase Sync Database Error] Auth registered but admins record blocked by security rules:', dbErr);
        }

        return userCredential.user;
      } catch (signupError: any) {
        if (signupError.code === 'auth/operation-not-allowed' || signupError.message?.includes('operation-not-allowed')) {
          const projectId = firebaseConfig?.projectId || 'placeholder-project-id';
          throw new Error(`Firebase Error: Email/Password login is not enabled in your Firebase Console. Please enable the 'Email/Password' sign-in provider under Go to Authentication -> Sign-in method in your console at: https://console.firebase.google.com/project/${projectId}/authentication/providers`);
        }
        throw new Error(`Authentication bootstrapping failed: ${signupError.message}`);
      }
    }
    throw error;
  }
};

export const logoutAdmin = async (): Promise<void> => {
  localStorage.removeItem('xen_mock_admin');
  if (isFirebaseActive) {
    await signOut(auth);
  }
};

export const subscribeToAuth = (callback: (user: User | null) => void) => {
  if (!isFirebaseActive) {
    const stored = localStorage.getItem('xen_mock_admin');
    if (stored) {
      callback(JSON.parse(stored));
    } else {
      callback(null);
    }
    // Return unsubscribe empty stub
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// ────────────────────────────────────────────────────────
// DATA SEEDING & SYNC UTILS
// ────────────────────────────────────────────────────────

// LocalStorage Persistence utility for Mock fallback mode
const getLocalStorageData = (key: string, defaultData: any) => {
  const store = localStorage.getItem(`xen_${key}`);
  if (!store) {
    localStorage.setItem(`xen_${key}`, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(store);
};

const setLocalStorageData = (key: string, data: any) => {
  localStorage.setItem(`xen_${key}`, JSON.stringify(data));
};

// Auto Seed database when a collection is detected as empty
export const seedDatabaseIfEmpty = async () => {
  if (!isFirebaseActive) return;
  try {
    // 1. Seed Blog Posts
    const blogSnap = await getDocs(collection(db, 'blog_posts'));
    if (blogSnap.empty) {
      console.log('[Seeding Database] Bootstrapping blog_posts...');
      for (const post of BLOG_POSTS) {
        await setDoc(doc(db, 'blog_posts', post.slug), {
          ...post,
          createdAt: serverTimestamp()
        });
      }
    }
    
    // 2. Seed Projects (Case Studies)
    const projSnap = await getDocs(collection(db, 'projects'));
    if (projSnap.empty) {
      console.log('[Seeding Database] Bootstrapping projects...');
      for (const proj of PROJECTS) {
        await setDoc(doc(db, 'projects', proj.slug), {
          ...proj,
          createdAt: serverTimestamp()
        });
      }
    }

    // 3. Seed Pricing Tiers
    const priceSnap = await getDocs(collection(db, 'pricing_tiers'));
    if (priceSnap.empty) {
      console.log('[Seeding Database] Bootstrapping pricing_tiers...');
      const defaultPricings = [
        {
          id: 'one-time-landing-page',
          name: 'Landing Page System',
          price: '1,500',
          period: 'one-time',
          description: 'High-speed conversion machinery tailored for search campaigns and B2B user response.',
          features: [
            'Single-screen direct responsive pages',
            'Interactive form entries with verification',
            'Custom analytics tag insertion',
            '100% Core Web Vitals alignment',
            '30 days post-launch Care retainer'
          ],
          highlighted: false,
          ctaText: 'Assemble Conversion Page'
        },
        {
          id: 'retainer-care',
          name: 'Monthly Care Plan',
          price: '250',
          period: 'month',
          description: 'Worry-free page additions, regular database backing, code security patches, and site uptime audits.',
          features: [
            '24/7 Security firewalls and malware blocks',
            'Daily media and database backup schedules',
            'Included dev hours for custom additions',
            'Continuous technical indexing diagnostics',
            'Active Uptime notifications loop'
          ],
          highlighted: true,
          ctaText: 'Activate Care Plan'
        },
        {
          id: 'custom-corporate-portal',
          name: 'Custom Corporate Site',
          price: '4,500',
          period: 'one-time',
          description: 'A comprehensive visual and operational layout custom-coded in Next.js or tailored WordPress systems.',
          features: [
            'Complete custom theme wiring (React/Next/WP)',
            'Advanced CMS editing permission panels',
            'On-Page structured Schema taxonomy',
            'Interactive animations styled by frame dynamics',
            '90 days continuous upkeep support'
          ],
          highlighted: false,
          ctaText: 'Initiate Discovery Call'
        }
      ];
      for (const tier of defaultPricings) {
        await setDoc(doc(db, 'pricing_tiers', tier.id), {
          ...tier,
          createdAt: serverTimestamp()
        });
      }
    }

    // 4. Seed Testimonials (Reviews)
    const testSnap = await getDocs(collection(db, 'testimonials'));
    if (testSnap.empty) {
      console.log('[Seeding Database] Bootstrapping testimonials...');
      for (let i = 0; i < TESTIMONIALS.length; i++) {
        const item = TESTIMONIALS[i];
        const id = `testimonial-${i + 1}`;
        await setDoc(doc(db, 'testimonials', id), {
          id,
          ...item,
          createdAt: serverTimestamp()
        });
      }
    }

    // 5. Seed FAQs
    const faqSnap = await getDocs(collection(db, 'faqs'));
    if (faqSnap.empty) {
      console.log('[Seeding Database] Bootstrapping faqs...');
      const defaultFaqs = [
        { id: 'faq-1', question: 'How is code speed measured?', answer: 'We align strictly with Googles Core Web Vitals, testing your paint speed (LCP) and interactive shifts (CLS) to guarantee Grade A speeds.' },
        { id: 'faq-2', question: 'Can we edit the layout myself later?', answer: 'Yes! We configure complete headless CMS editors or administrative panels that require absolutely zero tech or coding background.' },
        { id: 'faq-3', question: 'Do you help migrate existing domains?', answer: 'Absolutely. We manage domain transfers, server alignments, and schema redirects with zero database downtime.' }
      ];
      for (const faq of defaultFaqs) {
        await setDoc(doc(db, 'faqs', faq.id), {
          ...faq,
          createdAt: serverTimestamp()
        });
      }
    }

    // 6. Seed Calculator Options (Services available in the interactive calculator)
    const calcSnap = await getDocs(collection(db, 'calculator_options'));
    if (calcSnap.empty) {
      console.log('[Seeding Database] Bootstrapping calculator options...');
      const defaultCalculatorOptions = [
        { id: 'calc-s1', category: 'Platform Stack', name: 'Static Single Page (Next.js/React)', minPrice: 1200, maxPrice: 1800 },
        { id: 'calc-s2', category: 'Platform Stack', name: 'Custom Headless WordPress Engine', minPrice: 1800, maxPrice: 3200 },
        { id: 'calc-s3', category: 'Platform Stack', name: 'Webflow Dynamic Interactive System', minPrice: 1500, maxPrice: 2400 },
        { id: 'calc-s4', category: 'Feature Bundles', name: 'Technical SEO Optimization Plan', minPrice: 800, maxPrice: 1500 },
        { id: 'calc-s5', category: 'Feature Bundles', name: 'Interactive Pricing Estimator Tool', minPrice: 500, maxPrice: 900 },
        { id: 'calc-s6', category: 'Feature Bundles', name: 'Custom CRM API Webhook Setup', minPrice: 300, maxPrice: 600 },
        { id: 'calc-s7', category: 'Feature Bundles', name: 'Client Login / Secure Account Panel', minPrice: 1500, maxPrice: 3000 },
        { id: 'calc-s8', category: 'Care retainer', name: 'Monthly Security Firewalls retainer (1 Yr)', minPrice: 1200, maxPrice: 2400 },
        { id: 'calc-s9', category: 'Care retainer', name: 'Ongoing Content Updates Audit retainer', minPrice: 1000, maxPrice: 2000 }
      ];
      for (const opt of defaultCalculatorOptions) {
        await setDoc(doc(db, 'calculator_options', opt.id), {
          ...opt,
          createdAt: serverTimestamp()
        });
      }
    }

    // 7. Seed Social Links
    const socialSnap = await getDocs(collection(db, 'social_links'));
    if (socialSnap.empty) {
      console.log('[Seeding Database] Bootstrapping social_links...');
      const defaultSocials = [
        { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com/xenishio', iconName: 'Facebook' },
        { id: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/company/xenishio', iconName: 'Linkedin' },
        { id: 'twitter', platform: 'Twitter (X)', url: 'https://twitter.com/xenishio', iconName: 'Twitter' },
        { id: 'whatsapp', platform: 'WhatsApp Chat', url: 'https://wa.me/8801603539126', iconName: 'MessageSquare' }
      ];
      for (const s of defaultSocials) {
        await setDoc(doc(db, 'social_links', s.id), {
          ...s,
          createdAt: serverTimestamp()
        });
      }
    }

    // 8. Seed Default Settings custom singleton
    const settingSnap = await getDocs(collection(db, 'settings_custom'));
    if (settingSnap.empty) {
      console.log('[Seeding Database] Bootstrapping settings_custom...');
      await setDoc(doc(db, 'settings_custom', 'global'), {
        id: 'global',
        logoText: 'XENISHIO',
        logoUrl: '',
        googleTagsCode: '<!-- Google Tag ID placeholder -->',
        customHeadCode: '',
        customFootCode: '',
        facebookPixelCode: ''
      });
    }

    console.log('[Seeding Complete] Warm server-state bootstrapped successfully.');
  } catch (err) {
    console.error('[Seeding Error]', err);
  }
};

// Fire asynchronous background seed check
setTimeout(() => {
  if (isFirebaseActive) {
    seedDatabaseIfEmpty();
  }
}, 3000);


// ────────────────────────────────────────────────────────
// CLIENT READ-WRITE (CRUD) FETCHING ACTIONS
// ────────────────────────────────────────────────────────

// Generic list retrieval helper
export async function listDocuments(colName: string, defaultFallback: any[] = []): Promise<any[]> {
  if (!isFirebaseActive) {
    return getLocalStorageData(colName, defaultFallback);
  }
  try {
    const querySnapshot = await getDocs(collection(db, colName));
    if (querySnapshot.empty) {
      return defaultFallback;
    }
    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, colName);
    return defaultFallback;
  }
}

// Generic write helper (updates or inserts)
export async function writeDocument(colName: string, docId: string, data: any): Promise<void> {
  if (!isFirebaseActive) {
    const list = getLocalStorageData(colName, []);
    const index = list.findIndex((item: any) => item.id === docId || (item.slug && item.slug === docId));
    const mergedObj = { id: docId, ...data };
    if (index >= 0) {
      list[index] = mergedObj;
    } else {
      list.push(mergedObj);
    }
    setLocalStorageData(colName, list);
    window.dispatchEvent(new CustomEvent('xenishio-local-db-update')); // trigger state sync in components
    return;
  }
  try {
    await setDoc(doc(db, colName, docId), {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${colName}/${docId}`);
  }
}

export async function deleteDocument(colName: string, docId: string): Promise<void> {
  if (!isFirebaseActive) {
    const list = getLocalStorageData(colName, []);
    const filtered = list.filter((item: any) => item.id !== docId && (!item.slug || item.slug !== docId));
    setLocalStorageData(colName, filtered);
    window.dispatchEvent(new CustomEvent('xenishio-local-db-update'));
    return;
  }
  try {
    await deleteDoc(doc(db, colName, docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${colName}/${docId}`);
  }
}

// Custom Helpers for Submissions so propects can append
export async function addFormQuery(colName: string, data: any): Promise<void> {
  const id = `submission-${Date.now()}`;
  if (!isFirebaseActive) {
    const list = getLocalStorageData(colName, []);
    list.push({ id, ...data, createdAt: new Date().toISOString() });
    setLocalStorageData(colName, list);
    return;
  }
  try {
    await setDoc(doc(db, colName, id), {
      id,
      ...data,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${colName}/${id}`);
  }
}
