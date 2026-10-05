// Adix Media — DeveloperAgent
// GSAP + Agent Interaction System
// Scroll-based animations + Hover effects + Live Agent panel

let gsap; // will be loaded dynamically

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic GSAP loader from CDN
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js';
    gsapScript.onload = () => { gsap = window.gsap; initGSAP(); };
    document.head.appendChild(gsapScript);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileBtn.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileBtn.classList.remove('active');
            });
        });
    }

    // Scroll animation via Intersection Observer
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => {
        io.observe(el);
    });

    // Counter animation
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count').forEach(c => counterObs.observe(c));

    // Fallback for counters
    setTimeout(() => {
        document.querySelectorAll('.count').forEach(c => {
            if (c.textContent === '0' || c.textContent === '') {
                animateCounter(c, parseInt(c.getAttribute('data-target')));
                counterObs.unobserve(c);
            }
        });
    }, 3000);

    function animateCounter(element, target) {
        const duration = 2000;
        const start = performance.now();
        function update(time) {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = Math.floor(ease * target);
            if (target >= 1000) element.textContent = (val / 1000).toFixed(1) + 'K+';
            else if (target >= 100) element.textContent = val + '+';
            else element.textContent = val + (target === 98 ? '%' : '+');
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Parallax
    window.addEventListener('scroll', () => {
        const s = window.pageYOffset;
        document.querySelectorAll('.hero-grad, .contact-bg, .hero-particles').forEach(el => {
            el.style.transform = 'translate3d(0, ' + (-s * 0.3) + 'px, 0)';
        });
    });

    // Button hover micro-interaction
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
    });

    // ═══════════════════════════════════════════════════════════════════
    // AGENT INTERACTION SYSTEM
    // Shows current agent based on scroll position
    // ═══════════════════════════════════════════════════════════════════

    const agents = {
        scout:     { name: 'الرصد',       role: 'بحث فرص وعملاء محتملين',     emoji: '🔍',  color: '#FFA500' },
        analyst:   { name: 'التحليل',     role: 'تحليل البيانات والأداء',      emoji: '📊',  color: '#3B82F6' },
        sales:     { name: 'المبيعات',    role: 'جمع العملاء وإغلاق الصفقات',  emoji: '💼',  color: '#10B981' },
        developer: { name: 'التنفيذ',    role: 'تطوير المواقع والتفاعيل',     emoji: '👨‍💻', color: '#8B5CF6' },
        marketer:  { name: 'التسويق',    role: 'حملات إعلانية وتوظيف جمهور',   emoji: '📢',  color: '#EF4444' },
        content:   { name: 'المحتوى',    role: 'إبداع المحتوى والسيو',        emoji: '✍️',  color: '#06B6D3' }
    };

    function createAgentPanel() {
        const p = document.createElement('div');
        p.id = 'agent-panel';
        p.className = 'agent-panel hidden';
        p.innerHTML = '<div class="agent-content"><div class="agent-icon" id="agent-icon"></div><div class="agent-info"><div class="agent-name" id="agent-name"></div><div class="agent-role" id="agent-role"></div></div></div>';
        document.body.appendChild(p);
    }

    let currentAgent = null;
    createAgentPanel();

    function checkAgentVisibility() {
        const sections = [
            { id: 'home',     agent: 'developer' },
            { id: 'services', agent: 'marketer'  },
            { id: 'showcase', agent: 'developer' },
            { id: 'results',  agent: 'analyst'   },
            { id: 'process',  agent: 'sales'     },
            { id: 'pricing',  agent: 'sales'     },
            { id: 'contact',  agent: 'marketer'  }
        ];
        const trigger = window.innerHeight * 0.45;
        let active = null;
        for (const s of sections) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top < trigger && rect.bottom > 100) { active = s; break; }
        }
        if (active) showAgent(active.agent);
        else hideAgent();
    }

    function showAgent(key) {
        if (currentAgent === key) return;
        currentAgent = key;
        const d = agents[key];
        const p = document.getElementById('agent-panel');
        if (!p) return;
        const ic = p.querySelector('#agent-icon');
        ic.innerHTML = d.emoji;
        ic.style.background = 'radial-gradient(circle at 30% 30%, ' + d.color + '33, transparent 70%)';
        ic.style.border = '2px solid ' + d.color;
        p.querySelector('#agent-name').textContent = d.name;
        p.querySelector('#agent-role').textContent = d.role;
        p.classList.add('visible');
        p.classList.remove('hidden');
    }

    function hideAgent() {
        if (currentAgent === null) return;
        currentAgent = null;
        const p = document.getElementById('agent-panel');
        if (p) { p.classList.remove('visible'); p.classList.add('hidden'); }
    }

    // Throttled scroll listener with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { checkAgentVisibility(); ticking = false; });
            ticking = true;
        }
    });
    checkAgentVisibility();

    // ═══════════════════════════════════════════════════════════════════
    // GSAP ENHANCED ANIMATIONS
    // ═══════════════════════════════════════════════════════════════════

    function initGSAP() {
        if (!gsap) return;

        // Entry animations
        gsap.from('.nav-logo', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
        gsap.from('.hero-title .title-line', { y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.3 });
        gsap.from('.hero-actions .btn', { scale: 0, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.6 });

        // Scroll-trigger animations for all [data-animate] elements
        gsap.utils.querySelectorAll('[data-animate]').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play,reverse,play,reverse' },
                y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.05
            });
        });

        // Floating particles loop
        gsap.to('.hero-particles', { y: -50, duration: 20, ease: 'none', repeat: -1, yoyo: true });

        // Logo dot rotation on scroll
        gsap.timeline({ scrollTrigger: { trigger: '.nav-logo', start: 'top 80%', end: 'top 50%', scrub: true } })
            .to('.logo-dot', { rotation: 360, scale: 1.2, ease: 'power2.out' }, 0);
    }

    console.log('ADIX MEDIA animations initialized');
});
