import { useContext } from "react";
import { motoContext } from "./Table";

const TableData = () => {
  const { motos } = useContext(motoContext);

  return (
    <>
      {motos.map(({ brand, model, id, horsepower }) => {
        return (
          <tr key={id}>
            <td>{brand}</td>
            <td>{model}</td>
            <td>{horsepower}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TableData;
