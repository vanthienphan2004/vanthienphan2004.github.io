document.addEventListener('DOMContentLoaded', () => {
    // Automatically open external links in a new tab
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Check if it's an external link or a file (not an internal anchor)
        if (href && (href.startsWith('http') || href.endsWith('.pdf'))) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

function copyEmail(e) {
    e.preventDefault();
    const email = "vanthienphan2004.work@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard: " + email);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        window.location.href = "mailto:" + email;
    });
}