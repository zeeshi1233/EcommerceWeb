import { db,auth,storage } from "./firebase.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

window.reg=()=>{
let name=document.getElementById("fname");
let lname=document.getElementById("lname");
let phone=document.getElementById("num");
let gender=document.getElementById("gen");
let email=document.getElementById("email");
let password=document.getElementById("password");
let file=document.getElementById("pic");

if (name.value==""||lname.value==""||phone.value==""||gender.value==""||email.value==""||password.value==""||file.files.length == 0) {
    alert("Please Fill Ale Fields")
}
else{

    
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
      const user = userCredential.user;
      
      const storageRef = ref(storage, `images/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file.files[0]);
      uploadTask.on('state_changed', 
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
              case 'paused':
                  console.log('Upload is paused');
                  break;
                  case 'running':
                      console.log('Upload is running');
                      break;
                    }
                }, 
                (error) => {
                    console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        console.log('File available at', downloadURL);
                        await setDoc(doc(db, "users", user.uid), {
                            name:name.value,
            lastName:lname.value,
            number:phone.value,
            gender:gender.value,
            email:email.value,
    pic:downloadURL,
    userId:user.uid,
});

}).then(()=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'SignUp successfully'
    })
    .then(()=>{
        location.replace('log.html')
    })
})
}
);



      

})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
  })
  
  Toast.fire({
      icon: 'error',
      title:errorMessage
    })
});


}
}


window.log=()=>{
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
      const user = userCredential.user;
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: 'Login successfully'
        })
        .then(()=>{
            location.replace('index.html')
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  


}