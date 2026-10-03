/* ===== ADIX MEDIA - Restaurant Theme JS ===== */

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Smooth Scroll & Animation on Scroll
const animateElements = document.querySelectorAll('[data-animate]');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});

// Counter Animation
const counters = document.querySelectorAll('[data-counter]');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-counter');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    updateCounter();
});

// WhatsApp Order Button
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        let phone = this.href.split('wa.me/')[1];
        let message = '';
        
        // Customize message based on page section
        if (link.closest('#contact')) {
            message = "مرحباً، أرغب في الطلب من مطعم الشرك. ممكن المساعدة؟";
        } else if (link.closest('#menu')) {
            message = "أرغب بطلب من القائمة، ممكن المساعدة؟";
        }
        
        this.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    });
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(11, 13, 23, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(11, 13, 23, 0.85)';
        }
    });
}
