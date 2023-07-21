import { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const [windowDimension, setDimension] = useState({
    width: 0,
    height: 0,
  });
//   const [Btn, setBtn] = useState(false);

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    // This effect will be executed only on the client-side
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  return (
    <>
      {/* <button className="confetti-button" onClick={() => setBtn(!Btn)}>Ranking</button>
      {Btn && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
        
      ) } */}
      
      <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
    </>
  );
};

export default Confetti;
