document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('ref')
    const codeInputs = document.querySelectorAll('.code-input');
    if (ref==='login' || ref==='signup') {
        document.getElementById('verify').style.display = 'block';
    }
    else{
        document.getElementById('reset').style.display = 'block';
    }
    codeInputs.forEach((input, index) => {
        // Handle input events
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
    
        // Handle backspace events
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && input.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
    
    const sendCodeButton = document.getElementById('send-code'); //forget pass page 
    if (sendCodeButton) {
        sendCodeButton.addEventListener('click', verifyCode);
    }
});


// Function to verify the entered code
function verifyCode(event) {
    event.preventDefault();  
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';
    let verificationCode = '';
    document.querySelectorAll('.code-input').forEach(input => {
        verificationCode += input.value;
    });

    // Validate the code: Ensure it is exactly 6 digits
    if (verificationCode.length === 6 && /^[0-9]{6}$/.test(verificationCode)) {
        axios.post('http://social.twoaxis.xyz/api/auth/verifyemail', {
            sessionId: localStorage.getItem('sessionId'),
            code: verificationCode
        })
        .then(response => {
            console.log('Code verified successfully:', response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = 'index.html'; 
            localStorage.removeItem('sessionId');
            localStorage.removeItem('ref');
        })
        .catch(error => {
            errorMessage.style.display = 'block'
            console.error('Verification failed:', error);
            errorMessage.innerHTML = '<strong>Invalid verification code. Please try again.</strong>'
        });
    } else {
        errorMessage.style.display = 'block'
        errorMessage.innerHTML = '<strong>Please enter a valid 6-digit numeric code.</strong> ';
    }
}
