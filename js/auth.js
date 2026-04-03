import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

// LOGIN
window.login = function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      alert("Login Failed");
    });
};

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};