import React, { useEffect, useState } from 'react';

type CountdownTimerProps = {
  duration: number;
  onTimeUp: () => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="countdown-timer">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default CountdownTimer;
