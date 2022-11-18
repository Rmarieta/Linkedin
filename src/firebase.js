import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZTvExYxpiiyzDpmX3gLAbI7TR1gycEXo",
  authDomain: "linkedin-1e4d1.firebaseapp.com",
  projectId: "linkedin-1e4d1",
  storageBucket: "linkedin-1e4d1.appspot.com",
  messagingSenderId: "553758402442",
  appId: "1:553758402442:web:9394223dafb8fda57e0a73",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;
