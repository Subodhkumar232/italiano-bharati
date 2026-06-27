// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyCcuIWWOqF1zgoCgKKgx6QJOTptE-CZYDs",

    authDomain: "student-payment-portal-780f6.firebaseapp.com",

    projectId: "student-payment-portal-780f6",

    storageBucket: "student-payment-portal-780f6.appspot.com",

    messagingSenderId: "796853998935",

    appId: "1:796853998935:web:f28a13bf695420ba365a12"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// Login
export async function login(email, password){

    return await signInWithEmailAndPassword(auth,email,password);

}

// Logout
export async function logout(){

    return await signOut(auth);

}

export { onAuthStateChanged, doc, getDoc };