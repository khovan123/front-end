import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeOut }) {
  const [timeRemain, setTimeRemain] = useState(timer);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeOut();
    }, timer);
    return () => {
      clearTimeout(timeout);
    };
  }, [onTimeOut]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemain((pre) => pre - 50);
    }, 50);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress value={timeRemain} max={timer} />;
}
