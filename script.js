// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .visual-card, .info-card, .text-block');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Add mobile-specific enhancements
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Enhanced mobile focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.3s ease';
            
            // Mobile haptic feedback simulation
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.style.borderColor = 'var(--primary-color)';
                input.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f6f4 100%)';
            } else {
                input.style.borderColor = '';
                input.style.background = '';
            }
        });
    });
    
    // Enhanced submit button effects
    submitBtn.addEventListener('mousedown', () => {
        submitBtn.style.transform = 'translateY(-2px) scale(0.98)';
    });
    
    submitBtn.addEventListener('mouseup', () => {
        submitBtn.style.transform = '';
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Enhanced loading animation
        submitBtn.innerHTML = '<span style="animation: spin 1s linear infinite;">⟳</span> Invio in corso...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #8B4332 0%, #A0503A 100%)';
        
        // Mobile haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
        
        // Add loading animation to form
        contactForm.style.opacity = '0.7';
        contactForm.style.pointerEvents = 'none';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('✅ Messaggio inviato con successo! Ti contatteremo presto.', 'success');
            
            // Reset form with animation
            this.reset();
            inputs.forEach(input => {
                input.style.borderColor = '';
                input.style.background = '';
            });
            
            // Reset button
            submitBtn.innerHTML = 'Messaggio Inviato ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.style.opacity = '';
                contactForm.style.pointerEvents = '';
            }, 2000);
            
        }, 2000);
    });
    
    // Add CSS for loading animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 12px;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax Effect for Hero Background Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const bgElements = document.querySelectorAll('.bg-circle, .bg-gradient');
    bgElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
});


// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-link {
            font-size: 1.2rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Add the mobile menu styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Enhanced Contact Us highlighting and attraction effects
document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    const contactSection = document.querySelector('#contact');
    let hasUserScrolledToContact = false;
    
    // Add special styling to Contact Us links
    contactLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        
        // Create pulsing effect
        const pulseInterval = setInterval(() => {
            if (!hasUserScrolledToContact) {
                link.style.animation = 'contactLinkPulse 1.5s ease-in-out';
                setTimeout(() => {
                    link.style.animation = '';
                }, 1500);
            } else {
                clearInterval(pulseInterval);
            }
        }, 3000);
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.fontWeight = '700';
            link.style.textShadow = '0 0 10px var(--primary-color)';
            
            // Mobile haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(30);
            }
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
            link.style.fontWeight = '';
            link.style.textShadow = '';
        });
        
        // Track when user clicks contact
        link.addEventListener('click', () => {
            hasUserScrolledToContact = true;
            
            // Add special scroll effect
            setTimeout(() => {
                contactSection.style.animation = 'contactSectionHighlight 2s ease-in-out';
                setTimeout(() => {
                    contactSection.style.animation = '';
                }, 2000);
            }, 500);
        });
    });
    
    // Intersection observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                hasUserScrolledToContact = true;
                
                // Trigger contact form highlight
                const form = entry.target.querySelector('.contact-form');
                if (form) {
                    form.style.animation = 'formAttention 2s ease-in-out';
                    setTimeout(() => {
                        form.style.animation = '';
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.3 });
    
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
    
    // Auto-highlight contact section after user spends time on page
    setTimeout(() => {
        if (!hasUserScrolledToContact) {
            // Subtle bounce animation on Contact Us links
            contactLinks.forEach(link => {
                link.style.animation = 'contactLinkBounce 1s ease-in-out 3';
            });
        }
    }, 10000); // After 10 seconds on page
});

// Add contact-specific CSS animations
const contactAnimationsCSS = `
    @keyframes contactLinkPulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(160, 80, 58, 0.4);
            transform: scale(1);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(160, 80, 58, 0);
            transform: scale(1.05);
        }
    }
    
    @keyframes contactLinkBounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    
    @keyframes contactSectionHighlight {
        0%, 100% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.1);
        }
    }
    
    @keyframes formAttention {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(160, 80, 58, 0.1);
        }
        25% {
            transform: scale(1.02) rotate(1deg);
            box-shadow: 0 15px 40px rgba(160, 80, 58, 0.2);
        }
        75% {
            transform: scale(1.02) rotate(-1deg);
            box-shadow: 0 15px 40px rgba(160, 80, 58, 0.2);
        }
    }
    
    /* Mobile-specific contact link styling */
    @media (max-width: 768px) {
        .nav-link[href="#contact"] {
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700 !important;
            animation: mobileContactGlow 3s ease-in-out infinite;
        }
        
        @keyframes mobileContactGlow {
            0%, 100% {
                filter: drop-shadow(0 0 2px var(--primary-color));
            }
            50% {
                filter: drop-shadow(0 0 8px var(--primary-color));
            }
        }
        
        .btn-outline[href="#contact"] {
            animation: mobileContactButtonPulse 2s ease-in-out infinite;
            border-width: 3px !important;
        }
        
        @keyframes mobileContactButtonPulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(160, 80, 58, 0.3);
            }
            50% {
                transform: scale(1.03);
                box-shadow: 0 0 0 8px rgba(160, 80, 58, 0);
            }
        }
    }
`;

const contactStyleElement = document.createElement('style');
contactStyleElement.textContent = contactAnimationsCSS;
document.head.appendChild(contactStyleElement);

// Service Cards Hover Effect Enhancement
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add slight rotation and scale effect
            card.style.transform = 'translateY(-8px) scale(1.02) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.card-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-us');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});