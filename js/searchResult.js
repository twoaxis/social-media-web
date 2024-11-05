// Function to retrieve query parameters from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Update the header with the selected search name
const selectedName = getQueryParameter('name');
if (selectedName) {
    document.getElementById('selected-name').textContent = `Results for "${selectedName}"`;
}

// Mock data for search results; replace with real data if needed
const results = [
    { name: "Ahmed mohamed", snippet: "Here's my latest post!", isFriend: true },
    { name: "Ahmed mohamed", snippet: "Here's my latest post!", isFriend: true },
    { name: "Ahmed Yassin", snippet: "Here's my latest post!", isFriend: true },
    { name: "Ahmed Salah", snippet: "Here's my latest post!", isFriend: true },
    { name: "Ahmed Raed", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed Salah", snippet: "Welcome to my profile", isFriend: false },
    { name: "Ahmed Helmy", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed Salah", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed", snippet: "Here's my latest post!", isFriend: false },
    { name: "Ahmed", snippet: "Here's my latest post!", isFriend: false },
    // Add more results as needed
];

// Populate the results container with result cards
const resultsContainer = document.getElementById('results-container');
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
    name.textContent = result.name;
    
    const snippet = document.createElement('div');
    snippet.classList.add('result-snippet');
    snippet.textContent = result.snippet;

    // Friend/Cancel Request/Message button
    const button = document.createElement('button');
    button.classList.add('friend-button');
    
    // Set initial button text and icon based on friend/request status
    if (result.isFriend) {
        button.innerHTML = `<i class="bi bi-chat-dots"></i> Message`; // Icon for Message
        button.classList.add('message');
    } else if (result.requestSent) {
        button.textContent = 'Cancel Request';
        button.classList.add('cancel-request');
    } else {
        button.textContent = 'Add Friend';
        button.classList.add('add');
    }
    // Toggle button behavior
    button.addEventListener('click', function() {
        if (!result.isFriend && !result.requestSent) {
            // Send friend request
            result.requestSent = true;
            button.textContent = 'Cancel Request';
            button.classList.replace('add', 'cancel-request');
        } else if (result.requestSent) {
            // Cancel friend request
            result.requestSent = false;
            button.textContent = 'Add Friend';
            button.classList.replace('cancel-request', 'add');
        } else {
            // Open message functionality if already friends
            alert(`Messaging ${result.name}`);
        }
    });

    // Append elements to the result card
    content.appendChild(name);
    content.appendChild(snippet);
    resultCard.appendChild(avatar);
    resultCard.appendChild(content);
    resultCard.appendChild(button);
    resultsContainer.appendChild(resultCard);
});