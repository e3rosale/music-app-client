import React, { useEffect } from "react";
import { firebaseAuth } from '../config/firebase.config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from "react-router-dom";
import { LoginBg } from "../assets/video";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const userCred = await signInWithPopup(firebaseAuth, provider);

    if (userCred) {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user) {
          navigate("/", { replace: true });
        } else {
          navigate("/login")
        }
      });
    }
  }

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <video src={LoginBg} type="video/mp4" autoPlay muted loop className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-out" onClick={loginWithGoogle}>
            <FcGoogle className="text-xl"/>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;