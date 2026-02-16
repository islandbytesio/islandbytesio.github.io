// IslandBytes - Interactive Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for background elements
    const handleParallax = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        // Move palm leaves
        document.querySelectorAll('.palm-leaf').forEach((leaf, index) => {
            const speed = (index + 1) * 5;
            leaf.style.transform = `
                translate(${deltaX * speed}px, ${deltaY * speed}px) 
                rotate(${leaf.dataset.rotation || 0}deg)
            `;
        });

        // Move gradient orbs
        document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
            const speed = (index + 1) * 10;
            orb.style.transform = `
                translate(${deltaX * speed}px, ${deltaY * speed}px)
            `;
        });
    };

    // Throttle parallax for performance
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax(e);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Store initial rotation values for palm leaves
    document.querySelectorAll('.palm-leaf').forEach((leaf) => {
        const transform = window.getComputedStyle(leaf).transform;
        if (transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
            leaf.dataset.rotation = angle;
        }
    });

    // Smooth scroll for footer links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email link interaction
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            // Add a subtle animation on click
            emailLink.style.transform = 'scale(0.95)';
            setTimeout(() => {
                emailLink.style.transform = '';
            }, 150);
        });
    }

    // Logo interaction - Easter egg
    const logo = document.getElementById('logo');
    let clickCount = 0;
    let clickTimer = null;

    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            
            if (clickTimer) {
                clearTimeout(clickTimer);
            }

            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);

            // Easter egg: 5 clicks triggers a fun animation
            if (clickCount === 5) {
                triggerEasterEgg();
                clickCount = 0;
            }
        });
    }

    function triggerEasterEgg() {
        const palmLeaves = document.querySelectorAll('.palm-leaf');
        palmLeaves.forEach((leaf, index) => {
            setTimeout(() => {
                leaf.style.animation = 'spin 1s ease-in-out';
                setTimeout(() => {
                    leaf.style.animation = '';
                }, 1000);
            }, index * 100);
        });
    }

    // Add spin animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
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

    // Observe all animated elements
    document.querySelectorAll('.logo-section, .hero-section, .contact-section, .footer').forEach(el => {
        observer.observe(el);
    });

    // Add loading state handler
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle logo image error
    const logoImg = document.querySelector('.logo');
    if (logoImg) {
        logoImg.addEventListener('error', () => {
            // Create a fallback SVG logo if image fails to load
            const fallbackLogo = document.createElement('div');
            fallbackLogo.innerHTML = `
                <svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ffd4cc;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <text x="100" y="50" font-family="Space Grotesk, sans-serif" font-size="28" font-weight="700" fill="url(#logoGradient)" text-anchor="middle">IslandBytes</text>
                </svg>
            `;
            logoImg.parentElement.replaceChild(fallbackLogo.firstElementChild, logoImg);
        });
    }

    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.gradient-orb').forEach(orb => {
            orb.style.animation = 'none';
        });
    }

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const deltaX = (touchEndX - touchStartX) / window.innerWidth;
        const deltaY = (touchEndY - touchStartY) / window.innerHeight;

        // Subtle parallax on touch devices
        document.querySelectorAll('.palm-leaf').forEach((leaf, index) => {
            const speed = (index + 1) * 3;
            leaf.style.transform = `
                translate(${deltaX * speed * 50}px, ${deltaY * speed * 50}px)
            `;
        });
    }, { passive: true });

    // Console message for developers
    console.log('%c🌴 IslandBytes', 'font-size: 24px; color: #14b8a6; font-weight: bold;');
    console.log('%cTechnical Excellence Meets Island Innovation', 'font-size: 14px; color: #ffd4cc;');
    console.log('%cBuilt with care and attention to detail.', 'font-size: 12px; color: #4b5563;');
});

