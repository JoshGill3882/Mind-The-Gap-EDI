import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig";

export default function PrivateRoute({ children }){
  let navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  if (loading) {}
  if (user) {
    return (children)
  } else {
    navigate("/login")
  }

}
