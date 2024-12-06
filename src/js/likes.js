
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
}

fetch('http://18.193.81.175/posts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(response => response.json())
  .then(posts => {
    console.log("Posts received:", posts);
    const postsContainer = document.getElementById("posts");

    posts.forEach((post, index) => {
      const postCard = document.createElement("div");
      const postDate = timeAgo(post.createdAt)

      postCard.classList.add("card", "p-3");
      postCard.innerHTML = `
      <div class="d-flex align-items-center mb-3" style="position: relative;">
      <div>
      <span class="name" style="">${post.author.name}</span>
      <img src="https://res.cloudinary.com/hkgcdokyp/image/upload/v1688973554/Application_Images/Man_Icon_gdtbii.png" alt="User Image" class="user-img me-3" data-user-id="${post.author.id}" style="position: relative; z-index: 1;">
      
      <span class="username" data-user-id="${post.author.id}" style="font-size: small;"><u>@${post.author.username}</u></span>
      <span class="post-date" style="">${postDate} </span>
      </div>
          <p>${post.content}</p>
          <div class="actions">
              <div>
                  <i class="bi bi-heart" data-index="${index}" style="color: ${post.isLiked ? 'black' : ''};"></i> 
                  <span id="like-count-${index}">${post.likeCount}</span>
                  <i class="bi bi-chat-right-text"></i> 
                  <span id="comment-count-${index}">${post.comments.length}</span>
              </div>
          </div>
          <div class="comment-section" id="comments-${index}">
              ${post.comments.map(comment => `<div class="comment-box">${comment}</div>`).join("")}
          </div>
          <div class="comment-input">
              <input type="text" placeholder="Write a comment..." id="comment-input-${index}">
              <button class="btn custom-btn" data-index="${index}">Post</button>
          </div>
      `;
      postsContainer.appendChild(postCard);
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("user-img") || event.target.classList.contains("username")) {
        const userId = event.target.getAttribute("data-user-id");
        window.location.href = `/profile/${userId}`;
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("bi-heart")) {
        const index = event.target.getAttribute("data-index");
        const post = posts[index];

        if (!post.isLiked) {
          post.likeCount++;
          post.isLiked = true;
          event.target.style.color = "black";
        } else {
          post.likeCount--;
          post.isLiked = false;
          event.target.style.color = "";
        }

        document.getElementById(`like-count-${index}`).textContent = post.likeCount;
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const index = event.target.getAttribute("data-index");
        const inputField = document.getElementById(`comment-input-${index}`);
        const commentText = inputField.value.trim();
        if (commentText) {
          const post = posts[index];
          post.comments.push(commentText);
          inputField.value = "";
          document.getElementById(`comment-count-${index}`).textContent = post.comments.length;

          const commentsContainer = document.getElementById(`comments-${index}`);
          const newComment = document.createElement("div");
          newComment.classList.add("comment-box");
          newComment.textContent = commentText;
          commentsContainer.appendChild(newComment);
        }
      }
    });
  })
  .catch(error => {
    console.error("Error fetching posts:", error);
  });


