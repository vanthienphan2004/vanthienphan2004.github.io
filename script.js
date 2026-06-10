document.addEventListener('DOMContentLoaded', () => {
    // ── External link handler ──────────────────────────────
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.endsWith('.pdf'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ── Hamburger menu toggle ──────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // ── Scroll-based section reveal (Staggered) ────────────
    const revealElements = document.querySelectorAll('.reveal');
    let revealQueue = [];
    let revealTimeout = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Once triggered, unobserve and queue for staggered fade-in
                observer.unobserve(entry.target);
                revealQueue.push(entry.target);
            }
        });

        if (revealQueue.length > 0) {
            if (!revealTimeout) {
                revealTimeout = setTimeout(() => {
                    revealQueue.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 120); // 120ms stagger delay
                    });
                    revealQueue = [];
                    revealTimeout = null;
                }, 50);
            }
        }
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ── Active nav link highlighting ───────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 140; // adjusted offset for navbar thickness

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ── Navbar shrink on scroll ────────────────────────────
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });


    // ── Terminal Typing Animation ──────────────────────────
    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
        const fullText = "Initializing Research Environment...";
        heroIntro.textContent = ">_ ";
        let index = 0;

        function typeChar() {
            if (index < fullText.length) {
                heroIntro.textContent = ">_ " + fullText.substring(0, index + 1);
                index++;
                setTimeout(typeChar, 45); // elegant typing speed
            }
        }
        setTimeout(typeChar, 400); // initial load pause
    }


    // ── Project Cards Cursor Tracking ──────────────────────
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }, { passive: true });
    });


    // ── Stats Counter Animation ────────────────────────────
    const statCounts = document.querySelectorAll('.stat-count');
    let statsAnimated = false;

    const animateStats = () => {
        statCounts.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const decimals = parseInt(stat.getAttribute('data-decimals') || '0');
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            let startTime = null;

            const updateVal = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // easeOutQuad
                const eased = progress * (2 - progress);
                const current = eased * target;

                stat.textContent = current.toFixed(decimals) + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateVal);
                } else {
                    stat.textContent = target.toFixed(decimals) + suffix;
                }
            };
            requestAnimationFrame(updateVal);
        });
    };

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection && statCounts.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        statsObserver.observe(statsSection);
    }


    // ── Dynamic Math Canvas Background ─────────────────────
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: true });
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let activeParticles = 45;
        // Scale particle density with screen width
        if (width < 768) {
            activeParticles = 20;
        }

        const particles = [];
        const maxDistance = 120;
        let mouse = { x: null, y: null };

        // Handle Resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, { passive: true });

        // Handle Mouse Move
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Initialize particles
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35; // slow drift
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 1.2 + 0.8;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce boundaries
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fill();
            }
        }

        for (let i = 0; i < activeParticles; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.04;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Interactive mouse links
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p1.x - mouse.x;
                    const dy = p1.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance + 30) {
                        const alpha = (1 - dist / (maxDistance + 30)) * 0.06;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(loop);
        }

        loop();
    }

    // ── Floating Scroll Indicator Arrow Logic ──────────────
    const scrollArrowBtn = document.getElementById('scrollArrowBtn');
    if (scrollArrowBtn) {
        const sectionElements = Array.from(document.querySelectorAll('section[id], footer[id]'));
        const navbarOffset = 80;

        const isAtBottom = () => {
            return (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 55);
        };

        const updateScrollBtn = () => {
            if (isAtBottom()) {
                scrollArrowBtn.classList.add('up');
                scrollArrowBtn.setAttribute('aria-label', 'Scroll to top');
            } else {
                scrollArrowBtn.classList.remove('up');
                scrollArrowBtn.setAttribute('aria-label', 'Scroll to next section');
            }
        };

        // Track scroll events to rotate arrow
        window.addEventListener('scroll', updateScrollBtn, { passive: true });
        updateScrollBtn(); // Run on load

        // Click handler to scroll to next section or top
        scrollArrowBtn.addEventListener('click', () => {
            if (isAtBottom()) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const currentScroll = window.scrollY;
                // Find next section that starts below current scroll position (adjusted for navbar offset)
                const nextSection = sectionElements.find(sec => {
                    const targetScrollPos = sec.id === 'hero' ? 0 : sec.offsetTop - navbarOffset;
                    return targetScrollPos > currentScroll + 15; // 15px buffer for scroll inaccuracies
                });

                if (nextSection) {
                    const targetOffset = nextSection.id === 'hero' ? 0 : nextSection.offsetTop - navbarOffset;
                    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
                } else {
                    // Fallback to top if no section is next
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    }
});

// ── Toast notification for email copy ──────────────────────
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function copyEmail(e) {
    e.preventDefault();
    const email = "vanthienphan2004.work@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast("✓ Email copied: " + email);
    }).catch(() => {
        // Fallback: open mail client
        window.location.href = "mailto:" + email;
    });
}