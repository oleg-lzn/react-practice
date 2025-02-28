import { useState } from "react";

function InputComp() {
  const [price, setPrice] = useState(0);

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
    </div>
  );
}

export default InputComp;
