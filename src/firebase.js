// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpzjtLh72Fr2zIs579HkcHLEJJSy83hjY",
    authDomain: "concertbudgetapp.firebaseapp.com",
    databaseURL: "https://concertbudgetapp-default-rtdb.firebaseio.com",
    projectId: "concertbudgetapp",
    storageBucket: "concertbudgetapp.appspot.com",
    messagingSenderId: "310028293203",
    appId: "1:310028293203:web:3e8528b042bc3c9be262a6"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
