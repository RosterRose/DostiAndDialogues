// Main JavaScript for Dosti And Dialogues

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(44, 62, 80, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu ul');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(44, 62, 80, 0.98)';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                navMenu.style.zIndex = '1000';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.background = 'transparent';
                navMenu.style.boxShadow = 'none';
                navMenu.style.padding = '0';
                navMenu.style.width = 'auto';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate platform cards
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate legal sections
    const legalSections = document.querySelectorAll('.legal-section');
    legalSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Logo animation on hover
    const logoCircles = document.querySelectorAll('.logo-circle');
    logoCircles.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            const micIcon = this.querySelector('.mic-icon');
            const headphonesIcon = this.querySelector('.headphones-icon');
            
            if (micIcon) micIcon.style.transform = 'translateY(-8px) rotate(10deg)';
            if (headphonesIcon) headphonesIcon.style.transform = 'translateY(8px) rotate(-10deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            const micIcon = this.querySelector('.mic-icon');
            const headphonesIcon = this.querySelector('.headphones-icon');
            
            if (micIcon) micIcon.style.transform = 'translateY(-5px) rotate(0deg)';
            if (headphonesIcon) headphonesIcon.style.transform = 'translateY(5px) rotate(0deg)';
        });
    });
    
    // Table of contents active link highlighting
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('.legal-section[id]');
    
    if (tocLinks.length > 0 && sections.length > 0) {
        const tocObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const tocLink = document.querySelector(`.table-of-contents a[href="#${id}"]`);
                
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    tocLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    if (tocLink) {
                        tocLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-120px 0px -50% 0px'
        });
        
        sections.forEach(section => {
            tocObserver.observe(section);
        });
        
        // Add CSS for active TOC links
        const style = document.createElement('style');
        style.textContent = `
            .table-of-contents a.active {
                color: #f39c12 !important;
                background: rgba(243, 156, 18, 0.15) !important;
                border-left: 3px solid #f39c12;
                padding-left: 9px !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Typing effect for hero title (only on home page)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.innerHTML.includes('Dosti And')) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        if (titleLines.length > 0) {
            titleLines.forEach((line, index) => {
                line.style.opacity = '0';
                line.style.transform = 'translateY(30px)';
                line.style.animation = `fadeInUp 1s ease forwards ${index * 0.3}s`;
            });
            
            // Add keyframes for animation
            const keyframes = document.createElement('style');
            keyframes.textContent = `
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(keyframes);
        }
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Copy to clipboard functionality for legal text (if needed)
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            });
        });
    });
    
    // Print functionality
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #f39c12, #e67e22);
        color: #2c3e50;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Back to top functionality
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for back to top button
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'translateY(-3px) scale(1.1)';
        backToTopButton.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'translateY(0) scale(1)';
        backToTopButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
});

// Console welcome message
console.log(`
🎧 Welcome to Dosti And Dialogues!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Conversations that matter, friendships that last.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Service Worker registration (for PWA functionality - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}