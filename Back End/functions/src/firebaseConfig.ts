import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "DOMAIN",
    projectId: "ID",
    storageBucket: "BUCKET",
    messagingSenderId: "SENDERID",
    appId: "APP_ID"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
