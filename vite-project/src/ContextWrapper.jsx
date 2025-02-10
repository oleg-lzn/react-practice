import { TestContext, ThemeContext } from "./ContextFile";
import { useState } from "react";

export function ContextWrapper({ children }) {
  const [money, setMoney] = useState(0);
  const [food, setFood] = useState("burger");
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TestContext.Provider value={{ money, setMoney, food, setFood }}>
        {children}
      </TestContext.Provider>
    </ThemeContext.Provider>
  );
}
