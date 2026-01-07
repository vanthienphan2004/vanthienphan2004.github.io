document.addEventListener('DOMContentLoaded', () => {
    // Animations removed as per request for "no moving elements"
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