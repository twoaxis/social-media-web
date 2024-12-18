const title = document.getElementById("title");
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("username");
const titleText = `Profile | ${userName}`;
const showFreinds = document.querySelector(".show-friends");
const friendsAll = document.querySelector(".friends-all");
const backdropFreinds = document.querySelector(".backdrop-friends");
title.innerText = titleText;

const postsContainer = document.querySelector(
  ".posts .posts-container .content"
);

const profileName = document.querySelector(".profile-name");
const followersCount = document.querySelector(".followers-count span");
const followingCount = document.querySelector(".following-count span");
const bio = document.querySelector(".bio p");

const followButton = document.querySelector(".follow-button");

const token = localStorage.getItem("token");

async function getPosts() {
  let state = {};

  try {
    const response = await axios.get(
      `http://social.twoaxis.xyz/api/users/${userName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    state = response.data;
    console.log(state);
  } catch (error) {
    console.error(error);
    return;
  }
  const postHTML = state.posts
    .map(
      ({
        content,
        author,
        isLiked
      }) => `
      <div style="background-color: #eee; border-radius: 7px; min-width: 100%;">
                  <div class="posts-content">
                    <div class="top" style="padding: 15px; padding-top: 20px;">
                      <div class="user-img">
                        <div class="post-info">
                          <p class="name">${author.name}</p>
                        </div>
                      </div>
                      <div class="description">
                        <p>
                          ${content}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="actions">
                    <button class="comment">
                      <img src="../icons/chat.svg" alt="icon" />comment</button
                    ><button class="like">
                      <img src="../icons/hand-thumbs-up.svg" alt="icon" />${isLiked ? "Liked" : "Like"}
                    </button>
                  </div>
                </div>
                `
    )
    .join("");

  postsContainer.innerHTML = postHTML;
  profileName.innerText = state.name;
  followersCount.innerText = state.followerCount;
  followingCount.innerText = state.followingCount;
  bio.innerText = state.bio;

  const commentBox = document.querySelector(".comments .box");

  // const commentsBox = state.posts.comments.map(({ content, name }) =>
  //   `<div class="comment">
  //   <div class="header">
  //    <h4>${name}</h4>
  //   </div>
  //   <div class="bio"><p>${content}</p></div>
  //   </div>`.join("")
  // );
}

getPosts();

setTimeout(() => {
  const likeButtons = document.querySelectorAll(".like");
  const commentButttons = document.querySelectorAll(".comment");
  const commentBox = document.querySelector(".comments");
  const deleteButton = document.querySelector(".delete");

  deleteButton.addEventListener("click", () => {
    commentBox.classList.remove("active");
  });

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {});
  });

  commentButttons.forEach((button) => {
    button.addEventListener("click", () => {
      commentBox.classList.add("active");
    });
  });
}, 900);

followButton.addEventListener("click", async () => {
  await axios
    .post(`http://social.twoaxis.xyz/api/users/${userName}/follow`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
});
