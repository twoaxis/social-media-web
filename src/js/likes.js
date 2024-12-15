function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (char) {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return char;
    }
  });
}
function fetchPosts() {
  const token = localStorage.getItem('token');

fetch('http://18.193.81.175/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(posts => {
      console.log("Posts received:", posts);
      renderPosts(posts);
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
}

function timeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000); // Time difference in seconds

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};


function renderPosts(posts) {
  const postsContainer = document.getElementById("posts");

  posts.forEach((post, index) => {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "p-3");
    postCard.innerHTML = `
        <div class="d-flex align-items-center mb-3" style="position: relative;">
            <span class="name">${escapeHTML(post.author.name)}</span>
            <img src="https://res.cloudinary.com/hkgcdokyp/image/upload/v1688973554/Application_Images/Man_Icon_gdtbii.png" 
                alt="User Image" 
                class="user-img me-3" 
                data-user-id="${post.author.id}" 
                style="position: relative; z-index: 1;">
            <div>
                <span class="username" data-user-id="${post.author.id}" style="font-size: small;">
                    @${escapeHTML(post.author.username)}
                </span>
                <span class="post-date" style="font-size: small; color: gray;">${timeAgo(post.createdAt)}</span>
            </div>
        </div>
        <p>${escapeHTML(post.content)}</p>
        <div class="actions">
            <div>
                <i class="bi bi-heart" data-index="${index}" data-post-id="${post.id}" 
                   style="color: ${post.isLiked ? 'black' : ''};"></i> 
                <span id="like-count-${index}">${post.likeCount}</span>
                <i class="bi bi-chat-right-text" data-index="${index}"></i> 
                <span id="comment-count-${index}">${post.comments.length}</span>
            </div>
        </div>
        <div class="comment-section" id="comments-${index}" style="display: none;">
            ${post.comments.map(comment => `
                <div class="comment-box">
                    <div>
                        <span style="font-weight: bold;">${escapeHTML(comment.author.name)}</span> 
                        <span style="font-size: small; color: gray;">${timeAgo(comment.createdAt)}</span>
                    </div>
                    <p>${escapeHTML(comment.content)}</p>
                </div>
            `).join("")}
        </div>
        <div class="comment-input">
            <input type="text" placeholder="Write a comment..." id="comment-input-${index}">
            <button class="btn custom-btn" data-index="${index}" data-post-id="${post.id}">comment</button>
        </div>
    `;
    const cont = document.getElementById('cont')
    cont.style.display = 'block'
    postsContainer.appendChild(postCard);
  });

  attachEventListeners(posts);
}

function attachEventListeners(posts) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("user-img") || event.target.classList.contains("username")) {
      const userId = event.target.getAttribute("data-user-id");
      window.location.href = `/profile/${userId}`;
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-heart")) {
      handleLikeEvent(event, posts);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      handleCommentEvent(event, posts);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("bi-chat-right-text")) {
      const index = event.target.getAttribute("data-index");
      const commentsSection = document.getElementById(`comments-${index}`);
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
    }
  });
}

function handleLikeEvent(event, posts) {
  const token = localStorage.getItem('token');
  const index = event.target.getAttribute("data-index");
  const postId = event.target.getAttribute("data-post-id");
  const post = posts[index];

  if (!post.isLiked) {
    fetch(`http://18.193.81.175/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          post.likeCount++;
          post.isLiked = true;
          event.target.style.color = "black";
          document.getElementById(`like-count-${index}`).textContent = post.likeCount;
        }
      })
      .catch(error => console.error("Error liking post:", error));
  } else {
    fetch(`http://18.193.81.175/posts/${postId}/unlike`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          post.likeCount--;
          post.isLiked = false;
          event.target.style.color = "";
          document.getElementById(`like-count-${index}`).textContent = post.likeCount;
        }
      })
      .catch(error => console.error("Error unliking post:", error));
  }
}

function handleCommentEvent(event, posts) {
  const token = localStorage.getItem('token');
  const index = event.target.getAttribute("data-index");
  const postId = event.target.getAttribute("data-post-id");
  const inputField = document.getElementById(`comment-input-${index}`);
  const commentText = inputField.value.trim();

  if (commentText) {
    fetch(`http://18.193.81.175/posts/${postId}/comment`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: commentText })
    })
      .then(response => response.json())
      .then(data => {
        const post = posts[index];
        post.comments.push({
          id: data.commentId,
          content: commentText,
          createdAt: new Date().toISOString(),
          author: {
            id: null,
            username: "CurrentUser",
            name: "Current User"
          }
        });
        inputField.value = "";
        document.getElementById(`comment-count-${index}`).textContent = post.comments.length;

        const commentsContainer = document.getElementById(`comments-${index}`);
        const newComment = document.createElement("div");
        newComment.classList.add("comment-box");
        newComment.innerHTML = `
          <div>
            <span style="font-weight: bold;">Current User</span> 
            <span style="font-size: small; color: gray;">@CurrentUser</span>
            <span style="font-size: small; color: gray;">${formatDate(new Date().toISOString())}</span>
          </div>
          <p>${commentText}</p>
        `;
        commentsContainer.appendChild(newComment);
      })
      .catch(error => console.error("Error posting comment:", error));
  }
}

fetchPosts();
