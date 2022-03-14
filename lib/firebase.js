// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj9ZK1Ii9Oqewi_AVnW2LmFLRcWsBvtGk",
  authDomain: "reactappscursos.firebaseapp.com",
  projectId: "reactappscursos",
  storageBucket: "reactappscursos.appspot.com",
  messagingSenderId: "431154747627",
  appId: "1:431154747627:web:a7c1a4650779de0de306ae",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
