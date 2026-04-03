// Default login
const defaultUser = {
  username: "admin",
  password: "1234"
};

// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === defaultUser.username && pass === defaultUser.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid login");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// CHECK LOGIN
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// ADD BLOG
function addPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    title: title,
    content: content,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Blog Published!");
  displayPosts();
}

// DISPLAY BLOGS (Dashboard)
function displayPosts() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let postList = document.getElementById("postList");

  if (!postList) return;

  postList.innerHTML = "";

  posts.forEach((post, index) => {
    postList.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${post.date}</small>
        <br>
        <button onclick="deletePost(${index})">Delete</button>
      </div>
    `;
  });
}

// DELETE BLOG
function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts();
}

// DISPLAY BLOGS (Public)
function loadBlogs() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let blogDiv = document.getElementById("blogs");

  if (!blogDiv) return;

  blogDiv.innerHTML = "";

  posts.reverse().forEach(post => {
    blogDiv.innerHTML += `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>${post.date}</small>
      </div>
    `;
  });
}

// LOAD FUNCTIONS
displayPosts();
loadBlogs();