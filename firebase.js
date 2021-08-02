import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBTWVgcx6QrhhrIjenKHFQpuM0xTxRN9t0",
    authDomain: "signal-clone-30444.firebaseapp.com",
    projectId: "signal-clone-30444",
    storageBucket: "signal-clone-30444.appspot.com",
    messagingSenderId: "91248833421",
    appId: "1:91248833421:web:a1dfbb20a8b21dbc0143c4"
};


let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
