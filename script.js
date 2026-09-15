/**
 * Academic Portfolio Navigation & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.querySelector('.main-wrapper');

    // Dynamically adjust content top margin on mobile
    function updateMobileNavOffset() {
        if (!sidebar || !mainWrapper) return;
        if (window.innerWidth <= 850) {
            const h = sidebar.offsetHeight;
            mainWrapper.style.marginTop = `${h}px`;
        } else {
            mainWrapper.style.marginTop = '';
        }
    }

    updateMobileNavOffset();
    window.addEventListener('resize', updateMobileNavOffset, { passive: true });
    window.addEventListener('load', updateMobileNavOffset, { passive: true });

    // Dropdown submenu toggles
    const dropdownToggleBtns = document.querySelectorAll('.dropdown-toggle-btn');
    dropdownToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parent = btn.closest('.nav-item');
            if (parent) {
                parent.classList.toggle('open');
            }
        });
    });

    // Close mobile dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 850) {
            const isInsideDropdown = e.target.closest('.nav-item');
            if (!isInsideDropdown) {
                const openSubmenus = document.querySelectorAll('.nav-item.open');
                openSubmenus.forEach(item => item.classList.remove('open'));
            }
        }
    });

    // Smart Scroll: Hide on scroll down, show on scroll up (Mobile Only)
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleSmartScroll() {
        if (window.innerWidth > 850 || !sidebar) return;

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        // Near top: always visible
        if (currentScrollY <= 15) {
            sidebar.classList.remove('nav-hidden');
        } else if (scrollDelta > 5 && currentScrollY > 35) {
            // Scrolling down -> hide navbar
            sidebar.classList.add('nav-hidden');
            // Close any open floating dropdowns
            const openSubmenus = document.querySelectorAll('.nav-item.open');
            openSubmenus.forEach(item => item.classList.remove('open'));
        } else if (scrollDelta < -5) {
            // Scrolling up -> reveal navbar
            sidebar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleSmartScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Highlight current page link in sidebar
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    const allNavLinks = document.querySelectorAll('.sidebar-nav a');
    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        const linkFile = href.split('/').pop();
        if (
            linkFile === currentFile || 
            (currentFile === '' && (linkFile === 'index.html' || href === '/')) ||
            (currentPath.includes('/research/') && href.includes('research.html')) ||
            (link.href === window.location.href)
        ) {
            if (link.classList.contains('sub-nav-link')) {
                link.classList.add('active');
                const parentGroup = link.closest('.nav-item');
                if (parentGroup) {
                    if (window.innerWidth > 850) {
                        parentGroup.classList.add('open');
                    }
                    parentGroup.classList.add('has-active');
                }
            } else if (link.classList.contains('nav-link')) {
                link.classList.add('active');
                const parentGroup = link.closest('.nav-item');
                if (parentGroup && (currentFile === 'research.html' || currentPath.includes('/research/'))) {
                    if (window.innerWidth > 850) {
                        parentGroup.classList.add('open');
                    }
                }
            }
        }
    });
});

// Copy Email Utility with Toast Notification
function copyEmail(event) {
    if (event) event.preventDefault();
    const email = "vanthienphan2004.work@gmail.com";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast("Copied to clipboard: " + email);
        }).catch(() => {
            fallbackCopy(email);
        });
    } else {
        fallbackCopy(email);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showToast("Copied to clipboard: " + text);
    } catch (err) {
        showToast("Email: " + text);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastMsg';
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}