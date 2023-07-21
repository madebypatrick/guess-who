
import { useState } from "react";
import Confetti from "./Confetti";

const Results = () => {
  const [showModal, setShowModal] = useState(false);

  const handleHowToClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="results-buttons">
      <div className="howto-button" onClick={handleHowToClick}>
        How To?
      </div>
      {/* <div className="score-button">Score</div> */}
      <div className="ranking-button">Ranking</div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p className="back-button" onClick={handleCloseModal}>
              +
            </p>
            <h2>HOW TO PLAY</h2>
            <p>
              Your challenge is to correctly identify the famous person from a
              set of four names provided;<b> (in 15 seconds)</b>.
            </p>
            <p>
              With each correct answer, you'll advance to the next question,
              earning points and unlocking new challenges.
            </p>
            <div className="modal-buttons">
              <div className="specific-route-button" onClick={handleCloseModal}>
                PLAY
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;