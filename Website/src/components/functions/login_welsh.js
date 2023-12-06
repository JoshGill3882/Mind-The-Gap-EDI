import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login_welsh = async (navigate, user, password) => {
  signInWithEmailAndPassword(auth, user, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      navigate("/admin");
    })
    .catch((error) => {
      alert("Mae enw defnyddiwr neu gyfrinair yn anghywir.");
      navigate("/mewngofnodi");
    });
};
