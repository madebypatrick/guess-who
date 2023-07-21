import { GoogleLogin } from "@/components/GoogleLogin";
import { Login } from "@/components/Login";

export default function Home() {
  return (
    <>
      <div className="title">
        <h1>Guess who?</h1>
      </div>
      <div className="container">
        <div className="left-side">
          <p>
            Welcome to the "GUESS WHO?" game! <br></br>
            <br></br>Are you ready to put your knowledge of famous personalities
            to the test? <br></br>
            <br></br>In this exciting game, you'll be presented with pictures of
            renowned individuals from various categories such as musicians,
            politicians, artists, and movie actors. <br></br>
            <br></br>Your challenge is to correctly identify the famous person
            from a set of four names provided;<b> (in 15 seconds)</b>. <br></br>
            <br></br>With each correct answer, you'll advance to the next
            question, earning points and unlocking new challenges. <br></br>
            <br></br>Get ready to have fun and expand your knowledge in the
            "GUESS WHO?" game!
          </p>
        </div>
        <div className="right-side">
          <h1>USER LOGIN</h1>
          <Login />
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}
