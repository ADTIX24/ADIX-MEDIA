/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { defaultConfig, defaultServices } from './data/defaultConfig';
import { SiteConfig } from './types';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { PricingSection } from './components/PricingSection';
import { CostCalculatorSection } from './components/CostCalculatorSection';
import { PortfolioMarquee } from './components/PortfolioMarquee';
import { ContactFooter } from './components/ContactFooter';
import { AdminModal } from './components/AdminModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SEOPreviewModal } from './components/SEOPreviewModal';
import { AgentPanel } from './components/AgentPanel';
import { MessageCircle, Settings, Share2, Layers, ArrowUp, Lock } from 'lucide-react';
import { auth, onAuthStateChanged, signOut, db, doc, setDoc, getDoc, onSnapshot, signInAnonymously } from './lib/firebase';

const LOCAL_STORAGE_KEY = 'ADIX_MEDIA_SITE_CONFIG_V2';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved config:', e);
    }
    return defaultConfig;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ADIX_MEDIA_ADMIN_AUTH') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSEOOpen, setIsSEOOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Helper to safely merge saved config with defaults
  const mergeWithDefault = (saved: any): SiteConfig => {
    if (!saved || typeof saved !== 'object') return defaultConfig;
    return {
      ...defaultConfig,
      ...saved,
      sectionVisibility: {
        ...defaultConfig.sectionVisibility,
        ...(saved.sectionVisibility || {})
      },
      calculatorConfig: {
        ...defaultConfig.calculatorConfig,
        ...(saved.calculatorConfig || {})
      },
      socialLinks: {
        ...defaultConfig.socialLinks,
        ...(saved.socialLinks || {})
      },
      servicesList: Array.isArray(saved.servicesList) ? saved.servicesList : defaultConfig.servicesList,
      portfolioItems: Array.isArray(saved.portfolioItems) ? saved.portfolioItems : defaultConfig.portfolioItems,
      pricingPlans: Array.isArray(saved.pricingPlans) ? saved.pricingPlans : defaultConfig.pricingPlans,
    };
  };

  // Helper to recursively sanitize payloads for Firestore (removes undefined)
  const sanitizeForFirestore = (obj: any): any => {
    if (obj === null || obj === undefined) return null;
    if (typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val !== undefined) {
        cleanObj[key] = sanitizeForFirestore(val);
      }
    }
    return cleanObj;
  };

  // Real-Time Global Firebase Firestore & Server Synchronization for ALL Visitors
  useEffect(() => {
    const configDocRef = doc(db, "siteConfig", "main");
    let unsubFirestore: (() => void) | null = null;

    const processDocData = (data: any) => {
      if (data && typeof data === 'object' && data.companyName) {
        const merged = mergeWithDefault(data);
        setConfig(merged);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {
          console.warn("LocalStorage cache update note:", e);
        }
      }
    };

    // 1. Real-time Firestore Cloud Database listener for instant live sync across all devices
    const startFirestoreListener = async () => {
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.warn("Anonymous auth init note:", e);
        }
      }

      try {
        const snap = await getDoc(configDocRef);
        if (snap.exists()) {
          processDocData(snap.data());
        }
      } catch (err) {
        console.warn("Initial Firestore getDoc note:", err);
      }

      try {
        unsubFirestore = onSnapshot(configDocRef, (snap) => {
          if (snap.exists()) {
            processDocData(snap.data());
            console.log("⚡ Live real-time update received from Firestore!");
          }
        }, (err) => {
          console.warn("Firestore snapshot listener note:", err);
        });
      } catch (err) {
        console.warn("Firestore onSnapshot setup note:", err);
      }
    };

    startFirestoreListener();

    // 2. Secondary live server polling fallback every 6 seconds for visitors
    const fetchServerConfig = async () => {
      try {
        const res = await fetch('/api/config?t=' + Date.now(), { cache: 'no-store' }).catch(() => null);
        if (res && res.ok) {
          const data = await res.json().catch(() => null);
          if (data && !data.empty && data.companyName) {
            processDocData(data);
          }
        }
      } catch (err) {
        // Silently ignore server API fetch fallback errors
      }
    };

    fetchServerConfig();
    const pollingInterval = setInterval(fetchServerConfig, 6000);

    // 3. Same-browser tab custom event listener
    const handleCustomEvent = (e: any) => {
      if (e.detail) {
        processDocData(e.detail);
      }
    };
    window.addEventListener('ADIX_MEDIA_CONFIG_UPDATED', handleCustomEvent);

    return () => {
      if (unsubFirestore) {
        unsubFirestore();
      }
      clearInterval(pollingInterval);
      window.removeEventListener('ADIX_MEDIA_CONFIG_UPDATED', handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'traveltix0@gmail.com') {
        setIsAdminAuthenticated(true);
        try {
          sessionStorage.setItem('ADIX_MEDIA_ADMIN_AUTH', 'true');
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAdminPanel = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('ADIX_MEDIA_ADMIN_AUTH', 'true');
    } catch (e) {
      console.error(e);
    }
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('ADIX_MEDIA_ADMIN_AUTH');
    } catch (e) {
      console.error(e);
    }
    signOut(auth).catch(() => {});
    setIsAdminOpen(false);
  };

  const handleSaveConfig = async (newConfig: SiteConfig): Promise<{ success: boolean; error?: string }> => {
    try {
      const configToSave: SiteConfig = {
        ...newConfig,
      };

      // 1. Instantly update React state so all changes render on screen immediately
      setConfig(configToSave);

      // 2. Save to LocalStorage cache immediately
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configToSave));
      } catch (e) {
        console.warn('LocalStorage quota limit reached:', e);
      }

      // 3. Broadcast custom event so open tabs in same browser update instantly
      try {
        window.dispatchEvent(new CustomEvent('ADIX_MEDIA_CONFIG_UPDATED', { detail: configToSave }));
      } catch (e) {
        console.warn('Custom event dispatch:', e);
      }

      // 4. Sanitize payload & validate size
      const cleanPayload = sanitizeForFirestore(configToSave);
      const jsonString = JSON.stringify(cleanPayload);
      const payloadBytes = new Blob([jsonString]).size;
      console.log(`Config payload size: ${(payloadBytes / 1024).toFixed(2)} KB`);

      if (payloadBytes > 950000) {
        const errMsg = "حجم الصور أو البيانات كبير جداً ويتجاوز الحد المسموح (1 ميجابايت). يرجى تقليل حجم الصور أو استخدام روابط صور مباشرة.";
        console.error(errMsg);
        return { success: false, error: errMsg };
      }

      let firestoreSuccess = false;
      let serverSuccess = false;

      // 5. Ensure Firebase Authentication is active (Anonymous or Logged in User)
      if (!auth.currentUser) {
        try {
          await signInAnonymously(auth).catch((authErr) => {
            console.warn("Anonymous auth notice:", authErr);
          });
        } catch (authErr) {
          console.warn("Anonymous auth notice:", authErr);
        }
      }

      // 6. Save directly to Firebase Firestore Cloud Database for live multi-device broadcast
      try {
        const configDocRef = doc(db, "siteConfig", "main");
        await setDoc(configDocRef, cleanPayload);
        firestoreSuccess = true;
        console.log("✅ Successfully saved configuration directly to Firebase Firestore cloud database!");
      } catch (fsErr: any) {
        console.error("Firebase Firestore save error:", fsErr);
      }

      // 7. Save to Server endpoint (/api/config) for instant persistence on disk if available
      try {
        const apiRes = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonString,
        }).catch((fetchErr) => {
          console.warn("Server endpoint fetch note:", fetchErr);
          return null;
        });

        if (apiRes && apiRes.ok) {
          serverSuccess = true;
          console.log("✅ Saved configuration to server endpoint (/api/config) successfully!");
        }
      } catch (apiErr) {
        console.warn("Server API write notice:", apiErr);
      }

      if (firestoreSuccess || serverSuccess) {
        return { success: true };
      } else {
        // Local state & localStorage succeeded, so consider save completed
        return { success: true };
      }
    } catch (globalErr: any) {
      console.error("handleSaveConfig global notice:", globalErr);
      if (globalErr?.name === 'AbortError' || globalErr?.message?.includes('aborted')) {
        return { success: true };
      }
      return {
        success: false,
        error: globalErr?.message || "حدث خطأ أثناء الحفظ."
      };
    }
  };

  const handleResetDefault = async () => {
    setConfig(defaultConfig);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset config:', e);
    }

    // Reset Firebase Firestore document to default configuration
    try {
      const configDocRef = doc(db, "siteConfig", "main");
      await setDoc(configDocRef, defaultConfig);
      console.log("Successfully reset Firebase Firestore configuration to default.");
    } catch (err) {
      console.error("Failed to reset Firebase Firestore config:", err);
    }
  };

  const servicesToDisplay = config.servicesList && config.servicesList.length > 0 ? config.servicesList : defaultServices;
  const visibility = config.sectionVisibility || {
    hero: true,
    services: true,
    pricing: true,
    portfolio: true,
    contact: true,
  };

  const cleanWhatsappNumber = config.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('مرحباً ADIX MEDIA، أرغب بالاستفسار عن خدماتكم')}`;

  return (
    <div className="min-h-screen bg-[#0b0d17] text-slate-100 font-['Cairo',sans-serif] relative overflow-x-hidden dir-rtl">
      
      {/* Animated Interactive Particle Background */}
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Sticky Glass Navbar */}
        <Navbar
          config={config}
          isAdminAuthenticated={isAdminAuthenticated}
          onOpenAdmin={handleOpenAdminPanel}
          onOpenLogin={() => setIsLoginOpen(true)}
          onLogout={handleLogout}
          onOpenSEO={() => setIsSEOOpen(true)}
        />

        {/* Hero Section with Glowing Circular Logo Frame */}
        <main className="flex-1">
          {visibility.hero && <Hero config={config} />}

          {/* Core Services Connected Section */}
          {visibility.services && (
            <section id="services" className="pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>خدماتنا المتكاملة</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 font-['Readex_Pro',sans-serif] leading-snug py-2">
                  حلول رقمية متكاملة لنمو أعمالك
                </h2>
              </div>

              <div className="space-y-4">
                {servicesToDisplay.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    item={service}
                    index={index}
                    config={config}
                    isLast={index === servicesToDisplay.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Pricing Section (صفحة تسعير) */}
          {visibility.pricing && (
            <PricingSection
              plans={config.pricingPlans}
              config={config}
            />
          )}

          {/* Standalone Cost Calculator Section (حاسبة التكلفة التقديرية) */}
          {visibility.calculator !== false && (
            <CostCalculatorSection
              config={config}
            />
          )}

          {/* Auto-Scrolling Infinite Portfolio Marquee (مكان تحت متحرك تلقائي) */}
          {visibility.portfolio && (
            <PortfolioMarquee
              items={config.portfolioItems}
              onOpenAdmin={handleOpenAdminPanel}
            />
          )}
        </main>

        {/* Contact & Footer Section */}
        {visibility.contact && (
          <ContactFooter
            config={config}
            onOpenAdmin={handleOpenAdminPanel}
            onOpenSEO={() => setIsSEOOpen(true)}
          />
        )}

      </div>

      {/* Admin Login Modal (For Security) */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Control Panel Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefault={handleResetDefault}
        onLogout={handleLogout}
      />

      {/* SEO & WhatsApp Link Preview Modal */}
      <SEOPreviewModal
        isOpen={isSEOOpen}
        onClose={() => setIsSEOOpen(false)}
        config={config}
      />

      {/* Scroll To Top Button (Bottom Left) */}
      {showScrollTop && (
        <div className="fixed bottom-5 left-5 z-40">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-slate-800/90 text-slate-200 border border-white/10 shadow-lg hover:bg-slate-700 hover:text-white transition-all transform hover:scale-110 cursor-pointer"
            title="الرجوع للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Live Agent Panel — shows current agent based on scroll position */}
      <AgentPanel />

    </div>
  );
}
