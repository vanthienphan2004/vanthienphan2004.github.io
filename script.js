// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Force snappy snapping: snap to nearest section after scroll stops
let snapTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(snapTimeout);
    snapTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 64; // account for scroll-padding-top (4rem = 64px)
        let closest = null;
        let minDist = Infinity;
        sections.forEach(section => {
            const top = section.offsetTop;
            const dist = Math.abs(scrollY - top);
            if (dist < minDist) {
                minDist = dist;
                closest = section;
            }
        });
        if (closest && minDist > 30) { // only snap if not already close
            closest.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300); // 300ms after scroll stops for smoother feel
}, { passive: true });

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Optional debug overlay: press 'd' to toggle visible debug widget and richer logging.
(() => {
    let debug = false;

    // create small floating widget
    const widget = document.createElement('div');
    widget.id = 'scroll-debug-widget';
    widget.style.position = 'fixed';
    widget.style.right = '12px';
    widget.style.top = '12px';
    widget.style.minWidth = '220px';
    widget.style.padding = '8px 10px';
    widget.style.background = 'rgba(0,0,0,0.7)';
    widget.style.color = '#fff';
    widget.style.fontSize = '12px';
    widget.style.borderRadius = '8px';
    widget.style.zIndex = 99999;
    widget.style.pointerEvents = 'auto';
    widget.style.display = 'none';
    widget.style.backdropFilter = 'blur(6px)';
    widget.innerHTML = '<strong>Scroll Debug (press d)</strong><div id="sd-info" style="margin-top:6px; font-size:11px; color:#d1d5db;"></div><div style="margin-top:6px; text-align:right;"><button id="sd-close" style="background:#111; color:#fff; border:1px solid rgba(255,255,255,0.06); padding:4px 6px; border-radius:4px; cursor:pointer;">Hide</button></div>';
    document.body.appendChild(widget);

    const info = widget.querySelector('#sd-info');
    widget.querySelector('#sd-close').addEventListener('click', () => {
        debug = false; widget.style.display = 'none';
    });

    function describeElementAtCenter() {
        const cx = Math.floor(window.innerWidth / 2);
        const cy = Math.floor(window.innerHeight / 2);
        const el = document.elementFromPoint(cx, cy);
        if (!el) return 'no-element';

        // gather pointer-events and overflow for element and up to 6 ancestors
        const parts = [];
        let node = el;
        for (let i = 0; i < 7 && node; i++) {
            const s = getComputedStyle(node);
            parts.push(`${node.tagName.toLowerCase()}${node.id ? '#'+node.id : ''}${node.className ? '.'+node.className.split(' ').join('.') : ''} {pe:${s.pointerEvents}; overflow-y:${s.overflowY}; position:${s.position}}`);
            node = node.parentElement;
        }
        const bodyStyle = getComputedStyle(document.body);
        const htmlStyle = getComputedStyle(document.documentElement);
        const docInfo = `pageYOffset:${Math.round(window.pageYOffset)}; body-overflow-y:${bodyStyle.overflowY}; html-overflow-y:${htmlStyle.overflowY}; scroll-snap-type(html):${htmlStyle.scrollSnapType || htmlStyle['-webkit-scroll-snap-type'] || 'n/a'}`;

        return { center: cx+','+cy, topElement: el.tagName + (el.id ? '#'+el.id : ''), chain: parts, docInfo };
    }

    function updateWidget(e) {
        if (!debug) return;
        try {
            const d = describeElementAtCenter();
            if (typeof d === 'string') info.textContent = d;
            else {
                info.innerHTML = `<div><strong>center:</strong> ${d.center}</div><div><strong>top:</strong> ${d.topElement}</div><div style="margin-top:4px; font-size:11px; color:#9ca3af;">${d.docInfo}</div><pre style=\"margin-top:6px; white-space:pre-wrap; color:#cbd5e1; font-size:11px; max-height:120px; overflow:auto;\">${d.chain.join('\n')}</pre>`;
            }
            console.log('[SCROLL-DEBUG]', e ? e.type : 'update', d);
        } catch (err) {
            console.error('debug update failed', err);
        }
    }

    // log wheel/touchstart and update widget
    function logAndUpdate(e) {
        if (!debug) return;
        try {
            const target = e.target && e.target.tagName;
            console.log('[SCROLL-DEBUG-EVENT]', e.type, 'target=', target, 'pageYOffset=', window.pageYOffset);
            updateWidget(e);
        } catch (err) { /* ignore */ }
    }

    window.addEventListener('wheel', logAndUpdate, { passive: true });
    window.addEventListener('touchstart', logAndUpdate, { passive: true });
    window.addEventListener('touchmove', logAndUpdate, { passive: true });
    window.addEventListener('scroll', () => updateWidget(), { passive: true });

    // toggle with 'd'
    window.addEventListener('keydown', (e) => {
        if (e.key === 'd') {
            debug = !debug;
            widget.style.display = debug ? 'block' : 'none';
            console.warn('Scroll debug', debug ? 'ENABLED' : 'DISABLED');
            updateWidget();
        }
    });

    // expose a small programmatic update in case user needs it
    window.__scrollDebugUpdate = updateWidget;
})();

// (Scroll fallback removed: native scroll-snap will be used; if needed we can add a less-intrusive fallback.)