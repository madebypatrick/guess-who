import React, { useEffect } from "react";

interface CountdownTimerProps {
  timeRemaining: number;
  onTimesUp: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timeRemaining,
  onTimesUp,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        onTimesUp();
      }, timeRemaining * 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, onTimesUp]);

  return (
    <div id="progressContainer">
      <div
        id="progress"
        style={{
          width: `${(timeRemaining / 15) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default CountdownTimer;
