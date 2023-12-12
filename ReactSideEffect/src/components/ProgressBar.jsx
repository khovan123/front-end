import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [timeReamain, setTimeRemain] = useState(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemain((preTime) => preTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress value={timeReamain} max={timer} />;
}
