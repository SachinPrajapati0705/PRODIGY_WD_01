// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const top = section.offsetTop - 50;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
            const id = section.getAttribute('id');
            const navLinks = document.querySelectorAll('nav ul li a');

            navLinks.forEach(link => {
                if (link.getAttribute('href').slice(1) === id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
});

// Show/hide mobile navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Close mobile navigation menu when a link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.btn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            submitBtn.classList.add('submitting'); // Apply submission animation
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(function () {
                submitBtn.classList.remove('submitting'); // Remove submission animation
                displaySuccessMessage();
                resetForm();
            }, 2000);
        }
    });

    function validateForm() {
        let isValid = true;
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name.');
            isValid = false;
        }
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message.');
            isValid = false;
        }
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorSpan = input.nextElementSibling.nextElementSibling;
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }

    function displaySuccessMessage() {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Message sent successfully!';
        successMessage.classList.add('success-message');
        form.appendChild(successMessage);
        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);
    }

    function resetForm() {
        form.reset();
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (error) {
            error.style.display = 'none';
        });
    }
});
