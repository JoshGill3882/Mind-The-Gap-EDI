import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBRMmbmVLOBC-HYRSTwgND9-gLiJNw-Fo",
  authDomain: "edi-card-game.firebaseapp.com",
  projectId: "edi-card-game",
  storageBucket: "edi-card-game.appspot.com",
  messagingSenderId: "583613257711",
  appId: "1:583613257711:web:07d1d55d7a8ba10849481a"
};

export const app = initializeApp(firebaseConfig); // Intializing the app
export const auth = getAuth(app); // Gettting Authentication
export const functions = getFunctions(app); // Getting Cloud Functions
export const storage = getStorage(app);
