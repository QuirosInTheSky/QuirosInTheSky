// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterButtons = document.querySelectorAll('.filter-btn');

// Header Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Portfolio Filters
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioSections = document.querySelectorAll('.portfolio-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Show/hide sections based on filter
            portfolioSections.forEach(section => {
                if (filterValue === 'all' || section.getAttribute('data-category') === filterValue) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
});

// Smooth Scroll for Navigation Links
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

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                to_email: 'quirosinthesky@gmail.com',
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                service_type: formData.get('service-type'),
                message: formData.get('message')
            };

            try {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // Send email using EmailJS
                const response = await emailjs.send('service_vgg3scw', 'template_x58e3ap', data, 'Ff1pbZxDBHDHSeRxI');
                
                if (response.status === 200) {
                    // Show success message
                    showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }

            } catch (error) {
                console.error('Error sending email:', error);
                let errorMessage = 'Hubo un error al enviar el mensaje. ';
                if (error.text) {
                    errorMessage += error.text;
                } else {
                    errorMessage += 'Por favor, intenta nuevamente.';
                }
                showNotification(errorMessage, 'error');
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Notification System
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Audio Control
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    const audioControl = document.querySelector('.audio-control');
    const audioIcon = audioControl.querySelector('i');

    // Inicialmente el video está silenciado
    video.muted = true;

    audioControl.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
            audioControl.classList.add('active');
        } else {
            video.muted = true;
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
            audioControl.classList.remove('active');
        }
    });
});

// Scroll Indicator Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.querySelector('#sobre-mi');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filtering
const portfolioSections = document.querySelectorAll('.portfolio-section');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioSections.forEach(section => {
            if (filter === 'all' || section.getAttribute('data-category') === filter) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });
}); 