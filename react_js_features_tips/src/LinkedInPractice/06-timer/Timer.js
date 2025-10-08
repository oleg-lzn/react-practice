import { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(60);
  useEffect(() => {
    const decrementTime = setInterval(
      () => setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)),
      1000
    );
    return () => {
      clearInterval(decrementTime);
    };
  }, []);
  return (
    <div>
      <h1>Time Remaining</h1>
      <h2>{time}</h2>
    </div>
  );
}
