import { TestContext } from "./ContextFile";
import { useContext } from "react";

function DeepList() {
  const { shit } = useContext(TestContext); // Достаём данные из контекста

  return (
    <div>
      <p>This is another DeepList with</p>
    </div>
  );
}

export default DeepList;
