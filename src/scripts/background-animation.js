// ===== INTERACTIVE ANIMATED BACKGROUND =====

class BackgroundAnimation {
    constructor() {
        this.init();
        this.checkPerformance();
        this.createParticles();
        this.addMouseInteraction();
        this.addScrollEffects();
    }

    checkPerformance() {
        // Detect device performance and adjust accordingly
        this.isLowPerformance = window.innerWidth < 768 || 
                               (window.navigator && window.navigator.hardwareConcurrency && window.navigator.hardwareConcurrency < 4);
        
        // Reduce animations on low-performance devices
        if (this.isLowPerformance) {
            this.particleCount = 8;
            this.animationSpeed = 0.5;
        } else {
            this.particleCount = 15;
            this.animationSpeed = 1;
        }
    }

    init() {
        this.hero = document.querySelector('.hero');
        this.animatedBgs = document.querySelectorAll('.animated-bg');
        this.sections = document.querySelectorAll('section[class]');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.particleCount = window.innerWidth < 768 ? 8 : 15;
        this.animationSpeed = window.innerWidth < 768 ? 0.5 : 1;
    }

    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'floating-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Create floating particles
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const opacity = Math.random() * 0.5 + 0.1;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.5 ? '#ff4757' : '#3742fa'};
                border-radius: 50%;
                opacity: ${opacity};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${duration}s linear infinite;
                animation-delay: ${delay}s;
            `;
            
            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }

        // Add particles to all animated backgrounds
        this.animatedBgs.forEach(bg => {
            const clonedContainer = particleContainer.cloneNode(true);
            bg.appendChild(clonedContainer);
        });
        
        this.addParticleAnimation();
    }

    addParticleAnimation() {
        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100px) translateX(100px) rotate(360deg);
                    opacity: 0;
                }
            }

            .particle:hover {
                animation-play-state: paused;
                transform: scale(2);
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    addMouseInteraction() {
        let mouseMoveTimeout;
        let lastMouseParticle = 0;
        
        // Add mouse interaction to all sections
        this.sections.forEach(section => {
            section.addEventListener('mousemove', (e) => {
                this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                
                // Throttle parallax updates for performance
                clearTimeout(mouseMoveTimeout);
                mouseMoveTimeout = setTimeout(() => {
                    this.updateParallax(section);
                }, 16); // ~60fps
                
                // Limit mouse particle creation
                const now = Date.now();
                if (now - lastMouseParticle > 100) { // Max 10 particles per second
                    this.createMouseParticle(e.clientX, e.clientY);
                    lastMouseParticle = now;
                }
            });

            section.addEventListener('mouseleave', () => {
                this.resetParallax(section);
            });
        });
    }

    updateParallax(section = null) {
        const targetSection = section || document;
        const codeElements = targetSection.querySelectorAll('.code-element');
        const geoShapes = targetSection.querySelectorAll('.geo-shape');
        const animatedBg = targetSection.querySelector('.animated-bg');
        
        // Dynamic color shifting based on mouse position
        if (animatedBg) {
            const hue = Math.abs(this.mouseX) * 180 + Math.abs(this.mouseY) * 180;
            animatedBg.style.filter = `hue-rotate(${hue * 0.1}deg)`;
        }
        
        codeElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = this.mouseX * speed * 10;
            const y = this.mouseY * speed * 10;
            element.style.transform = `translate(${x}px, ${y}px) rotate(${this.mouseX * 10}deg)`;
            
            // Subtle color shift
            element.style.filter = `brightness(${1 + Math.abs(this.mouseX) * 0.3})`;
        });

        geoShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            const x = this.mouseX * speed * 15;
            const y = this.mouseY * speed * 15;
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${this.mouseX * 20}deg) scale(${1 + Math.abs(this.mouseX) * 0.1})`;
            
            // Dynamic opacity based on interaction
            shape.style.opacity = 0.1 + Math.abs(this.mouseX + this.mouseY) * 0.1;
        });
    }

    resetParallax(section = null) {
        const targetSection = section || document;
        const codeElements = targetSection.querySelectorAll('.code-element');
        const geoShapes = targetSection.querySelectorAll('.geo-shape');
        const animatedBg = targetSection.querySelector('.animated-bg');
        
        if (animatedBg) {
            animatedBg.style.filter = '';
        }
        
        codeElements.forEach(element => {
            element.style.transform = '';
            element.style.filter = '';
        });

        geoShapes.forEach(shape => {
            shape.style.transform = '';
            shape.style.opacity = '';
        });
    }

    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #ff4757, #3742fa);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: mouseParticleExplosion 0.8s ease-out forwards;
        `;

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    addScrollEffects() {
        let scrollTimeout;
        let ticking = false;
        
        const updateScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = this.hero.offsetHeight;
            const scrollProgress = Math.min(scrollY / heroHeight, 1);

            // Parallax effect on background elements
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                const speed = (index + 1) * 0.1 * this.animationSpeed;
                wave.style.transform = `translateY(${scrollY * speed}px)`;
            });

            // Enhanced fade out effect for hero background that syncs with navbar
            const heroAnimatedBg = document.querySelector('.hero .animated-bg');
            if (heroAnimatedBg) {
                const navbarTransition = Math.min(scrollY / 100, 1); // Sync with navbar transition
                heroAnimatedBg.style.opacity = 1 - scrollProgress * 0.3; // Less aggressive fade
                
                // Add subtle scale effect
                const scale = 1 + scrollProgress * 0.05;
                heroAnimatedBg.style.transform = `scale(${scale})`;
            }

            // Enhance particle movement based on scroll
            const particles = document.querySelectorAll('.hero .particle');
            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                particle.style.transform = `translateY(${scrollY * speed * 0.1}px) translateX(${Math.sin(scrollY * 0.01 + index) * 10}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }
}

// CSS for mouse particle animation
const mouseParticleStyle = document.createElement('style');
mouseParticleStyle.textContent = `
    @keyframes mouseParticleExplosion {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mouseParticleStyle);

// Section intersection observer for enhanced animations
class SectionAnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activateSection(entry.target);
                } else {
                    this.deactivateSection(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all sections with animated backgrounds
        const sections = document.querySelectorAll('.about, .portfolio, .skills, .contact');
        sections.forEach(section => observer.observe(section));
    }

    activateSection(section) {
        const animatedBg = section.querySelector('.animated-bg');
        if (animatedBg) {
            animatedBg.style.opacity = '1';
            animatedBg.style.transform = 'scale(1)';
            
            // Add section-specific classes for enhanced animations
            const sectionClass = section.className.split(' ')[0];
            animatedBg.classList.add(`${sectionClass}-active`);
        }
    }

    deactivateSection(section) {
        const animatedBg = section.querySelector('.animated-bg');
        if (animatedBg) {
            animatedBg.style.opacity = '0.7';
            
            // Remove section-specific classes
            const sectionClass = section.className.split(' ')[0];
            animatedBg.classList.remove(`${sectionClass}-active`);
        }
    }
}

// Initialize background animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundAnimation();
    new SectionAnimationObserver();
});

// Export for potential external use
window.BackgroundAnimation = BackgroundAnimation;
window.SectionAnimationObserver = SectionAnimationObserver;