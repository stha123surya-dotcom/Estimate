import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadPost() {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let post = docSnap.data();

    document.getElementById("postDetail").innerHTML = `
      <h1>${post.title}</h1>
      <img src="${post.imageUrl}" />
      <p>${post.content}</p>
    `;
  }
}

loadPost();