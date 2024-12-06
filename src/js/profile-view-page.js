const title = document.getElementById("title");
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get("username");
const titleText = `Profile | ${userName}`;
const showFreinds = document.querySelector(".show-friends");
const friendsAll = document.querySelector(".friends-all");
const backdropFreinds = document.querySelector(".backdrop-friends");
title.innerText = titleText;
const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const firendsContainer = document.querySelector(
  ".friends .friends-content .content"
);

const postsContainer = document.querySelector(
  ".posts .posts-container .content"
);

const firendHtml = num
  .map(
    (d) => `<div>
    <img src="./img/pexels-italo-melo-881954-2379004.jpg" alt="img"/>
    <h4>italo</h4>
    </div>`
  )
  .join("");

const postHTML = num
  .map(
    (n) => `<div style="background-color: #eee; border-radius: 7px">
                  <div class="posts-content">
                    <div class="top" style="padding: 15px; padding-top: 20px;">
                      <div class="user-img">
                        <img
                          src="./img/pexels-italo-melo-881954-2379004.jpg"
                          alt="img"
                        />
                        <div class="post-info">
                          <p class="name">Italo</p>
                          <p class="time">10 h</p>
                        </div>
                      </div>
                      <div class="description">
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Velit quae exercitationem officiis dignissimo
                        </p>
                      </div>
                    </div>
                    <div class="post-img">
                      <img
                        src="./img/pexels-dreamypixel-547114.jpg"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div class="actions">
                    <button>
                      <img src="./icons/share.svg" alt="icon" />Share</button
                    ><button>
                      <img src="./icons/chat.svg" alt="icon" />comment</button
                    ><button>
                      <img src="./icons/hand-thumbs-up.svg" alt="icon" />Like
                    </button>
                  </div>
                </div>`
  )
  .join("");

firendsContainer.innerHTML = firendHtml;

postsContainer.innerHTML = postHTML;

showFreinds.addEventListener("click", () => {
  friendsAll.classList.toggle("active");
  backdropFreinds.classList.toggle("active");

  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
});

backdropFreinds.addEventListener("click", () => {
  friendsAll.classList.toggle("active");
  backdropFreinds.classList.toggle("active");

  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "";
  } else {
    document.body.style.overflow = "hidden";
  }
});
