
// =============================================================
// verfiy code section

document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for the "Send Code" button
    const sendCodeButton = document.getElementById('send-code');
    if (sendCodeButton) {
        sendCodeButton.addEventListener('click', sendVerificationCode);
    }

    // Code input fields (for auto-moving to next input on typing)
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
    });
});

// Function to send the verification code
function sendVerificationCode() {
    const email = localStorage.getItem('email');
    
    if (email) {
        // Show a loading message or spinner while sending the code (optional)
        console.log("Sending verification code to:", email);

        axios.post('http://18.193.81.175/auth/send-code', { email })
            .then(response => {
                console.log('Verification code sent:', response.data);
                // Optionally, show a success message
                alert('A verification code has been sent to your email!');
            })
            .catch(error => {
                console.error('Error sending verification code:', error);
                // Handle error (e.g., show an error message)
                alert('Failed to send the verification code. Please try again later.');
            });
    } else {
        console.error('No email found in localStorage');
        alert('No email found. Please try again.');
    }
}

// Function to verify the entered code
function verifyCode(event) {
    event.preventDefault();  // Prevent the form from submitting
    
    let verificationCode = '';
    document.querySelectorAll('.code-input').forEach(input => {
        verificationCode += input.value;
    });

    // Validate the code: Ensure it is exactly 6 digits
    if (verificationCode.length === 6 && /^[0-9]{6}$/.test(verificationCode)) {
        // Send code to the server for verification
        axios.post('http://18.193.81.175/auth/verify-code', {
            email: localStorage.getItem('email'),
            code: verificationCode
        })
        .then(response => {
            console.log('Code verified successfully:', response.data);
            // Optionally, redirect or notify the user
            window.location.href = 'success.html'; // Example success page
        })
        .catch(error => {
            console.error('Verification failed:', error);
            // Show error message if code is incorrect
            alert('Invalid verification code. Please try again.');
        });
    } else {
        alert('Please enter a valid 6-digit numeric code.');
    }
}
