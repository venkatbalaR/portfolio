// ===================================
// Navigation Toggle
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .skill-card, .project-card, .contact-item, .contact-form, .stat-item');
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===================================
// Skill Progress Bars Animation
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.5
});

document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
});

// ===================================
// Form Submission
// ===================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Scroll to Top Button (Optional Enhancement)
// ===================================
let scrollTopBtn;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-lg);
            transition: var(--transition);
            z-index: 999;
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
        }
        
        .scroll-top-btn.visible {
            display: flex;
        }
    `;
    document.head.appendChild(style);
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Initialize scroll to top button
createScrollTopButton();

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on hero title
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     setTimeout(() => {
//         typeWriter(heroTitle, originalText, 100);
//     }, 1000);
// }

// ===================================
// Parallax Effect (Optional Enhancement)
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Resume Modal
// ===================================
const resumeModal = document.getElementById('resume-modal');
const resumeLink = document.getElementById('resume-link');
const resumeModalClose = document.querySelector('.resume-modal-close');
const resumeModalOverlay = document.querySelector('.resume-modal-overlay');

if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (resumeModal) {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', () => {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('active')) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// ===================================
// Certificate Modal
// ===================================
const certificateModal = document.getElementById('certificate-modal');
const certificateLink = document.getElementById('certificate-link');
const certificateModalClose = document.querySelector('.certificate-close');
const certificateModalOverlay = certificateModal ? certificateModal.querySelector('.resume-modal-overlay') : null;

if (certificateLink) {
    certificateLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (certificateModal) {
            certificateModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
}

if (certificateModalClose) {
    certificateModalClose.addEventListener('click', () => {
        if (certificateModal) {
            certificateModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

if (certificateModalOverlay) {
    certificateModalOverlay.addEventListener('click', () => {
        if (certificateModal) {
            certificateModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    setActiveNavLink();
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

