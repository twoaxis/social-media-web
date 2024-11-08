// login.js

document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#signinForm input[name="email"]').value;
    const password = document.querySelector('#signinForm input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    // POST request to authenticate the user
    axios.post('http://18.193.81.175/auth/login', { email, password })
        .then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Login Success:', response.data);
            window.location.href = "nav.htm"; // Redirect to home page after login
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
