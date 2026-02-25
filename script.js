document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Language Toggle ---
    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = 'es'; // Default language

    langToggleBtn.addEventListener('click', () => {
        // Toggle language state
        currentLang = currentLang === 'es' ? 'en' : 'es';
        
        // Update button text
        langToggleBtn.querySelector('.lang-text').innerText = currentLang === 'es' ? 'EN' : 'ES';

        // Update all elements with data-es and data-en attributes
        const translatableElements = document.querySelectorAll('[data-es][data-en]');
        
        translatableElements.forEach(el => {
            // Check if it's an input or standard element
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute(`data-${currentLang}`);
            } else {
                el.innerText = el.getAttribute(`data-${currentLang}`);
            }
        });
    });

    // --- 2. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) {
            mobileMenu.classList.add('open');
            mobileMenuBtn.innerHTML = '<span></span><span></span>'; // Simple X icon effect could be added
            mobileMenuBtn.children[0].style.transform = 'rotate(45deg) translate(2px, 2px)';
            mobileMenuBtn.children[1].style.transform = 'rotate(-45deg) translate(2px, -2px)';
        } else {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.children[0].style.transform = 'none';
            mobileMenuBtn.children[1].style.transform = 'none';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- 4. Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal-item, .reveal-delay');
    revealElements.forEach(el => observer.observe(el));
    
});
