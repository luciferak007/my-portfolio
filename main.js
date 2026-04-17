// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile nav if open (for future mobile menu)
            document.body.style.overflow = 'auto';
        }
    });
});

// Intersection Observer for scroll reveal effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect - hide/show on scroll
let lastScrollTop = 0;
const nav = document.querySelector('nav');
const scrollSensitivity = 50;

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop + scrollSensitivity) {
        // Scrolling down - could add effect
    } else if (currentScroll < lastScrollTop - scrollSensitivity) {
        // Scrolling up
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Add animation to hero content on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Stagger animation for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Stagger animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Parallax effect for hero background
const heroImageBg = document.querySelector('.hero-image-bg');
if (heroImageBg) {
    window.addEventListener('mousemove', (e) => {
        const rect = document.querySelector('.hero').getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            heroImageBg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Add hover effect to interactive elements
document.querySelectorAll('.btn, .tech-tag, .skill-card, .project-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Typing effect for code block (optional enhancement)
const codeBlock = document.querySelector('code');
if (codeBlock) {
    const originalText = codeBlock.textContent;
    codeBlock.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function typeText() {
        if (index < originalText.length) {
            codeBlock.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        }
    }
    
    // Start typing after page loads
    window.addEventListener('load', () => {
        typeText();
    });
}

// Form validation helper (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll spy for navbar (highlight active section)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottomColor = '';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00d2ff';
        }
    });
});

// Dynamic particle effect (optional - light version)
function createParticles() {
    const particleCount = 5;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.3
        };
        particles.push(particle);
    }
    
    return particles;
}

// Initialize particles on load
let particles = createParticles();

// Prevent layout shift
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overscrollBehavior = 'none';
});

// Add visual feedback on button click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ripple effect (optional)
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Accessibility: Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('✨ Akash\'s Portfolio - Loading complete! ✨');
