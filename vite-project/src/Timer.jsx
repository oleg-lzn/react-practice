import { useState, useEffect } from "react";

export function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className="timer">{count}</p>;
}

export default Timer;
