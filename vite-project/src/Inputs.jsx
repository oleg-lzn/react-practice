import { useState } from "react";

function Inputs() {
  const [price, setPrice] = useState(0);

  // range input
  return (
    <div>
      <label>
        Price Range:
        <input
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          max="5000000"
          step="10000"
          name="price"
        />
        <output>{price}</output>
      </label>
      <label>
        Price Input
        <input
          type="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Price Input
        <input
          type="text"
          list="kek"
          id="kek"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <datalist id="kek">
          <option value="Ku"></option>
          <option value="Ka"></option>
          <option value="Ko"></option>
        </datalist>
      </label>
    </div>
  );
}

export default Inputs;
