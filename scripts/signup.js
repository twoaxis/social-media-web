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

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
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
            // Redirect to login page after successful signup
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error('Signup Error:', error);
            alert('Signup failed. Please try again.');
        });
});
