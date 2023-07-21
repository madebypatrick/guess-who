import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import CountdownTimer from "../components/CountdownTimer";
import { useRouter } from "next/router";

interface Question {
  id: string;
  imageUrl: string;
  options: string[];
  correctOptionIndex: number;
}

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<{
    [key: string]: number;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(15);
  const [score, setScore] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  const questionsCollectionRef = collection(db, "questions");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data: QuerySnapshot<DocumentData> = await getDocs(
          questionsCollectionRef
        );
        const formattedQuestions: Question[] = data.docs.map((doc) => ({
          id: doc.id,
          imageUrl: doc.data().imageUrl,
          options: doc.data().options,
          correctOptionIndex: doc.data().correctOptionIndex,
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion?.options || [];

  const totalQuestions = questions.length;

  const router = useRouter();

  const handleOptionClick = (questionId: string, optionIndex: number) => {
    if (selectedOptionIndices[questionId] !== undefined) {
      return;
    }

    setSelectedOptionIndices((prevSelected) => ({
      ...prevSelected,
      [questionId]: optionIndex,
    }));

    const isOptionCorrect =
      optionIndex ===
      questions.find((q) => q.id === questionId)?.correctOptionIndex;

    if (!isOptionCorrect) {
      setTimeout(() => {
        setSelectedOptionIndices((prevSelected) => ({
          ...prevSelected,
          [questionId]:
            questions.find((q) => q.id === questionId)?.correctOptionIndex ||
            -1,
        }));

        setWrongAnswers((prevWrong) => prevWrong + 1);
      }, 1000);
    } else {
      setScore((prevScore) => prevScore + 1);
      setCorrectAnswers((prevCorrect) => prevCorrect + 1);
    }
  };

  const handleNextButtonClick = () => {
    if (selectedOptionIndices[currentQuestion.id] !== undefined) {
      // If there are no more questions left
      if (currentQuestionIndex === totalQuestions - 1) {
        // Redirect to another page after the last question is answered
        router.push("/celebrate");
      } else {
        setCurrentQuestionIndex(
          (prevIndex) => (prevIndex + 1) % totalQuestions
        );
        setSelectedOptionIndices((prevSelected) => ({
          ...prevSelected,
          [currentQuestion.id]: -1,
        }));
        setTimeRemaining(15);
      }
    }
  };

  const handleTimesUp = () => {
    if (timeRemaining === 0 && currentQuestion) {
      handleOptionClick(currentQuestion.id, -1);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeRemaining > 0 && currentQuestion) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, currentQuestion]);

  useEffect(() => {
    if (timeRemaining === 0 && currentQuestion) {
      handleOptionClick(currentQuestion.id, -1);
    }
  }, [timeRemaining, currentQuestion]);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (!currentQuestion) {
    return <div>No questions available.</div>;
  }

  const scoreFraction = `${score}/${totalQuestions}`;

  return (
    <div className="questions-container">
      {/* Display the Question */}
      <div className="question">
        <div className="image-container">
          <img src={currentQuestion.imageUrl} alt="Question" />
        </div>
        <div className="options-container">
          {currentOptions.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className={`option ${
                selectedOptionIndices[currentQuestion.id] === optionIndex
                  ? optionIndex === currentQuestion.correctOptionIndex
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionClick(currentQuestion.id, optionIndex)}
            >
              <h4>{option}</h4>
            </div>
          ))}
        </div>
        <div className="score-container">
          <div className="score-fraction">
            <p>Score: {scoreFraction}</p>
          </div>
          <div className="correct-container">
            <p>Correct: {correctAnswers}</p>
          </div>
          <div className="wrong-container">
            <p>Wrong: {wrongAnswers}</p>
          </div>
        </div>
      </div>
      {/* Display the Timer */}
      <div className="timer-container">
        <CountdownTimer
          timeRemaining={timeRemaining}
          onTimesUp={handleTimesUp}
        />
      </div>
      <button
        className={`next-button ${
          selectedOptionIndices[currentQuestion.id] === undefined
            ? "inactive"
            : "active"
        }`}
        onClick={handleNextButtonClick}
        disabled={selectedOptionIndices[currentQuestion.id] === undefined}
      >
        NEXT
      </button>
    </div>
  );
};

export default Questions;
