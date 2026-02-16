// IslandBytes Landing Page - Interactive Tech Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // ===== Parallax Effect =====
    const handleParallax = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        // Move palm leaves
        document.querySelectorAll('.palm-leaf').forEach((leaf, index) => {
            const speed = (index + 1) * 5;
            const rotation = leaf.dataset.rotation || 0;
            leaf.style.transform = `
                translate(${deltaX * speed}px, ${deltaY * speed}px) 
                rotate(${rotation}deg)
            `;
        });

        // Move gradient orbs
        document.querySelectorAll('.gradient-orb').forEach((orb, index) => {
            const speed = (index + 1) * 8;
            orb.style.transform = `
                translate(${deltaX * speed}px, ${deltaY * speed}px)
            `;
        });

        // Move code floats
        document.querySelectorAll('.code-float').forEach((code, index) => {
            const speed = (index + 1) * 3;
            code.style.transform = `
                translate(${deltaX * speed * -1}px, ${deltaY * speed * -1}px)
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

    // ===== Animated Stats Counter =====
    const animateStats = () => {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (stat.textContent.includes('%')) {
                    stat.textContent = current.toFixed(1);
                } else if (stat.textContent.includes('K')) {
                    stat.textContent = Math.round(current);
                } else {
                    stat.textContent = Math.round(current);
                }
            }, 16);
        });
    };

    // Trigger stats animation when visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }

    // ===== Terminal Typing Effect =====
    const terminalText = document.querySelector('.typed-text');
    const terminalOutput = document.querySelector('.terminal-output');
    
    const commands = [
        { 
            cmd: 'npm install @islandbytes/core',
            output: '✓ Package installed successfully',
            delay: 1000
        },
        { 
            cmd: 'islandbytes init --template modern',
            output: '✓ Project initialized\n✓ Dependencies resolved\n✓ Ready to build',
            delay: 2000
        },
        { 
            cmd: 'npm run dev',
            output: '🌴 IslandBytes v2.0.0\n⚡ Server running at http://localhost:3000\n✨ Ready in 127ms',
            delay: 2500
        }
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    const typeEffect = () => {
        if (isWaiting) return;

        const currentCommand = commands[commandIndex];
        
        if (!isDeleting && charIndex < currentCommand.cmd.length) {
            // Typing
            terminalText.textContent = currentCommand.cmd.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, 50 + Math.random() * 50);
        } else if (!isDeleting && charIndex === currentCommand.cmd.length) {
            // Show output
            isWaiting = true;
            setTimeout(() => {
                terminalOutput.innerHTML = `<div class="output-text">${currentCommand.output}</div>`;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                    typeEffect();
                }, currentCommand.delay);
            }, 500);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            terminalText.textContent = currentCommand.cmd.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 30);
        } else if (isDeleting && charIndex === 0) {
            // Move to next command
            isDeleting = false;
            terminalOutput.innerHTML = '';
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeEffect, 500);
        }
    };

    if (terminalText) {
        setTimeout(typeEffect, 1000);
    }

    // ===== Smooth Scroll =====
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

    // ===== Intersection Observer for Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.feature-card, .terminal-section').forEach(el => {
        fadeInObserver.observe(el);
    });

    // ===== Logo Interactions =====
    const navLogo = document.getElementById('nav-logo');
    const mainLogo = document.getElementById('logo');

    [navLogo, mainLogo].forEach(logo => {
        if (logo) {
            let clickCount = 0;
            let clickTimer = null;

            logo.addEventListener('click', () => {
                clickCount++;
                
                if (clickTimer) clearTimeout(clickTimer);

                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 2000);

                // Easter egg: 5 clicks triggers animation
                if (clickCount === 5) {
                    triggerEasterEgg();
                    clickCount = 0;
                }
            });

            // Handle image error
            logo.addEventListener('error', () => {
                const fallback = createFallbackLogo();
                logo.parentElement.replaceChild(fallback, logo);
            });
        }
    });

    function triggerEasterEgg() {
        const codeFloats = document.querySelectorAll('.code-float');
        codeFloats.forEach((code, index) => {
            setTimeout(() => {
                code.style.animation = 'spin 1s ease-in-out';
                setTimeout(() => {
                    code.style.animation = '';
                }, 1000);
            }, index * 100);
        });
    }

    function createFallbackLogo() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '160');
        svg.setAttribute('height', '48');
        svg.setAttribute('viewBox', '0 0 160 48');
        svg.innerHTML = `
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#14b8a6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#ffd4cc;stop-opacity:1" />
                </linearGradient>
            </defs>
            <text x="80" y="32" font-family="Space Grotesk, sans-serif" font-size="20" font-weight="700" fill="url(#logoGrad)" text-anchor="middle">IslandBytes</text>
        `;
        return svg;
    }

    // ===== Grid Animation =====
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        let scrollPos = 0;
        window.addEventListener('scroll', () => {
            scrollPos = window.pageYOffset;
            gridOverlay.style.transform = `translateY(${scrollPos * 0.5}px)`;
        });
    }

    // ===== Performance Optimization =====
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.gradient-orb, .code-float').forEach(el => {
            el.style.animation = 'none';
        });
    }

    // ===== Touch Support =====
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

        document.querySelectorAll('.code-float').forEach((code, index) => {
            const speed = (index + 1) * 2;
            code.style.transform = `translate(${deltaX * speed * 30}px, ${deltaY * speed * 30}px)`;
        });
    }, { passive: true });

    // ===== Console Message =====
    console.log('%c🌴 IslandBytes', 'font-size: 24px; color: #14b8a6; font-weight: bold;');
    console.log('%cTechnical Excellence Meets Island Innovation', 'font-size: 14px; color: #ffd4cc;');
    console.log('%cBuilt with ❤️ and precision', 'font-size: 12px; color: #4b5563;');

    // Add loading class
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

