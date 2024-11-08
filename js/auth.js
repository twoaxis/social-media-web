// tokenValidation.js

// Function to decode JWT token and get the expiration time
function decodeToken(token) {
    const base64Url = token.split('.')[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 decode

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to validate the token by checking expiration
function validateToken() {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
        // If no token, redirect to login page
        window.location.href = 'login.html';
        return false;
    }

    // Decode the token and check for expiration
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp < currentTime) {
            // Token is expired
            localStorage.removeItem('token'); // Remove expired token
            window.location.href = 'login.html'; // Redirect to login
            return false;
        }
    }

    // Token is valid, proceed to API verification
    return true;
}

// Function to verify token with a protected API endpoint
function verifyTokenWithAPI() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // If no token, redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Make a request to a protected endpoint to verify token
    axios.get("http://18.193.81.175/posts", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        // If the response is successful, proceed with the page load
        console.log("Token is valid:", response.data);
    })
    .catch(error => {
        // If the token is invalid or expired, remove it and redirect to login
        console.error("Token verification failed:", error);
        localStorage.removeItem('token');
        window.location.href = 'login.html'; // Redirect to login page
    });
}

// Check token on page load
window.addEventListener('load', () => {
    if (validateToken()) {
        verifyTokenWithAPI(); // Proceed to API verification if token is valid
    }
});
