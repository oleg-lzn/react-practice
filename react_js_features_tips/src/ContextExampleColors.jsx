import React, { useContext, useState } from "react";

const colorContext = React.createContext({
  chosenColor: "grey",
  setColor: () => {},
});

function ColorPicker() {
  const { setColor } = useContext(colorContext);

  const colors = ["red", "blue", "yellow", "green", "black", "white", "purple"];
  return (
    <div>
      <h1>Choose a color</h1>
      {colors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color, cursor: "pointer" }}
          onClick={() => setColor(color)}
        />
      ))}
    </div>
  );
}

function Pixel() {
  const { chosenColor } = useContext(colorContext);
  const [pixelColor, setPixelColor] = useState("gray");

  return (
    <div
      style={{
        height: "20px",
        width: "20px",
        backgroundColor: pixelColor,
        margin: "1px",
      }}
      onClick={() => setPixelColor(chosenColor)}
    />
  );
}

function Pixels() {
  const pixels = [];
  for (let i = 0; i < 100; i++) pixels.push(<Pixel key={i} />);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        width: "210px",
        margin: "0 auto",
      }}
    >
      {pixels}
    </div>
  );
}

export default function PixelArt() {
  const [chosenColor, setColor] = useState("blue");

  return (
    <div>
      <colorContext.Provider value={{ chosenColor, setColor }}>
        <ColorPicker />
        <Pixels />
      </colorContext.Provider>
    </div>
  );
}
