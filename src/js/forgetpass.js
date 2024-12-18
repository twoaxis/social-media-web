document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forget-password-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
    }
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const name = "dummy"
    const username ="dummy"
    const password = "dummy"
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    // Validate email format
    if (!email || !validateEmailFormat(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    console.log('Submitting email for validation:', email);

    // API request to validate the email
    axios.post('http://social.twoaxis.xyz/api/auth/signup', {name, username, email, password })
        .catch((error) => {
            errorMessage.style.display = 'block';
            console.log('Error received:', error);

            if (error.response) {
                if (error.response.status === 409) {
                    const code = error.response.data.code;
                    console.log('Error code:', code);

                    if (code === 'auth/email-taken') {
                        // Email exists, proceed to the next page
                        localStorage.setItem('email', email); // Save email for later use
                        window.location.href = 'verifyCode.html';
                    } else {
                        alert('An unknown conflict occurred.');
                    }
                } else {
                    alert('Failed to validate the email. Please try again later.');
                }
            } else {
                console.error('No response from server:', error.message);
                alert('No response from the server. Please check your network connection.');
            }
        });
}

// Helper function to validate email format
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
