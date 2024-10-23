// signup.js

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fname = document.querySelector('#signupForm input[name="fname"]').value;
    const lname = document.querySelector('#signupForm input[name="lname"]').value;
    const uname = document.querySelector('#signupForm input[name="uname"]').value;
    const email = document.querySelector('#signupForm input[name="email"]').value;
    const password = document.querySelector('#signupForm input[name="password"]').value;
    const confirmPassword = document.querySelector('#signupForm input[name="com-password"]').value;
    const name = fname + " " +lname

    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    if (password !== confirmPassword) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = "Passwords do not match. Please try again." ;
        return;
    }

    // POST 
    axios.post('http://18.193.81.175/auth/signup', 
        { 
        name: name
        , username: uname
        , email: email
        , password 
        })
        .then(response => {
            console.log('Signup Success:', response.data);
            alert('Account created successfully!');
            localStorage.setItem('name', uname);
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            console.error('Signup Error:', error);
            if (error.response.status === 400) {
                errorMessage.innerHTML = '<strong>Invalid fields or name format!</strong> Please check your inputs.';
            } else if (error.response.status === 409) {
                errorMessage.innerHTML = '<strong>E-mail or username already taken!</strong> Please try again.';
            } else {
                errorMessage.innerHTML = '<strong>Signup failed!</strong> Please try again later.';
            }       
        });
});
