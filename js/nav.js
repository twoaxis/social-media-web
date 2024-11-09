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
// ====================
document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');
    const suggestionBox = document.getElementById('suggestion-box');
    const searchContainer = document.querySelector('.nav-icons-center'); // This assumes the search bar is inside this container

    const suggestions = [
        "Ahmed Salah",
        "Bob Smith",
        "Charlie Brown",
        "David Wilson",
        "Eve Davis",
        "Frank Miller",
        "Ahmed",
        "Salah",
        "Radwan"
    ];

    // Function to show the search input and hide the search icon
    function showSearchInput() {
        searchIcon.style.display = 'none'; // Hide the search icon
        searchInput.classList.add('visible'); // Show the search input
        searchInput.focus(); // Focus on the input
    }

    // Function to hide the search input and show the search icon
    function hideSearchInput() {
        searchIcon.style.display = 'flex'; // Show the search icon again
        searchInput.classList.remove('visible'); // Hide the search input
        searchInput.value = ''; // Clear the search input
        suggestionBox.style.display = 'none'; // Hide the suggestions box
    }

    // Show the search input when the search icon is clicked
    searchIcon.addEventListener('click', function(event) {
        event.preventDefault();
        showSearchInput();
    });

    // Handle input and display suggestions
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        suggestionBox.innerHTML = ''; // Clear previous suggestions
        if (query) {
            const filteredSuggestions = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(query)
            );

            filteredSuggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', function() {
                    redirectToSearchResult(suggestion);
                });
                suggestionBox.appendChild(suggestionItem);
            });

            suggestionBox.style.display = filteredSuggestions.length ? 'block' : 'none';
        } else {
            suggestionBox.style.display = 'none';
        }
    });

    // Hide search input and show the search icon when the user presses Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            hideSearchInput();
            redirectToSearchResult(searchInput.value);
        }
    });

    // Redirect to the search results page with the selected name
    function redirectToSearchResult(selectedName) {
        window.location.href = `searchResult.html?name=${encodeURIComponent(selectedName)}`;
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

async function fetchUserData() {
    const token = 'Bearer YOUR_AUTH_TOKEN';
    try {
        document.getElementById('name').placeholder = 'Loading...';
        const response = await fetch('http://18.193.81.175/users/YOUR_USERNAME', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch user data.');
        
        const userData = await response.json();
        document.getElementById('name').value = userData.name || 'Guest User';
        document.getElementById('profilePic').value = userData.profilePic || 'img/default-profile.png';
    } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Unable to load profile. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', fetchUserData);

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const profilePic = document.getElementById('profilePic').value;
    const content = document.getElementById('content').value;
    const mediaFile = document.getElementById('media').files[0];
    let mediaHTML = '';

    if (mediaFile) {
        const mediaURL = URL.createObjectURL(mediaFile);
        if (mediaFile.type.startsWith('image/')) {
            mediaHTML = `<img src="${mediaURL}" class="media" alt="Post Media">`;
        } else if (mediaFile.type.startsWith('video/')) {
            mediaHTML = `<video src="${mediaURL}" class="media" controls></video>`;
        }
    }

    const postHTML = `
        <div class="post">
            <div class="post-header">
                <img src="${profilePic}" alt="Profile Picture" class="profile-pic">
                <strong>${name}</strong>
            </div>
            <p>${content}</p>
            ${mediaHTML}
            <div class="post-actions">
                <button class="like-button" onclick="likePost(this)">Like</button>
                <button onclick="toggleCommentBox(this)">Comment</button>
            </div>
            <div class="comments-section" style="display: none;">
                <input type="text" placeholder="Add a comment...">
                <button onclick="addComment(this)">Post Comment</button>
                <div class="comments-list"></div>
            </div>
        </div>
    `;

    document.getElementById('postsContainer').insertAdjacentHTML('beforeend', postHTML);
    document.getElementById('postForm').reset();

    // Cleanup media URL to avoid memory leaks
    if (mediaFile) {
        URL.revokeObjectURL(mediaURL);
    }
});

function toggleCommentBox(button) {
    const commentsSection = button.closest('.post').querySelector('.comments-section');
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

function addComment(button) {
    const commentInput = button.previousElementSibling;
    const commentText = commentInput.value;

    if (commentText.trim()) {
        const commentHTML = `<div class="comment">${commentText}</div>`;
        const commentsList = button.closest('.comments-section').querySelector('.comments-list');
        commentsList.insertAdjacentHTML('beforeend', commentHTML);
        commentInput.value = '';
    } else {
        alert('Please enter a comment.');
    }
}

function likePost(button) {
    // Toggle the text and background color for "Liked" state
    if (button.innerText === 'Like') {
        button.innerText = 'Liked';
        button.style.backgroundColor = '#4CAF50'; // Change to a green color for "Liked" state
    } else {
        button.innerText = 'Like';
        button.style.backgroundColor = ''; // Reset to default color
    }
}

// Character count update
document.getElementById('content').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').innerText = `${charCount}/500`;
});