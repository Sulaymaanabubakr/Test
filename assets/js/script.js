// Navigation toggle functionality
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('is-open');
    });

    navList.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('is-open');
        });
    });
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
    } else {
        scrollTopBtn.classList.remove('is-visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for animations
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px',
    }
);

animatedElements.forEach((el) => observer.observe(el));

// Portfolio modal functionality
const modal = document.getElementById('portfolioModal');
const modalTitle = modal.querySelector('#modalTitle');
const modalDescription = modal.querySelector('.modal__description');
const modalImage = modal.querySelector('.modal__image');
const modalLink = modal.querySelector('.modal__actions a');

const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach((card) => {
    card.querySelector('.view-project').addEventListener('click', () => {
        const title = card.dataset.project;
        const description = card.dataset.description;
        const image = card.dataset.image;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = image;
        modalImage.alt = `${title} preview`;
        modalLink.href = '#';

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (event) => {
    if (event.target.dataset.close === 'modal' || event.target.closest('.modal__close')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});

// Testimonials slider (auto-scroll)
const slider = document.querySelector('.testimonials__slider');
if (slider) {
    let scrollPosition = 0;
    const slideInterval = 6000;

    function autoScrollTestimonials() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
        } else {
            scrollPosition += slider.clientWidth;
        }
        slider.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }

    let intervalId = setInterval(autoScrollTestimonials, slideInterval);

    slider.addEventListener('mouseenter', () => clearInterval(intervalId));
    slider.addEventListener('mouseleave', () => {
        intervalId = setInterval(autoScrollTestimonials, slideInterval);
    });
}

// Contact form validation
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fields = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        fields.forEach((field) => {
            const errorSpan = field.parentElement.querySelector('.error-message');
            if (!field.value.trim()) {
                errorSpan.textContent = 'This field is required.';
                field.classList.add('error');
                isValid = false;
                return;
            }

            if (field.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value.trim())) {
                    errorSpan.textContent = 'Please enter a valid email address.';
                    field.classList.add('error');
                    isValid = false;
                    return;
                }
            }

            errorSpan.textContent = '';
            field.classList.remove('error');
        });

        if (isValid) {
            contactForm.reset();
            alert('Thank you for your message! I will reach out shortly.');
        }
    });

    contactForm.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => {
            const errorSpan = field.parentElement.querySelector('.error-message');
            if (field.value.trim()) {
                errorSpan.textContent = '';
                field.classList.remove('error');
            }
        });
    });
}
