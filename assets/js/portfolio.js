// Form Validation
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = document.getElementById('subject').value;
    
    // Reset error messages
    clearErrors();
    
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Message validation
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        showSuccessMessage();
        // Reset form
        document.getElementById('contact').reset();
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff3366';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff3366';
}

function clearErrors() {
    const errorMessages = document.getElementsByClassName('error-message');
    while(errorMessages[0]) {
        errorMessages[0].parentNode.removeChild(errorMessages[0]);
    }
    
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.style.marginTop = '20px';
    successDiv.textContent = 'Thank you for your message! I will get back to you soon.';
    document.getElementById('contact').appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Typing effect for the main banner
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Project counter
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        const increment = target / speed;
        
        let count = 0;
        
        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add form validation
    const contactForm = document.getElementById('contact');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    // Add typing effect to main heading
    const mainHeading = document.querySelector('.caption h2');
    if (mainHeading) {
        typeWriter(mainHeading, 'Arron Clark Bello');
    }
    
    // Initialize project counters
    startCounters();
});