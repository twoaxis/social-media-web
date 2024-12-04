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
        const response = await axios.get('http://18.193.81.175/users/search', {
            headers: {
                Authorization: `Bearer ${token}` // Add the bearer token for authentication
            },
            params: { query:name }
        });

        // Return the fetched results
        return response.data; // API response should be an array of users
    } catch (error) {
        console.error('Error fetching search results:', error);
        alert('An error occurred while fetching search results.');
        return [];
    }
}

// Display results dynamically
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear any previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
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
        button.textContent = 'Message';
        button.classList.add('message');

        // Append elements to the result card
        content.appendChild(name);
        content.appendChild(snippet);
        resultCard.appendChild(avatar);
        resultCard.appendChild(content);
        resultCard.appendChild(button);
        resultsContainer.appendChild(resultCard);
    });
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
