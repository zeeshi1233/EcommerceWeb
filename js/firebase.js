import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
 
  const firebaseConfig = {
    apiKey: "AIzaSyB9IJdACB2xKDr7UNB44-JVsJNqXvwcGDU",
    authDomain: "ecommercstore-96b02.firebaseapp.com",
    projectId: "ecommercstore-96b02",
    storageBucket: "ecommercstore-96b02.appspot.com",
    messagingSenderId: "954975901137",
    appId: "1:954975901137:web:669d1f86ef265169b63cf0",
    measurementId: "G-5NX8ND57QB"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
  const db=getFirestore(app);
  const storage=getStorage(app);
  export {auth,db,storage}