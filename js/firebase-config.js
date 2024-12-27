const firebaseConfig = {
    apiKey: "AIzaSyD9rkq14fzL3_20GUwPoPLg1IyJ0ufu1rw",
    authDomain: "appmanu-35671.firebaseapp.com",
    projectId: "appmanu-35671",
    storageBucket: "appmanu-35671.firebasestorage.app",
    messagingSenderId: "973453079153",
    appId: "1:973453079153:web:06e0944351087554ed61d0",
    measurementId: "G-6P3C915PCY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 