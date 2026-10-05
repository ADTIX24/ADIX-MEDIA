import React, { useEffect, useState, useRef } from 'react';

interface Agent {
  key: string;
  name: string;
  role: string;
  emoji: string;
  color: string;
}

const agents: Agent[] = [
  { key: 'hero',        name: 'التنفيذ',   role: 'بناء الواجهة والتفاعيل',   emoji: '👨‍💻', color: '#8B5CF6' },
  { key: 'services',    name: 'التسويق',   role: 'تقديم الحلول الرقمية',     emoji: '📢', color: '#EF4444' },
  { key: 'showcase',    name: 'التنفيذ',   role: 'عرض أعمالنا المتميزة',     emoji: '👨‍💻', color: '#8B5CF6' },
  { key: 'results',     name: 'التحليل',   role: 'إحصائيات وأداء حقيقي',      emoji: '📊', color: '#3B82F6' },
  { key: 'process',     name: 'المبيعات',  role: 'دليل العملية البسيطة',     emoji: '💼', color: '#10B981' },
  { key: 'pricing',     name: 'المبيعات',  role: 'الباقات المرنة',           emoji: '💼', color: '#10B981' },
  { key: 'calculator',  name: 'التسويق',   role: 'حساب التكلفة المقدرة',      emoji: '📢', color: '#EF4444' },
  { key: 'portfolio',   name: 'المحتوى',   role: 'أعمال منتجة',              emoji: '✍️', color: '#06B6D3' },
  { key: 'contact',     name: 'التسويق',   role: 'التواصل والدعم',          emoji: '📢', color: '#EF4444' },
];

declare global {
  interface Window {
    gsap?: any;
  }
}

export const AgentPanel: React.FC = () => {
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Load GSAP from CDN
  useEffect(() => {
    if (window.gsap) {
      setGsapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js';
    script.async = true;
    script.onload = () => setGsapLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const trigger = window.innerHeight * 0.45;
      let active: Agent | null = null;

      // Check sections by ID first
      const sectionMap: [string, string][] = [
        ['services', 'services'],
        ['pricing', 'pricing'],
        ['contact', 'contact'],
      ];

      for (const [id, agentKey] of sectionMap) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < trigger && rect.bottom > 100) {
            active = agents.find(a => a.key === agentKey) || null;
            break;
          }
        }
      }

      // Fallback: position-based detection
      if (!active) {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        if (scrollY < vh * 0.8) active = agents.find(a => a.key === 'hero')!;
        else if (scrollY < vh * 1.5) active = agents.find(a => a.key === 'services')!;
        else if (scrollY < vh * 2.5) active = agents.find(a => a.key === 'showcase')!;
        else if (scrollY < vh * 3.5) active = agents.find(a => a.key === 'results')!;
        else if (scrollY < vh * 4.5) active = agents.find(a => a.key === 'process')!;
        else if (scrollY < vh * 6) active = agents.find(a => a.key === 'pricing')!;
        else if (scrollY < vh * 7.5) active = agents.find(a => a.key === 'calculator')!;
        else if (scrollY < vh * 9) active = agents.find(a => a.key === 'portfolio')!;
        else active = agents.find(a => a.key === 'contact')!;
      }

      setCurrentAgent(active);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP animations when agent changes
  useEffect(() => {
    if (!currentAgent || !gsapLoaded || !window.gsap) return;

    const gsap = window.gsap as any;
    const panel = panelRef.current;
    const icon = iconRef.current;

    if (panel) {
      // Enter animation
      gsap.fromTo(panel,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'cubicBezier(0.16, 1, 0.3, 1)' }
      );
    }

    if (icon) {
      // Pulse icon on agent change
      gsap.fromTo(icon,
        { scale: 0.7, opacity: 0.5 },
        { scale: 1.1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentAgent, gsapLoaded]);

  // Hide panel animation when no agent
  useEffect(() => {
    if (!currentAgent && gsapLoaded && window.gsap) {
      const panel = panelRef.current;
      if (panel) {
        window.gsap.to(panel, { opacity: 0, y: 40, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [currentAgent, gsapLoaded]);

  if (!currentAgent) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 
                 bg-slate-900/85 backdrop-blur-xl border border-white/10 rounded-full 
                 shadow-xl shadow-black/40 transition-all duration-300"
    >
      <div
        ref={iconRef}
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${currentAgent.color}33, transparent 70%)`,
          borderColor: currentAgent.color,
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
      >
        {currentAgent.emoji}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-100 leading-tight">
          {currentAgent.name}
        </span>
        <span className="text-xs text-slate-400 leading-tight">
          {currentAgent.role}
        </span>
      </div>
    </div>
  );
};
