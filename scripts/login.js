// signin.js
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('#signinForm input[name="email"]').value;
    const password = document.querySelector('#signinForm input[name="password"]').value;

    // POST
    axios.post('http://18.193.81.175/auth/login', 
        { 
            email : email
            , password: password 
        })
        .then(response => {
            console.log('Login Success:', response.data);
            alert('Login successful!');
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error('Login Error:', error);
            alert('Login failed. Please check your credentials.');
        });
});
