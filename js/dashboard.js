import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const storage = getStorage(app);

// ADD POST WITH IMAGE
window.addPost = async function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const file = document.getElementById("image").files[0];
  const category = document.getElementById("category").value;

  let imageUrl = "";

  if (file) {
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "posts"), {
  title,
  content,
  category,
  imageUrl,
  date: new Date().toISOString()
});

  alert("Posted!");
  loadPosts();
};

// LOAD POSTS
async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const postList = document.getElementById("postList");

  postList.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    let post = docSnap.data();

    postList.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <img src="${post.imageUrl}" width="100%">
        <p>${post.content}</p>
        <button onclick="deletePost('${docSnap.id}')">Delete</button>
      </div>
    `;
  });
}

// DELETE
window.deletePost = async function (id) {
  await deleteDoc(doc(db, "posts", id));
  loadPosts();
};

loadPosts();
window.editPost = async function (id) {
  const newTitle = prompt("New Title:");
  const newContent = prompt("New Content:");

  await updateDoc(doc(db, "posts", id), {
    title: newTitle,
    content: newContent
  });

  loadPosts();
};