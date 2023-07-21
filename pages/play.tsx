import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Questions from "@/components/questions";
import Results from "@/components/Results";

const Play = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const getFirstName = (displayName: string | null) => {
    if (!displayName) return "";
    const names = displayName.split(" ");
    return names[0];
  };

  return (
    <>
      <div className="logout-button" onClick={handleLogout}>
        Logout
      </div>
      <div className="header">
        <div className="title">
          <h1>Guess who?</h1>
        </div>
        <div className="profile-photo">
          {user ? (
            <>
              <p>{user.displayName ? getFirstName(user.displayName) : ""}</p>{" "}
              <img src={user.photoURL || ""} alt="User Profile" />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <Questions />
      <Results />
    </>
  );
};

export default Play;
