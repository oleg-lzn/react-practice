import { useState } from "react";

function Select() {
  const [price, setPrice] = useState("");
  return (
    <label htmlFor="">
      {" "}
      Check the prices
      <select
        value={price}
        id="price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      >
        <option value="">Pick the price </option>
        <option value="12 is in the console">12</option>
        <option value="44">44</option>
        <option value="51">51</option>
      </select>
    </label>
  );
}

export default Select;
