import { TestContext, ThemeContext } from "./ContextFile";
import { createContext, useContext, useState } from "react";

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

const DataContext = createContext({ data: [], setData: () => {} });

const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);
  
  const value = {data, setData}

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export useDataContext = () => useContext(DataContext)


const SomeComponent = () => {
  const { data, setData } = useDataContext();

  const addItem = () => {
    setData((prevData) => [
      ...prevData,
      { id: data.length + 1, name: `Item ${data.length + 1}` },
    ]);
  };

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      <button onClick={addItem}>Добавить элемент</button>
    </div>
  );
};
