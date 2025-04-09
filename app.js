import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7yIR6fCdu2BwwVnRnzWphcqSS9FLHPn4",
  authDomain: "resume-generator-c1867.firebaseapp.com",
  projectId: "resume-generator-c1867",
  storageBucket: "resume-generator-c1867.firebasestorage.app",
  messagingSenderId: "234582470435",
  appId: "1:234582470435:web:f4087d012a20c0f23ee696",
  measurementId: "G-YCL2H743QR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign Up
document.getElementById("sign-up")?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Sign up successfully!!");
        window.location.href = "login.html";
    })
    .catch((error) => {
        alert(error.message);
    })
});

// Login
document.getElementById("login")?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        alert("Login successfully!!");
        window.location.href = "dashboard.html";
    })
    .catch((error) => {
        alert(error.message);
    });
});

// Google Login
document.getElementById("google-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then(() => {
        alert("Logged in successfully!!");
        window.location.href = "dashboard.html";
    })
    .catch((error) => {
        alert(error.message);
    })
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
        alert("Logged Out Successfully!");
        window.location.href = "login.html";
    })
    .catch((error) => {
        alert(error.message);
    });
});

// Password Reset
document.getElementById('reset')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset link sent!");
        document.getElementById('email').value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
});
