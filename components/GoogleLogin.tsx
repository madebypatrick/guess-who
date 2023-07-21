import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

export const GoogleLogin = () => {
  const [user, setUser] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      if (result.user) {
        router.push("/play");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <div className="google-container">
        <button className="google-button-1" onClick={login}>
          <span>LOGIN with</span>
          <FcGoogle className="google-button" />
        </button>
      </div>
    </>
  );
};
