import { db,auth,storage } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


onAuthStateChanged(auth, (user) => {
    let name=document.getElementById("name")
    let pic=document.getElementById("user_pic")
    let email=document.getElementById("email")
    let phone=document.getElementById("phone")

    if (user) {
      const uid = user.uid;
      const q = query(collection(db, "users"), where("userId", "==", uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
name.innerText=change.doc.data().name;
pic.src=change.doc.data().pic;
email.innerText=change.doc.data().email;
phone.innerText=change.doc.data().number;

        console.log(change.doc.data());
        });
      });
      



    } else {
      location.replace("log.html")
    }
  });


  window.upd=()=>{


    
  }