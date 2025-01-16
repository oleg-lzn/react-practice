import { TestContext } from "./ContextFile";
import { useContext } from "react";

function Nuvo() {
  const { setShit } = useContext(TestContext); // Достаём данные из контекста

  function changeShit() {
    setShit((prevShit) => "Very");
  }

  return (
    <button type="button" onClick={changeShit}>
      Press to change the shit state
    </button>
  );
}

export default Nuvo;
