function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function capitalizeWords(str) {
    return str
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}

// Fetch search results from the API
async function fetchSearchResults(name) {
    try {
        const token = localStorage.getItem('token'); 

        // Make a GET request to the API with the query parameter
        const response = await axios.get('http://social.twoaxis.xyz/api/users/search', {
            headers: {
                Authorization: `Bearer ${token}` // Add the bearer token for authentication
            },
            params: { query: name }
        });

        // Return the fetched results
        return response.data; // API response should be an array of users
    } catch (error) {
        console.error('Error fetching search results:', error);
        alert('An error occurred while fetching search results.');
        return [];
    }
}

// Fetch follow status for a user
async function fetchFollowStatus(username) {
    try {
        const token = localStorage.getItem('token');

        // Make a GET request to fetch user profile data
        const response = await axios.get(`http://social.twoaxis.xyz/api/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Return the isFollowing status from the response
        return response.data.isFollowing;
    } catch (error) {
        console.error(`Error fetching follow status for ${username}:`, error);
        return false; // Default to not following in case of error
    }
}

// Display results dynamically
async function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear any previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    for (const result of results) {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');

        // Avatar placeholder
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');

        // Content for name and snippet
        const content = document.createElement('div');
        content.classList.add('result-content');

        const name = document.createElement('div');
        name.classList.add('result-name');
        name.textContent = capitalizeWords(result.name);

        const snippet = document.createElement('div');
        snippet.classList.add('result-snippet');
        snippet.textContent = `@${result.username}`;

        // Friend/Message button
        const button = document.createElement('button');
        button.classList.add('friend-button');

        // Fetch and set the initial follow status
        const isFollowing = await fetchFollowStatus(result.username);
        if (isFollowing) {
            button.textContent = 'Message';
            button.classList.add('message');
            button.setAttribute('data-following', 'true');
        } else {
            button.textContent = 'Follow';
            button.classList.add('add');
            button.setAttribute('data-following', 'false');
        }

        // Append elements to the result card
        content.appendChild(name);
        content.appendChild(snippet);
        resultCard.appendChild(avatar);
        resultCard.appendChild(content);
        resultCard.appendChild(button);
        resultsContainer.appendChild(resultCard);

        // Add click event to toggle follow status
        button.addEventListener('click', () => {
            const isFollowing = button.getAttribute('data-following') === 'true';
            toggleFollow(result.username, isFollowing, button);
        });
    }
}

// Toggle follow status
async function toggleFollow(username, isFollowing, button) {
    try {
        const token = localStorage.getItem('token');

        // Determine the API endpoint based on follow status
        const endpoint = isFollowing
            ? `http://social.twoaxis.xyz/api/users/${username}/unfollow`
            : `http://social.twoaxis.xyz/api/users/${username}/follow`;

        // Make the POST request to toggle follow status
        await axios.post(endpoint, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Update button text and data-following attribute
        if (isFollowing) {
            button.textContent = 'Follow';
            button.classList.remove('message');
            button.classList.add('add');
            button.setAttribute('data-following', 'false');
        } else {
            button.textContent = 'Message';
            button.classList.remove('add');
            button.classList.add('message');
            button.setAttribute('data-following', 'true');
        }
    } catch (error) {
        console.error(`Error toggling follow status for ${username}:`, error);
        alert('An error occurred while toggling follow status.');
    }
}

// Load and display search results when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const selectedName = getQueryParameter('name'); // Get the search query from URL
    if (selectedName) {
        document.getElementById('selected-name').textContent = `Results for "${selectedName}"`;
        const results = await fetchSearchResults(selectedName); // Fetch results from API
        displayResults(results); // Populate results on the page
    } else {
        document.getElementById('selected-name').textContent = 'No search query provided.';
    }
});
