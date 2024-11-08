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
