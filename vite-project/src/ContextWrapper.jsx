import { TestContext } from "./ContextFile";
import { useState } from "react";

export function ContextWrapper(props) {
  const { children } = props;

  const [money, setMoney] = useState(0);
  const [food, setFood] = useState("burger");

  return (
    <TestContext.Provider value={{ money, setMoney, food, setFood }}>
      {children}
    </TestContext.Provider>
  );
}
