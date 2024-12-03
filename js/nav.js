const notificationIcon = document.getElementById('notification-icon');
const notificationDropdown = document.getElementById('notificationDropdown');
const token=localStorage.getItem("authToken");
// notifications
const notifications = [
    { title: "New Friend Request", description: "You have a new friend request from TuQaaa." },
    { title: "Post Liked", description: "Someone liked your post ." },
    { title: "Unread Messages", description: "You have .. unread messages in your inbox." },
    { title: "Latest Updates", description: "Check out the latest updates on your profile." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." },
    { title: "blablabla", description: "blablablablablabaaaaaa." }
];

// render notifications
function renderNotifications() {
    notificationDropdown.innerHTML = '<h4>Notifications</h4>'; 
    notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('notification-item');
        notificationItem.innerHTML = `<strong>${notification.title} </strong> <br>${notification.description}</br>`;
        notificationDropdown.appendChild(notificationItem);
    });
}

notificationIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    notificationDropdown.style.display = notificationDropdown.style.display === 'none' || notificationDropdown.style.display === '' ? 'block' : 'none';
    
    if (notificationDropdown.style.display === 'block') {
        renderNotifications();
    }
});

document.addEventListener('click', (event) => {
    if (!notificationDropdown.contains(event.target) && event.target !== notificationIcon) {
        notificationDropdown.style.display = 'none';
    }
});


const loginData = {
    email: 'salint@twoaxis.xyz',  
    password: 'nyc_the_coolest'  ,

  };
  fetch('http://18.193.81.175/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: 'salint@twoaxis.xyz', password: 'nyc_the_coolest' })
})
.then(response => response.json())
.then(data => {
    if (data.token) {
        console.log("Logged in successfully! Token:", data.token);
        localStorage.setItem('authToken', data.token);
    } else {
        console.error("Login failed:", data);
    }
})
.catch(error => console.error('Login Error:', error));

 
function getPosts(token) {
  fetch('http://18.193.81.175/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(posts => {
    console.log("Posts received:", posts);  
    displayPosts(posts);
  })
  .catch(error => console.error('Error retrieving posts:', error));
}

  function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; 
  
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3>${post.author.name} (@${post.author.username})</h3>
        <p>${post.content}</p>
        <small>Posted on: ${new Date(post.createdAt).toLocaleString()}</small>
      `;
      postsContainer.appendChild(postElement);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getPosts(token);  
    }
  });
  