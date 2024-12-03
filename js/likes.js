const posts = [
  { username: "TuQa Ahmed", content: "Hello ", likes: 0, comments: 0, userId: 1, userLiked: false, commentsList: [] },
  { username: "Toooqa Ahmed", content: "Hello Again", likes: 0, comments: 0, userId: 2, userLiked: false, commentsList: [] },
  { username: "TuQa Ahmed", content: "Hello ", likes: 0, comments: 0, userId: 1, userLiked: false, commentsList: [] },
  { username: "Toooqa Ahmed", content: "Hello Again", likes: 0, comments: 0, userId: 2, userLiked: false, commentsList: [] },  
  { username: "TuQa Ahmed", content: "Hello ", likes: 0, comments: 0, userId: 1, userLiked: false, commentsList: [] },
  { username: "Toooqa Ahmed", content: "Hello Again", likes: 0, comments: 0, userId: 2, userLiked: false, commentsList: [] },  
  { username: "Toooqa Ahmed", content: "Hello Again", likes: 0, comments: 0, userId: 2, userLiked: false, commentsList: [] }
];

const postsContainer = document.getElementById("posts");

posts.forEach((post, index) => {
  const postCard = document.createElement("div");
  postCard.classList.add("card", "p-3");
  postCard.innerHTML = `
      <div class="d-flex align-items-center mb-3">
          <img src="https://res.cloudinary.com/hkgcdokyp/image/upload/v1688973554/Application_Images/Man_Icon_gdtbii.png" alt="User Image" class="user-img me-3" data-user-id="${post.userId}">
          <span class="username" data-user-id="${post.userId}">${post.username}</span>
      </div>
      <p>${post.content}</p>
      <div class="actions">
          <div>
              <i class="bi bi-heart" data-index="${index}"></i> <span id="like-count-${index}">${post.likes}</span>
              <i class="bi bi-chat-right-text"></i> <span id="comment-count-${index}">${post.comments}</span>
          </div>
      </div>
      <div class="comment-section" id="comments-${index}">
          ${post.commentsList.map(comment => `<div class="comment-box">${comment}</div>`).join("")}
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
      if (!posts[index].userLiked) {
          posts[index].likes++;
          posts[index].userLiked = true;
          event.target.style.color = "black"; 
      } else {
          posts[index].likes--;
          posts[index].userLiked = false;
          event.target.style.color = ""; 
      }
      document.getElementById(`like-count-${index}`).textContent = posts[index].likes;
  }
});

document.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
      const index = event.target.getAttribute("data-index");
      const inputField = document.getElementById(`comment-input-${index}`);
      const commentText = inputField.value.trim();
      if (commentText) {
          posts[index].comments++;
          posts[index].commentsList.push(commentText);
          inputField.value = "";
          document.getElementById(`comment-count-${index}`).textContent = posts[index].comments;

          const commentsContainer = document.getElementById(`comments-${index}`);
          const newComment = document.createElement("div");
          newComment.classList.add("comment-box");
          newComment.textContent = commentText;
          commentsContainer.appendChild(newComment);
      }
  }
});
