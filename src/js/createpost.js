document.addEventListener('DOMContentLoaded', function () {
    const plusIcon = document.getElementById('plus-icon'); // The plus icon to trigger the post form
    const postFormContainer = document.getElementById('post-form-container'); // The container for the post form
    const postForm = document.getElementById('postForm'); // The form element itself
    const contentInput = document.getElementById('content'); // Input for post content
    const charCount = document.getElementById('charCount'); // Character count element
    const closeButton = document.getElementById('close-button'); // Close button for the post form
    const homePageContent = document.getElementById('cont'); // The home page content to blur
    const postFormOverlay = document.getElementById('post-form-overlay'); // Overlay for the post form

    const apiBaseUrl = 'http://social.twoaxis.xyz/api'; // Base URL for API requests

    // Show the post form when the plus icon is clicked
    plusIcon.addEventListener('click', function () {
        postFormContainer.style.display = 'block';
        postFormOverlay.style.display = 'block'; // Show overlay
        homePageContent.style.filter = 'blur(5px)'; // Blur the home page content
        contentInput.focus();
    });

    // Hide the post form when the close button is clicked
    closeButton.addEventListener('click', function () {
        postFormContainer.style.display = 'none';
        postFormOverlay.style.display = 'none'; // Hide overlay
        homePageContent.style.filter = 'none'; // Remove blur from the home page content
    });

    // Hide the post form when clicking outside it
    document.addEventListener('click', function (event) {
        if (!postFormContainer.contains(event.target) && event.target !== plusIcon) {
            postFormContainer.style.display = 'none';
            postFormOverlay.style.display = 'none'; // Hide overlay
            homePageContent.style.filter = 'none'; // Remove blur from the home page content
        }
    });

    // Update character count on input
    contentInput.addEventListener('input', function () {
        const charCountValue = this.value.length;
        charCount.textContent = `${charCountValue}/500`;
    });

    // Handle form submission to create a new post
    postForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const content = contentInput.value.trim();
        if (!content) {
            alert('Post content cannot be empty!');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to create a post.');
                return;
            }

            const response = await fetch(`${apiBaseUrl}/posts`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                const responseData = await response.json();
                window.location.reload()
                postForm.reset();
                charCount.textContent = '0/500';
                postFormContainer.style.display = 'none';
                postFormOverlay.style.display = 'none'; // Hide overlay
                homePageContent.style.filter = 'none'; // Remove blur from the home page content
            } else if (response.status === 400) {
                alert('Missing or incorrect fields.');
            } else if (response.status === 401) {
                alert('Missing or invalid token. Please log in again.');
                window.location.href = 'login.html';
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again later.');
        }
    });
});
