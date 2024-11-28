function decodeToken(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 

    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload)
    return JSON.parse(jsonPayload);
}


function validateToken() {
    const token = localStorage.getItem('token'); 

    if (!token) {
        
        window.location.href = 'login.html';
        return false;
    }

    
    const decoded = decodeToken(token);
    if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000); 
        if (decoded.exp < currentTime) {
            
            localStorage.removeItem('token'); 
            window.location.href = 'login.html'; 
            return false;
        }
    }

    
    return true;
}


function verifyTokenWithAPI() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        
        window.location.href = 'login.html';
        return;
    }

    
    axios.get("http://18.193.81.175/posts", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        // If the token is valid, display the content
        document.getElementById('loading').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        console.log("Token is valid:", response.data);
    })
    .catch(error => {
        
        console.error("Token verification failed:", error);
        localStorage.removeItem('token');
        window.location.href = 'login.html'; 
    });
}


window.addEventListener('load', () => {
    if (validateToken()) {
        verifyTokenWithAPI(); 
    }
});
