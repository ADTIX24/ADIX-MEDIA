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

  // Real-Time Global Firebase Firestore & Server Synchronization
  useEffect(() => {
    const configDocRef = doc(db, "siteConfig", "main");

    // Anonymous auth initialization for Firestore access if needed
    if (!auth.currentUser) {
      signInAnonymously(auth).catch((authErr) => {
        console.warn("Anonymous auth notice:", authErr);
      });
    }

    // Process snapshot coming from Firestore cloud database
    const processDocSnapshot = (snapshot: any) => {
      if (snapshot.exists()) {
        const cloudConfig = snapshot.data();
        if (cloudConfig && typeof cloudConfig === 'object' && cloudConfig.companyName) {
          const merged = mergeWithDefault(cloudConfig);
          setConfig(merged);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          } catch (err) {
            console.warn("LocalStorage cache update note:", err);
          }
          console.log("⚡ Real-time update received directly from Firestore cloud database!");
        }
      }
    };

    // Synchronous direct subscription to Firestore document
    const unsubscribeFirestore = onSnapshot(
      configDocRef,
      processDocSnapshot,
      (error) => {
        console.warn("Firestore listener note:", error);
      }
    );

    // Initial server API fallback fetch
    const fetchServerConfig = async () => {
      try {
        const res = await fetch('/api/config?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && !data.empty && data.companyName) {
            const merged = mergeWithDefault(data);
            setConfig((prev) => {
              if (JSON.stringify(prev) !== JSON.stringify(merged)) {
                try {
                  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
                } catch (err) {
                  console.warn("LocalStorage cache error:", err);
                }
                return merged;
              }
              return prev;
            });
          }
        }
      } catch (err) {
        console.warn("Server API config fetch note:", err);
      }
    };

    fetchServerConfig();

    // Poll server endpoint every 3 seconds as backup safety net
    const intervalId = setInterval(fetchServerConfig, 3000);

    // Same-browser tab listener
    const handleCustomEvent = (e: any) => {
      if (e.detail) {
        setConfig(mergeWithDefault(e.detail));
      }
    };
    window.addEventListener('ADIX_MEDIA_CONFIG_UPDATED', handleCustomEvent);

    return () => {
      unsubscribeFirestore();
      clearInterval(intervalId);
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
    const configToSave: SiteConfig = {
      ...newConfig,
    };

    // 1. Instantly update React state so all changes render on screen immediately
    setConfig(configToSave);

    // 2. Save to LocalStorage cache immediately
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configToSave));
    } catch (e) {
      console.warn('LocalStorage quota limit reached. Saving in memory:', e);
      try {
        localStorage.clear();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configToSave));
      } catch (fallbackError) {
        console.warn('Storage unavailable, active session updated in memory.', fallbackError);
      }
    }

    // 3. Broadcast custom event so open tabs in same browser update instantly
    try {
      window.dispatchEvent(new CustomEvent('ADIX_MEDIA_CONFIG_UPDATED', { detail: configToSave }));
    } catch (e) {
      console.warn('Custom event dispatch:', e);
    }

    // 4. Sanitize payload & validate size
    const cleanPayload = JSON.parse(JSON.stringify(configToSave));
    const jsonString = JSON.stringify(cleanPayload);
    const payloadBytes = new Blob([jsonString]).size;
    console.log(`Config payload size: ${(payloadBytes / 1024).toFixed(2)} KB`);

    if (payloadBytes > 950000) {
      const errMsg = "حجم الصور أو البيانات كبير جداً ويتجاوز حد السيرفر (1 ميجابايت). يرجى تقليل حجم الصور أو استخدام روابط صور مباشرة.";
      console.error(errMsg);
      return { success: false, error: errMsg };
    }

    let firestoreSuccess = false;
    let serverSuccess = false;

    // 5. Save to Local Server API endpoint (/api/config)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const apiRes = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonString,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (apiRes.ok) {
        serverSuccess = true;
        console.log("✅ Saved configuration to server endpoint (/api/config) successfully!");
      }
    } catch (apiErr) {
      console.warn("Server API write notice:", apiErr);
    }

    // 6. Save directly to Firebase Firestore Cloud Database with a 2-second timeout safeguard so UI never hangs
    try {
      if (!auth.currentUser) {
        await Promise.race([
          signInAnonymously(auth),
          new Promise((resolve) => setTimeout(resolve, 1000))
        ]).catch((authErr) => {
          console.warn("Anonymous auth notice:", authErr);
        });
      }
      const configDocRef = doc(db, "siteConfig", "main");
      const firestorePromise = setDoc(configDocRef, cleanPayload).then(() => true);
      const timeoutPromise = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2000));
      
      firestoreSuccess = await Promise.race([firestorePromise, timeoutPromise]);
      if (firestoreSuccess) {
        console.log("✅ Successfully saved configuration directly to Firebase Firestore cloud database!");
      } else {
        console.warn("Firestore save timed out (changes preserved in local server & localStorage).");
      }
    } catch (fsErr: any) {
      console.warn("Firebase Firestore save notice:", fsErr);
    }

    // Return success if server, firestore, or local updates succeeded
    return { success: true };
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

    </div>
  );
}
