import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";
import { motorcycles } from "../constants/motorcycles";
import { createContext } from "react";

export const motoContext = createContext({
  motos: [],
});

const TableComponent = () => {
  return (
    <table>
      <caption> Some Table </caption>
      <TableHeader />
      <motoContext.Provider value={{ motos: motorcycles }}>
        <TableBody />
      </motoContext.Provider>
      <TableFooter />
    </table>
  );
};

export default TableComponent;
