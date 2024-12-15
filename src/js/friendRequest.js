const apiBaseUrl = 'http://18.193.81.175';
const token = localStorage.getItem('token'); // Retrieve token from local storage
let friendRequests = [];
let friends = [];

// Axios instance with default settings
const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

// Fetch friend requests from the API
async function fetchFriendRequests() {
    try {
        const response = await apiClient.get('/friends/requests');
        console.log('Friend Requests Response:', response.data); // Log response
        friendRequests = Array.isArray(response.data) ? response.data : [];
        displayFriendRequests();
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        friendRequests = []; // Fallback to empty array
        displayFriendRequests();
    }
}

// Fetch friends from the API
async function fetchFriends() {
    try {
        const response = await apiClient.get('/friends');
        console.log('Friends Response:', response.data); // Log response
        friends = Array.isArray(response.data) ? response.data : [];
        displayFriends();
    } catch (error) {
        console.error('Error fetching friends:', error);
        friends = []; // Fallback to empty array
        displayFriends();
    }
}

// Accept friend request
async function acceptRequest(requestUsername) {
    try {
        await apiClient.post(`/friends/${requestUsername}/accept`);
        await fetchFriendRequests();
        await fetchFriends();
    } catch (error) {
        console.error(`Error accepting friend request for ${requestUsername}:`, error);
    }
}

// Reject friend request
async function rejectRequest(requestUsername) {
    try {
        await apiClient.post(`/friends/${requestUsername}/reject`);
        await fetchFriendRequests();
    } catch (error) {
        console.error(`Error rejecting friend request for ${requestUsername}:`, error);
    }
}

// Send friend request
async function sendFriendRequest() {
    const friendUsername = document.getElementById('friend-username').value;
    console.log('Send Friend Request button clicked', friendUsername); // Debugging log
    if (friendUsername) {
        try {
            const response = await apiClient.put(`/friends/${friendUsername}`);
            console.log('Friend Request API Response:', response.data); // Log response
            document.getElementById('friend-username').value = ''; // Clear input
            await fetchFriendRequests(); // Refresh the requests list
        } catch (error) {
            console.error(`Error sending friend request to ${friendUsername}:`, error);
        }
    } else {
        alert('Please enter a valid username.');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('send-request').addEventListener('click', sendFriendRequest);
});


// Dynamic search for usernames
document.getElementById('friend-username').addEventListener('input', async function() {
    const query = this.value;
    if (query) {
        try {
            const response = await apiClient.get(`/users/search`, {
                params: { query }
            });
            displaySuggestions(response.data);
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
            document.getElementById('suggestions').innerHTML = '';
        }
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

// Display suggestions
function displaySuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(user => {
        const div = document.createElement('div');
        div.textContent = `${user.name} (${user.username})`; // Display name and username
        div.classList.add('suggestion-item');
        div.onclick = () => {
            document.getElementById('friend-username').value = user.username; // Set selected username
            suggestionsContainer.innerHTML = '';
        };
        suggestionsContainer.appendChild(div);
    });
}

// Display friend requests
function displayFriendRequests() {
    const requestsList = document.getElementById('requests-list');
    requestsList.innerHTML = '';

    friendRequests.forEach(request => {
        const li = document.createElement('li');
        li.textContent = `${request.name} (${request.username})`; // Display name and username
        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.classList.add('accept');
        acceptButton.onclick = () => acceptRequest(request.username);

        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.classList.add('reject');
        rejectButton.onclick = () => rejectRequest(request.username);

        li.appendChild(acceptButton);
        li.appendChild(rejectButton);
        requestsList.appendChild(li);
    });
}

// Display friends
function displayFriends() {
    const friendsList = document.getElementById('friends-list-ul');
    friendsList.innerHTML = '';

    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = `${friend.name} (${friend.username})`; // Display name and username
        friendsList.appendChild(li);
    });
}

// Initial fetch
fetchFriendRequests();
fetchFriends();
