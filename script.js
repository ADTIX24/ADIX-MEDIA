// Adix Media — أحمد الرقمي
// أنيميشنات التمرير وتعداد الأرقام

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ── Mobile menu toggle ──
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ── Animations on scroll (Intersection Observer) ──
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add initial hidden state to sections
    const animateElements = document.querySelectorAll(
        '.service-card, .results-number, .testimonial-card, .work-card, .process-step'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ── Hide loader on load ──
    const loader = document.getElementById('loader');
    if (loader) {
        // Ensure loader hides even if observers don't trigger
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 300);
    }

    // ── Counter animation ──
    const counters = document.querySelectorAll('.count');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Fallback: start counters if IntersectionObserver doesn't trigger after 3s
    setTimeout(() => {
        counters.forEach(counter => {
            if (counter.textContent === '0' || counter.textContent === '') {
                const target = parseInt(counter.getAttribute('data-target'));
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, 3000);

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out qubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else if (target >= 100) {
                element.textContent = current + '+';
            } else {
                element.textContent = current + (target === 98 ? '%' : '+');
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // ── Smooth anchor scrolling ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ── Parallax Background Effect ──
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-grad, .contact-bg, .hero-particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // ── Button hover effects ──
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ── Service card hover effects ──
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-accent)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-border)';
        });
    });

    console.log('ADIX MEDIA animations initialized');
});
