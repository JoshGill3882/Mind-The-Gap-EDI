import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (navigate, user, password) => {
  signInWithEmailAndPassword(auth, user, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      navigate("/admin");
    })
    .catch((error) => {
      alert("Username or Password is Incorrect.");
      navigate("/login");
    });
};
