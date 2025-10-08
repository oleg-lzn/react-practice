import { useState, useEffect, useCallback } from "react";

const AdvancedTimer = () => {
  const [time, setTime] = useState("");
  const [color, setColor] = useState("purple");

  useEffect(() => {
    const timer = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="">Pick the Color</option>
        <option value="black">Black</option>
        <option value="blue ">Blue</option>
      </select>
      <Timer color={color} time={time} />
    </div>
  );
};

const Timer = ({ color, time }) => {
  return (
    <div style={{ color: color }}>{new Date(time).toLocaleTimeString()}</div>
  );
};

export default AdvancedTimer;
