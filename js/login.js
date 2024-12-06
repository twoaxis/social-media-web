// login.js

document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#signinForm input[name="email"]').value;
    const password = document.querySelector('#signinForm input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');
    const timeout = document.getElementById('timeout');
    errorMessage.style.display = 'none';
    timeout.style.display = 'none';
    errorMessage.innerHTML = '';

    // POST request to authenticate the user
    axios.post('http://18.193.81.175/auth/login', { email, password })
        .then(response => {
            const status = response.data.status;
            if (status == 'complete') {
                localStorage.setItem('token', response.data.token);
                console.log('Login Success:', response.data);
                window.location.href = "index.html"; // Redirect to home page after login
            }
            else{
                const sessionId = response.data.sessionId;
                sessionStorage.setItem('sessionId', sessionId);
                localStorage.setItem('ref', 'login');
                window.location.href = "verifyCode.html"
            }
            
        })
        .catch(error => {
            console.error('Login Error:', error);
            errorMessage.style.display = 'block';
            if (error.response && error.response.status === 400) {
                errorMessage.innerHTML = '<strong>Missing or incorrect fields!</strong> Please check your inputs.';
            } else if (error.response && error.response.status === 401) {
                errorMessage.innerHTML = '<strong>Invalid email or password!</strong> Please try again.';
            } else {
                errorMessage.innerHTML = '<strong>Login failed!</strong> Please try again later.';
            }
        });
});

window.addEventListener('load', () => {
    if (localStorage.getItem('ref') ==='timeout') {
        timeout.style.display = 'block';
        setTimeout(() => {
            timeout.style.display = 'none';
        }, 5000); 
        localStorage.removeItem('ref')
    }
});
