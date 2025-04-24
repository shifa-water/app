// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Download counter
const downloadBtn = document.querySelector('.app-download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        // You can add analytics or tracking here
        console.log('App download initiated');
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // You can add form submission logic here
        alert('आपका संदेश प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।');
        contactForm.reset();
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    } else {
        navbar.style.background = 'transparent';
    }
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-box, .section-title');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup
document.querySelectorAll('.feature-box, .section-title').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 