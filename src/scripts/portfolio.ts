// ===== INTERFACES & TYPES =====
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SkillProgress {
  element: HTMLElement;
  targetLevel: number;
  currentLevel: number;
}

// ===== MAIN APPLICATION CLASS =====
class PortfolioApp {
  private navbar: HTMLElement | null;
  private navToggle: HTMLElement | null;
  private navMenu: HTMLElement | null;
  private backToTopBtn: HTMLElement | null;
  private contactForm: HTMLFormElement | null;
  private skillProgressBars: SkillProgress[] = [];
  private portfolioItems: NodeListOf<Element>;
  private filterButtons: NodeListOf<Element>;
  private isScrolling: boolean = false;

  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navToggle = document.getElementById('nav-toggle');
    this.navMenu = document.getElementById('nav-menu');
    this.backToTopBtn = document.getElementById('back-to-top');
    this.contactForm = document.getElementById('contact-form') as HTMLFormElement;
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.setupScrollSpy();
    this.setupSkillBars();
    this.setupPortfolioFilter();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
  }

  // ===== EVENT LISTENERS SETUP =====
  private setupEventListeners(): void {
    // Navigation toggle for mobile
    this.navToggle?.addEventListener('click', () => this.toggleMobileNav());
    
    // Close mobile nav when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => this.closeMobileNav());
    });

    // Scroll events
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    
    // Back to top button
    this.backToTopBtn?.addEventListener('click', () => this.scrollToTop());
    
    // Contact form submission
    this.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Real-time form validation
    this.setupFormValidation();
    
    // Window resize handler
    window.addEventListener('resize', () => this.handleResize(), { passive: true });
    
    // Prevent default behavior for placeholder links
    document.querySelectorAll('a[href="#"]').forEach(link => {
      link.addEventListener('click', (e) => e.preventDefault());
    });
  }

  // ===== NAVIGATION FUNCTIONALITY =====
  private toggleMobileNav(): void {
    this.navMenu?.classList.toggle('active');
    this.navToggle?.classList.toggle('active');
    
    // Prevent body scroll when mobile menu is open
    if (this.navMenu?.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  private closeMobileNav(): void {
    this.navMenu?.classList.remove('active');
    this.navToggle?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== SCROLL FUNCTIONALITY =====
  private handleScroll(): void {
    if (this.isScrolling) return;
    
    this.isScrolling = true;
    requestAnimationFrame(() => {
      this.updateNavbarOnScroll();
      this.updateBackToTopButton();
      this.updateActiveNavLink();
      this.isScrolling = false;
    });
  }

  private updateNavbarOnScroll(): void {
    if (!this.navbar) return;
    
    const scrolled = window.scrollY > 50;
    this.navbar.classList.toggle('scrolled', scrolled);
  }

  private updateBackToTopButton(): void {
    if (!this.backToTopBtn) return;
    
    const scrolled = window.scrollY > 300;
    this.backToTopBtn.classList.toggle('visible', scrolled);
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===== SCROLL SPY FUNCTIONALITY =====
  private setupScrollSpy(): void {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  private updateActiveNavLink(): void {
    // This is handled by setupScrollSpy
  }

  // ===== SMOOTH SCROLLING =====
  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (anchor as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ===== SKILLS ANIMATION =====
  private setupSkillBars(): void {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar) => {
      const level = parseInt(bar.getAttribute('data-level') || '0');
      this.skillProgressBars.push({
        element: bar as HTMLElement,
        targetLevel: level,
        currentLevel: 0
      });
    });
  }

  private animateSkillBars(): void {
    this.skillProgressBars.forEach(skill => {
      if (skill.currentLevel < skill.targetLevel) {
        const increment = Math.ceil(skill.targetLevel / 50); // Smooth animation
        skill.currentLevel = Math.min(skill.currentLevel + increment, skill.targetLevel);
        skill.element.style.width = `${skill.currentLevel}%`;
        
        if (skill.currentLevel < skill.targetLevel) {
          requestAnimationFrame(() => this.animateSkillBars());
        }
      }
    });
  }

  // ===== PORTFOLIO FILTER =====
  private setupPortfolioFilter(): void {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const filter = target.getAttribute('data-filter');
        
        // Update active filter button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Filter portfolio items
        this.filterPortfolioItems(filter || 'all');
      });
    });
  }

  private filterPortfolioItems(filter: string): void {
    this.portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;
      
      if (shouldShow) {
        (item as HTMLElement).style.display = 'block';
        item.classList.add('animate-fadeInUp');
      } else {
        (item as HTMLElement).style.display = 'none';
        item.classList.remove('animate-fadeInUp');
      }
    });
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  private setupIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          
          // Add animation classes based on element type
          if (target.classList.contains('about-content')) {
            target.classList.add('animate-fadeInUp');
          } else if (target.classList.contains('portfolio-item')) {
            target.classList.add('animate-fadeInUp');
          } else if (target.classList.contains('skill-item')) {
            target.classList.add('animate-fadeInUp');
          } else if (target.classList.contains('contact-content')) {
            target.classList.add('animate-fadeInUp');
          }
          
          // Trigger skill bar animation when skills section is visible
          if (target.id === 'skills') {
            setTimeout(() => this.animateSkillBars(), 500);
          }
          
          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
      '.about-content, .portfolio-item, .skill-item, .contact-content, #skills'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
  }

  // ===== FORM VALIDATION =====
  private setupFormValidation(): void {
    if (!this.contactForm) return;

    const inputs = this.contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input as HTMLInputElement));
      input.addEventListener('input', () => this.clearFieldError(input as HTMLInputElement));
    });
  }

  private validateField(field: HTMLInputElement): boolean {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
          isValid = false;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
        
      case 'subject':
        if (!value) {
          errorMessage = 'Subject is required';
          isValid = false;
        } else if (value.length < 5) {
          errorMessage = 'Subject must be at least 5 characters';
          isValid = false;
        }
        break;
        
      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
          isValid = false;
        }
        break;
    }

    // Update UI
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
    
    field.classList.toggle('error', !isValid);
    field.classList.toggle('success', isValid && value.length > 0);

    return isValid;
  }

  private clearFieldError(field: HTMLInputElement): void {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
    field.classList.remove('error');
  }

  private validateForm(): FormErrors {
    const errors: FormErrors = {};

    // Validate all fields
    const fields = ['name', 'email', 'subject', 'message'] as const;
    fields.forEach(fieldName => {
      const field = this.contactForm?.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
      if (field && !this.validateField(field)) {
        errors[fieldName] = 'Invalid field';
      }
    });

    return errors;
  }

  private getFormData(): FormData {
    const formData = new FormData(this.contactForm!);
    return {
      name: formData.get('name') as string || '',
      email: formData.get('email') as string || '',
      subject: formData.get('subject') as string || '',
      message: formData.get('message') as string || ''
    };
  }

  // ===== FORM SUBMISSION =====
  private async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    if (!this.contactForm) return;

    const submitBtn = this.contactForm.querySelector('.btn-submit') as HTMLButtonElement;
    const errors = this.validateForm();

    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      this.showFormMessage('Please correct the errors above.', 'error');
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await this.submitForm(this.getFormData());
      
      // Success
      this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
      this.contactForm.reset();
      
      // Clear success classes from fields
      const fields = this.contactForm.querySelectorAll('input, textarea');
      fields.forEach(field => field.classList.remove('success', 'error'));
      
    } catch (error) {
      // Error
      this.showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Remove loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  private async submitForm(data: FormData): Promise<void> {
    // Simulate API call with delay
    console.log('Submitting form data:', data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% of the time)
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated error'));
        }
      }, 2000);
    });
  }

  private showFormMessage(message: string, type: 'success' | 'error'): void {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Add styles
    Object.assign(messageEl.style, {
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      backgroundColor: type === 'success' ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255, 107, 107, 0.1)',
      color: type === 'success' ? '#4ecdc4' : '#ff6b6b',
      border: `1px solid ${type === 'success' ? '#4ecdc4' : '#ff6b6b'}`
    });

    // Insert message
    this.contactForm?.insertBefore(messageEl, this.contactForm.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  // ===== UTILITY METHODS =====
  private handleResize(): void {
    // Close mobile nav on resize
    if (window.innerWidth > 991) {
      this.closeMobileNav();
    }
  }
}

// ===== FLOATING ANIMATION ENHANCEMENT =====
class FloatingAnimation {
  private elements: NodeListOf<Element>;
  
  constructor() {
    this.elements = document.querySelectorAll('.floating-item');
    this.init();
  }
  
  private init(): void {
    this.elements.forEach((element, index) => {
      this.animateElement(element as HTMLElement, index);
    });
  }
  
  private animateElement(element: HTMLElement, index: number): void {
    const randomOffset = Math.random() * 2000;
    
    setTimeout(() => {
      setInterval(() => {
        const randomX = (Math.random() - 0.5) * 50;
        const randomY = (Math.random() - 0.5) * 50;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }, 3000 + randomOffset);
    }, index * 500); // Stagger the start times
  }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  new FloatingAnimation();
});

// ===== EXPORT FOR POTENTIAL MODULE USE =====
export { PortfolioApp, FloatingAnimation };