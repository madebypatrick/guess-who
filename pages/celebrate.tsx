import { useRouter } from "next/router";
import Confetti from "@/components/Confetti";

const Celebrate = () => {
  const router = useRouter();

  const handlePlayButtonClick = () => {
    router.push("/play");
  };

  return (
    <>
      <Confetti />
      <div className="header">
        <div className="title">
          <h1>Guess who?</h1>
        </div>
      </div>{" "}
      <div className="play-button" onClick={handlePlayButtonClick}>
        PLAY
      </div>
    </>
  );
};

export default Celebrate;
