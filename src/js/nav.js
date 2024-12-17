// Get the notification icon and dropdown elements
const notificationIcon = document.getElementById('notification-icon');
const notificationDropdown = document.getElementById('notificationDropdown');

// notifications
const notifications = [
    { title: "New Friend Request", description: "You have a new friend request from TuQaaa." },
    { title: "Post Liked", description: "Someone liked your post ." },
    { title: "Unread Messages", description: "You have .. unread messages in your inbox." },
    { title: "Latest Updates", description: "Check out the latest updates on your profile." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." }
];

// Function to render notifications
function renderNotifications() {
    notificationDropdown.innerHTML = '<h4>Notifications</h4>'; // Reset the dropdown content
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        notificationItem.innerHTML = `<strong>${notification.title} </strong> <br>${notification.description}</br>`;
        notificationDropdown.appendChild(notificationItem);
    });
}

// Toggle notification dropdown visibility on click
notificationIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    notificationDropdown.style.display = notificationDropdown.style.display === 'none' || notificationDropdown.style.display === '' ? 'block' : 'none';

    // Render notifications when the dropdown is displayed
    if (notificationDropdown.style.display === 'block') {
        renderNotifications();
    }
});

// Close the dropdown if clicking outside of it
document.addEventListener('click', (event) => {
    if (!notificationDropdown.contains(event.target) && event.target !== notificationIcon) {
        notificationDropdown.style.display = 'none';
    }
});

// search behavior 
// ^^^^^^^^^^^^^^^
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const suggestionBox = document.getElementById('suggestion-box');
    const searchContainer = document.querySelector('.nav-icons-center'); // This assumes the search bar is inside this container


    
    function showSearchInput() {
        searchIcon.style.display = 'none'; 
        searchInput.classList.add('visible');
        searchInput.focus(); 
    }

    // Function to hide the search input and show the search icon
    function hideSearchInput() {
        searchIcon.style.display = 'flex'; 
        searchInput.classList.remove('visible'); 
        searchInput.value = ''; 
        suggestionBox.style.display = 'none'; 
    }


    // Show the search input when the search icon is clicked
    searchIcon.addEventListener('click', function(event) {
        event.preventDefault();
        showSearchInput();
    });

    function capitalizeWords(str) {
        return str
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
            .join(' '); 
    }

    // Handle input and display suggestions
    searchInput.addEventListener('input', async function () {
        const query = searchInput.value.toLowerCase();
    
        try {
            
            const token = localStorage.getItem('token');
            const response = await axios.get('http://social.twoaxis.xyz/api/users/search', {
                headers: {
                    Authorization: `Bearer ${token}` 
                },
                params: { query: query }
            });
            
            const suggestions = response.data; 
            suggestionBox.innerHTML = ''; 
            if (query) {
                const filteredSuggestions = suggestions.filter(user =>
                    user.name.toLowerCase().includes(query)
                );
    
                filteredSuggestions.forEach(user => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = capitalizeWords(user.name); 
                    suggestionItem.addEventListener('click', function () {
                        redirectToSearchResult(user.name); 
                    });
                    suggestionBox.appendChild(suggestionItem);
                });
    
                suggestionBox.style.display = filteredSuggestions.length ? 'block' : 'none';
            } else {
                suggestionBox.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            suggestionBox.innerHTML = '<div class="error-message"></div>';
            suggestionBox.style.display = 'none';
        }
    });
    // Hide search input and show the search icon when the user presses Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            redirectToSearchResult(searchInput.value);
            hideSearchInput();
        }
    });

    // Redirect to searchResult.html
    function redirectToSearchResult(selectedName) {
        window.location.href = `searchResult.html?name=${selectedName}`;
    }

    // Close the search input if the user clicks anywhere outside the search container
    document.addEventListener('click', function(event) {
        if (!searchContainer.contains(event.target)) {
            hideSearchInput();
        }
    });

    // Close suggestion box if input is empty or user clicks outside of it
    document.addEventListener('click', function(event) {
        if (!suggestionBox.contains(event.target) && !searchInput.contains(event.target)) {
            suggestionBox.style.display = 'none';
        }
    });
});
document.addEventListener('click', (event) => {
    if (!notificationDropdown.contains(event.target) && event.target !== notificationIcon) {
        notificationDropdown.style.display = 'none';
    }
});

// Logout button
document.addEventListener('DOMContentLoaded', function () {
    const logoutIcon = document.querySelector('.bi-box-arrow-right');

    logoutIcon.addEventListener('click', async function (event) {
        event.preventDefault();

        try {
            // Get the token from local storage or a cookie (adjust as per your implementation)
            const token = localStorage.getItem('token'); // or `document.cookie` for cookies

            if (!token) {
                alert("You're not logged in.");
                return;
            }
            const response = await fetch('http://social.twoaxis.xyz/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                localStorage.removeItem('token'); 
                window.location.href = 'login.html';
            } else if (response.status === 401) {
                console.log('Invalid or missing token. Please log in again.');
                window.location.href = 'login.html';
            } else {
                console.log('An unexpected error occurred.');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            console.log('Failed to log out. Please try again later.');
        }
    });
});

// create Post 
const postFormOverlay = document.getElementById('post-form-overlay');

plusIcon.addEventListener('click', function () {
    postFormContainer.style.display = 'block';
    postFormOverlay.style.display = 'block';
    contentInput.focus();
});

document.addEventListener('click', function (event) {
    if (!postFormContainer.contains(event.target) && event.target !== plusIcon) {
        postFormContainer.style.display = 'none';
        postFormOverlay.style.display = 'none';
    }
});

