// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 102, 204, 0.95)';
    } else {
        header.style.backgroundColor = 'rgba(0, 169, 255, 0.95)';
    }
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    `;
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    nav.appendChild(mobileMenuBtn);
    nav.appendChild(mobileMenu);
    
    const navLinks = document.querySelector('.nav-links');
    mobileMenu.appendChild(navLinks);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
};

// Animate services on scroll
const animateServices = () => {
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
};

// Animate download section
const animateDownload = () => {
    const features = document.querySelectorAll('.feature');
    const buttons = document.querySelectorAll('.download-btn');
    const preview = document.querySelector('.app-preview');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(feature);
    });
    
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
        button.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(button);
    });
    
    if (preview) {
        preview.style.opacity = '0';
        preview.style.transform = 'translateY(30px)';
        preview.style.transitionDelay = '0.6s';
        observer.observe(preview);
    }
};

// Form validation
const validateForm = () => {
    const form = document.querySelector('.contact-form form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const message = form.querySelector('textarea').value;

        if (!name || !email || !phone || !message) {
            alert('कृपया सभी फील्ड भरें');
            return;
        }

        // Here you would typically send the form data to a server
        alert('आपका संदेश भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
        form.reset();
    });
};

// Download app button click handler
const handleDownloadClick = () => {
    const ctaButton = document.querySelector('.cta-button');
    const downloadSection = document.querySelector('#download');
    
    ctaButton.addEventListener('click', () => {
        downloadSection.scrollIntoView({ behavior: 'smooth' });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    animateServices();
    animateDownload();
    validateForm();
    handleDownloadClick();
}); 