// Import the functions you need from the SDKs you need
//import { signInWithPopup, getRedirectResult, GoogleAuthProvider , signInWithRedirect, initializeApp, getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, linkWithCredential, EmailAuthProvider, signOut } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js"
//import { initializeApp } from "./node_modules/firebase/app/firebase-app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"
//import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "./node_modules/firebase/app/firebase-auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyD-4HV9w6vG-y6QGrIxgn8F10s7ugLcHYo",
      authDomain: "login-with-firebase-data-d447f.firebaseapp.com",
      projectId: "login-with-firebase-data-d447f",
      storageBucket: "login-with-firebase-data-d447f.appspot.com",
      messagingSenderId: "972550034552",
      appId: "1:972550034552:web:2fa6da4f5f6a7825d9098d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



//SIGN-IN WITH GOOGLE
//create google instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const user = auth.currentUser;
var admin = false;
var fundManager = false;
var applicant = false;

function registerUser(){
    //sign-in using small window prompt
    console.log('Hello1');
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log('yessir');
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        if(admin){
              console.log('Hello admin');
//window.location.href ='https://github.com/kmabasa212/sprint/src/admin.html';
window.location.href ='https://kmabasa212.github.io/sprint/admin.html'
        }else if(fundManager){
              console.log('Hello FundManager');
              window.location.href ='https://github.com/kmabasa212/sprint/src/fundmanager.html';
        }else{
              console.log('Hello Applicant');
              window.location.href ='https://github.com/kmabasa212/sprint/src/applicant.html';
        }
        
    }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}

const btn_submit_signup = document.getElementById('btn-submit-signup');

btn_submit_signup.addEventListener('click', ()=>{
    const userName = document.getElementById('fullname');
    const userEmail = document.getElementById('email');
    const userIDNum = document.getElementById('ID');
    const userReason = document.getElementById('Reason');
    const userRole = document.getElementById('Type');

    const role = userRole.value;
    if( role === "Admin"){
          console.log('Admin');
          admin = true;
          console.log(admin);
    }else if(role === "Fund-Manager"){
          console.log('fundmanager');
          fundManager = true;
          console.log(fundManager);
    }else{
          console.log('applicant')
          applicant = true;
          console.log(applicant)
    }

    if(userName.value && userEmail.value && userIDNum.value && userReason.value && userRole.value){
        registerUser();
    }
    //alert('Hello');
    
})
