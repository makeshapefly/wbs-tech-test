import { initializeApp } from 'firebase/app'; 
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-Px2umFreQ2t9ctC0OMCRH79wQJGdE9U",
    authDomain: "wbs-tech-test.firebaseapp.com",
    projectId: "wbs-tech-test",
    storageBucket: "wbs-tech-test.appspot.com",
    messagingSenderId: "228206073038",
    appId: "1:228206073038:web:ec52f43639e9d942d2ac9f"
};

const app = initializeApp(firebaseConfig)

//init firestore
const auth = getAuth(app)
const db = getFirestore(app);
setPersistence(auth, browserSessionPersistence) //use this to log out the user after each browser session

export { auth, db }