// FIREBASE IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// YOUR CONFIG (PASTE HERE)



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiyhYvFd-VAZDZ4rE3IcyhR1xr9kf9rEc",
  authDomain: "snsbuilsers-blogs.firebaseapp.com",
  projectId: "snsbuilsers-blogs",
  storageBucket: "snsbuilsers-blogs.firebasestorage.app",
  messagingSenderId: "355994579103",
  appId: "1:355994579103:web:dcbbc597761c133e1e32aa",
  measurementId: "G-T0K9MBPWNP"
};



// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ADD BLOG
window.addPost = async function () {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  await addDoc(collection(db, "posts"), {
    title,
    content,
    date: new Date().toLocaleString()
  });

  alert("Blog Published!");
  loadPosts();
};

// LOAD BLOGS
async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const blogDiv = document.getElementById("blogs") || document.getElementById("postList");

  if (!blogDiv) return;

  blogDiv.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    let post = docSnap.data();

    blogDiv.innerHTML += `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>${post.date}</small>
      </div>
    `;
  });
}

// LOAD ON PAGE
loadPosts();