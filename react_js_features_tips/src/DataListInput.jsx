import { useState } from "react";

const DataListInput = () => {
  const [city, setCity] = useState("");

  const cityOptions = ["Tel Aviv", "Jerusalem", "Haifa", "Eilat", "Beersheba"];

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
      <label>
        <input type="text" list="cities" value={city} onChange={handleCity} />
      </label>
      <datalist id="cities">
        {cityOptions.map((city, index) => (
          <option value={city} key={index}>
            {city}
          </option>
        ))}
      </datalist>

      <p>Selected City:{city}</p>
    </div>
  );
};

export default DataListInput;
