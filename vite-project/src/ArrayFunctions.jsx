import { useState, useMemo } from "react";
import { motorcycles } from "./constants/motorcycles";

function ArrayActions() {
  const [array, setArray] = useState(motorcycles);
  const [sortType, setSortType] = useState("default sorting");
  const [search, setSearch] = useState("");

  function addElement(item) {
    setArray((prevArray) => [...prevArray, item]);
  }

  function deleteElement(id) {
    setArray((prevArray) => prevArray.filter((item) => item.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObj = {
      brand: formData.get("brand") ?? "",
      model: formData.get("model") ?? "",
      horsepower: formData.get("horsepower") ?? "",
      price: formData.get("price") ?? "",
      id: array.length + 1,
    };
    addElement(dataObj);
  }

  const searchArray = useMemo(() => {
    if (!search) return array;
    else {
      return [...array].filter(
        (item) =>
          item.brand.toLowerCase().includes(search.toLowerCase()) ||
          item.model.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [search, array]);

  const sortedArray = useMemo(() => {
    if (sortType === "power") {
      return [...array].sort((a, b) => a.horsepower - b.horsepower);
    }
    if (sortType === "price") {
      return [...array].sort((a, b) => a.price - b.price);
    } else return array;
  }, [array, sortType]);

  return (
    <div>
      <form
        id="moto-form"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          boxSizing: "border-box",
          width: "200px",
        }}
        onSubmit={handleSubmit}
      >
        <legend>Add a motorcycle </legend>
        <label>
          {" "}
          Add brand
          <input list="brands" name="brand" required></input>
          <datalist id="brands">
            <option value="Honda"></option>
            <option value="BMW"></option>
            <option value="Suzuki"></option>
            <option value="Yamaha"></option>
            <option value="Kawasaki"></option>
            <option value="KTM"></option>
            <option value="Aprilia"></option>
            <option value="Ducati"></option>
            <option value="Triumph"></option>
          </datalist>
        </label>
        <label>
          {" "}
          Add model
          <input name="model" required></input>
        </label>
        <label>
          {" "}
          Add power
          <input name="horsepower" required></input>
        </label>
        <label>
          {" "}
          Add price
          <input name="price" required></input>
        </label>
        <button
          type="submit"
          style={{
            width: "200px",
          }}
        >
          Add Motocycle
        </button>
      </form>

      <br />

      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option>Select Sorting</option>
        <option value="power"> By Power </option>
        <option value="price"> By Price </option>
      </select>

      <br />
      <br />
      <label htmlFor="search"> Search for a Motorcycle </label>
      <input
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      <table>
        <caption> Motorcycles for sale </caption>
        <thead>
          <tr>
            <th>Motorcycle Brand</th>
            <th>Motorcycle Model</th>
            <th>Motorcycle Power</th>
            <th>Motorcycle Price</th>
            <th>Delete Motorcycle</th>
          </tr>
        </thead>
        <tbody>
          {searchArray.map((item) => (
            <tr key={item.id}>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.horsepower}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => deleteElement(item.id)}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArrayActions;
