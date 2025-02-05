import "./App.css";
import { useEffect, useState } from "react";
import { TestContext } from "./ContextFile";
import { useContext } from "react";
import { customhook } from "../../hooks/getItems";
import { Portals } from "./Portals";
import ComponentWithReducer from "./Reducer";
import Memo from "./TestMemo";
import { getItems } from "../../api/api-calls";
import { useData } from "../../hooks/useData";

function App() {
  const { money, setMoney, food, setFood } = useContext(TestContext);
  const { currentItems, nextPage, prevPage, currentPage, totalPages } =
    customhook(10);
  const { data, loading, error, fetchData } = useData();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onClick = () => {
    fetchData(getItems());
  };

  function changeFood() {
    setFood((prevFood) => (prevFood === "burger" ? "pizza" : "burger"));
  }

  function incrementMoney() {
    setMoney((prevValue) => prevValue + 1);
  }

  return (
    <>
      <Portals></Portals>

      <div>
        <ul className="comments">
          {currentItems.map((item) => (
            <li className="comments_item" key={item.id}>
              {item.title}
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      <ComponentWithReducer />
      <Memo />
    </>
  );
}

export default App;

{
  /* //   <button type="button" onClick={incrementMoney}>
    //     Increment Money
    //   </button>
    //   <button type="button" onClick={changeFood}>
    //     Order Pizza
    //   </button>
    //   <p>Hello your bank account is {money} </p>
    //   <p>Hello your food is {food}</p> */
}
