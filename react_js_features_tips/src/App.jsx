import "./App.css";
import { useEffect, useState } from "react";
import { TestContext, ThemeContext } from "./ContextFile";
import { useContext } from "react";
import { customhook } from "../../hooks/pagination";
import ComponentWithReducer from "./Reducer";
import Memo from "./TestMemo";
import { getItems } from "../../api/api-calls";
import { useData } from "../../hooks/useData";
import Timer from "./timer";
import Table from "./Table_Search";
import RefPortalModal from "./Portals";
import Modal from "./Modal/Modal";
import AdvancedTimer from "./AdvancedTimer";
import Inputs from "./Inputs";
import DataInputSelect from "./DataInputSelect";
import ArrayActions from "./ArrayFunctions";
import TableComponent from "./Table/Table";
import DataListInput from "./DataListInput";

function App() {
  const { money, setMoney, food, setFood } = useContext(TestContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { currentItems, nextPage, prevPage, currentPage, totalPages } =
    customhook(10);
  const { data, loading, error, fetchData } = useData();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setMoney(16);
    console.log(money);
  }, []);

  const onClick = () => {
    fetchData(getItems());
  };

  function toggleModal() {
    setModalOpen(prev => (prev === false ? true : false));
  }

  function changeFood() {
    setFood(prevFood => (prevFood === "burger" ? "pizza" : "burger"));
  }

  function changeTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  function incrementMoney() {
    setMoney(prevValue => prevValue + 1);
  }

  function consoleLogger() {
    const obj = {};
    console.log(obj);
  }

  return (
    <>
      <ComponentWithReducer />
      <Memo />
      <Timer />
      <button type="button" onClick={incrementMoney}>
        Increment Money
      </button>
      <button type="button" onClick={changeFood}>
        Order Pizza
      </button>
      <p>Hello your bank account is {money} </p>
      <p>Hello your food is {food}</p>
      <button className="consoleLogger" onClick={consoleLogger}>
        Result
      </button>
      <button className="theme__change" onClick={changeTheme}>
        Change Theme
      </button>
      <Table />

      <button onClick={toggleModal}>Open Modal</button>
      {modalOpen && (
        <RefPortalModal>
          <Modal onClose={toggleModal} />
        </RefPortalModal>
      )}
      <AdvancedTimer />
      <DataListInput />
      <Inputs />
      <DataInputSelect />
      <ArrayActions />
      <TableComponent />
    </>
  );
}

export default App;
