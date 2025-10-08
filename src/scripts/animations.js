// ===== LOADING ANIMATIONS SCRIPT =====

// Page Loader
window.addEventListener('load', function() {
    const pageLoader = document.getElementById('pageLoader');
    const loadingBar = document.getElementById('loadingBar');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingBar.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                pageLoader.classList.add('fade-out');
                loadingBar.style.width = '0%';
                
                // Start animations after page loads
                setTimeout(() => {
                    initScrollAnimations();
                    initStaggerAnimations();
                }, 500);
            }, 300);
        }
    }, 50);
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add typing effect to hero title
                if (entry.target.classList.contains('hero-title')) {
                    const span = entry.target.querySelector('.highlight');
                    if (span && !span.classList.contains('typing-text')) {
                        span.classList.add('typing-text');
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll(
        '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .scale-in'
    );
    
    animationElements.forEach(el => observer.observe(el));
}

// Stagger animations for skill items
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-item');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target.closest('.skills-grid');
                if (container) {
                    const items = container.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100); // 100ms delay between each item
                    });
                }
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (staggerElements.length > 0) {
        staggerObserver.observe(staggerElements[0]); // Observe first item to trigger all
    }
}

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced navbar scroll effect with smooth blending
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    
    // Calculate scroll progress through hero section
    const scrollProgress = Math.min(scrollY / (heroHeight * 0.3), 1); // Start transition at 30% of hero height
    
    // Remove all scroll classes first
    navbar.classList.remove('scrolled', 'scrolling');
    
    if (scrollY < 20) {
        // Completely transparent at the top
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'blur(0px)';
        navbar.style.borderBottom = '1px solid transparent';
    } else if (scrollY < 100) {
        // Gradual transition
        navbar.classList.add('scrolling');
        const opacity = scrollProgress * 0.7;
        const blur = scrollProgress * 8;
        navbar.style.background = `rgba(10, 14, 39, ${opacity})`;
        navbar.style.backdropFilter = `blur(${blur}px)`;
        navbar.style.borderBottom = `1px solid rgba(255, 71, 87, ${opacity * 0.1})`;
    } else {
        // Fully opaque when scrolled
        navbar.classList.add('scrolled');
        navbar.style.background = '';
        navbar.style.backdropFilter = '';
        navbar.style.borderBottom = '';
    }
    
    // Add dynamic color shifting based on scroll position
    const hueShift = Math.min(scrollY * 0.1, 30);
    if (scrollY > 0) {
        navbar.style.filter = `hue-rotate(${hueShift}deg)`;
    } else {
        navbar.style.filter = '';
    }
});

// Add scroll reveal animation to sections
function addScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll reveal to sections
    addScrollReveal();
    
    // Add floating animation to floating elements
    const floatingElements = document.querySelectorAll('.floating-item');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Preload important resources
function preloadResources() {
    const links = [
        'src/styles/main.css',
        'src/styles/responsive.css'
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Call preload function
preloadResources();

// ===== CV DOWNLOAD FUNCTION =====
function downloadCV() {
    // You can replace this with an actual CV file path
    const cvUrl = 'assets/cv/Rith_Seyhak_CV.pdf'; // Update this path to your actual CV
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Rith_Seyhak_CV.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show a message or analytics tracking
    console.log('CV download initiated');
}

// Make function globally available
window.downloadCV = downloadCV;

// ===== ACTIVE NAVBAR SECTION DETECTION =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const scrollPosition = window.scrollY + navbarHeight + 50; // Better offset calculation
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // If no section detected and we're at the top, default to home
    if (!currentSection && window.scrollY < 100) {
        currentSection = 'home';
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Throttle function for better performance
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
    }
}

// Initialize navbar active state detection
function initActiveNavbar() {
    // Update on scroll with throttling for better performance
    const throttledUpdate = throttle(updateActiveNavLink, 100);
    window.addEventListener('scroll', throttledUpdate);
    
    // Update on page load
    setTimeout(updateActiveNavLink, 100); // Small delay to ensure everything is loaded
    
    // Update when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the smooth scroll happen first, then update after a delay
            setTimeout(() => {
                updateActiveNavLink();
            }, 100);
        });
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initActiveNavbar();
    initMobileNavigation();
});

// ===== MOBILE NAVIGATION BACKUP =====
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
    constructor() {
        this.typingElement = document.getElementById('typingText');
        this.typingTexts = [
            'Software Engineer',
            'UX/UI Developer', 
            'Web Developer',
            'Frontend Developer',
            'Backend Developer'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseAfterComplete = 2000;
        
        this.init();
    }
    
    init() {
        if (!this.typingElement) return;
        
        // Start the typing animation after a short delay
        setTimeout(() => {
            this.typeText();
        }, 1000);
    }
    
    typeText() {
        if (!this.typingElement) return;

        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Remove characters
            this.typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                setTimeout(() => this.typeText(), 500); // Pause before typing next word
                return;
            }
            
            setTimeout(() => this.typeText(), this.deletingSpeed);
        } else {
            // Add characters
            this.typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.typeText(), this.pauseAfterComplete);
                return;
            }
            
            setTimeout(() => this.typeText(), this.typingSpeed);
        }
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new TypingAnimation();
});