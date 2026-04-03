

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCiyhYvFd-VAZDZ4rE3IcyhR1xr9kf9rEc",
  authDomain: "snsbuilsers-blogs.firebaseapp.com",
  projectId: "snsbuilsers-blogs",
  storageBucket: "snsbuilsers-blogs.firebasestorage.app",
  messagingSenderId: "355994579103",
  appId: "1:355994579103:web:dcbbc597761c133e1e32aa",
  measurementId: "G-T0K9MBPWNP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBlogs() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const blogDiv = document.getElementById("blogs");

  blogDiv.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    let post = docSnap.data();

    blogDiv.innerHTML += `
      <div class="card">
        <img src="${post.imageUrl}" />
        <h2>${post.title}</h2>
        <p>${post.category || ""}</p>
        <a href="post.html?id=${docSnap.id}">Read More →</a>
      </div>
    `;
  });
}

loadBlogs();