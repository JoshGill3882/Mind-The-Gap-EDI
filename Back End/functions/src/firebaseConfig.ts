import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBRMmbmVLOBC-HYRSTwgND9-gLiJNw-Fo",
    authDomain: "edi-card-game.firebaseapp.com",
    projectId: "edi-card-game",
    storageBucket: "edi-card-game.appspot.com",
    messagingSenderId: "583613257711",
    appId: "1:583613257711:web:07d1d55d7a8ba10849481a"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
