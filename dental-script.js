// Dental Clinic Template - Animations & Interactivity
// Scroll Reveal, Form Handling, 3D Effects

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== SCROLL REVEAL ANIMATION =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle data-delay attributes
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal, [data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // ===== FLATPICKR DATEPICKER FOR APPOINTMENTS =====
    flatpickr("#appointmentDate", {
        allowInput: true,
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date().fp_increaseDays(21),
        enable: [
            // Disable weekends for dental appointments
            function(date) {
                return date.getDay() !== 0 && date.getDay() !== 6;
            }
        ],
        onOpen: function(selectedDates, dateStr, instance) {
            instance.calendar.container.style.transform = 'translateY(0)';
            instance.calendar.container.style.opacity = '1';
        },
        onDayTap: function(selDates, dayStr, instance) {
            const date = selDates[0];
            const day = date.getDay();
            
            // Show available time slots based on day
            const timeSlots = {
                1: ['09:00', '11:00', '14:00', '16:00'], // Monday
                2: ['09:30', '11:30', '14:30', '16:30'], // Tuesday
                3: ['10:00', '12:00', '15:00', '17:00'], // Wednesday
                4: ['09:00', '11:00', '14:00', '16:00'], // Thursday
                5: ['09:30', '12:30', '15:30'] // Friday
            };
        }
    });

    // ===== FORM SUBMISSION HANDLING =====
    const bookingForm = document.getElementById('bookingForm');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const bookingSuccess = document.getElementById('bookingSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            // Form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                bookingForm.style.display = 'none';
                bookingSuccess.style.display = 'block';
                
                // In production, send to backend:
                // const response = await fetch('/api/book-appointment', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });
                
            } catch (error) {
                console.error('Booking error:', error);
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                alert('حدث خطأ أثناء حجز الموعقد. يرجى المحاولة لاحقاً.');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ===== COUNTUP ANIMATION FOR STATS =====
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const counterOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const updateCount = () => {
                    count += increment;
                    entry.target.textContent = Math.ceil(count);
                    
                    if (count < target) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, counterOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== PARALLAX SCROLL EFFECT FOR HERO =====
    let hero = document.querySelector('.hero');
    let heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        if (hero) {
            const scrollY = window.scrollY;
            const heroBg = document.querySelector('.hero-bg');
            
            if (heroBg) {
                heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        }
    });

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== SECTION IN VIEW ANIMATION CLASSES =====
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove class when not visible for re-animation
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== MICRO INTERACTIONS =====
    
    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card interaction
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        });
    });

    // Gallery item interaction
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            // Optional: Open modal with larger image
            const imgSrc = this.querySelector('img').src;
            // In production, open lightbox modal
            console.log(' clicked gallery item:', imgSrc);
        });
    });

    // ===== LOADING SPINNER FOR FORM =====
    function showLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner">⏳</span> جاري الإرسال...';
        button.disabled = true;
        return originalText;
    }

    function hideLoading(button, originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
    }

    // ===== ERROR HANDLING FOR FORM ===
    function showFormError(message) {
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--danger); 
                        background: 'rgba(239, 68, 68, 0.1)'; padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
                <span>⚠️</span>
                <span>${message}</span>
            </div>
        `;
        
        const firstFormGroup = bookingForm.querySelector('.form-group');
        firstFormGroup.parentNode.insertBefore(errorDiv, firstFormGroup);
    }

    // ===== UTILITY FUNCTIONS ===
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce function for search inputs
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // ===== INITIAL ANIMATION CHECK ===
    // Check for elements in viewport on load
    window.addEventListener('load', function() {
        document.querySelectorAll('.reveal, [data-reveal]').forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    });

    // ===== PERFORMANCE OPTIMIZATION ===
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations
                ticking = false;
            });
            ticking = true;
        }
    });

});

// ===== GLOBAL HELPER FUNCTIONS =====

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// Validate phone number (Jordan format)
function validatePhone(phone) {
    const regex = /^(095|079|078|077|076)\d{7}$/;
    return regex.test(phone);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style);