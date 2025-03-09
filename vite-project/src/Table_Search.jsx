import { getPosts } from "../../api/api";
import { useEffect, useState, useMemo } from "react";
import { customhook } from "../../hooks/getItems";

function Table() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortType, setSortType] = useState("ASC");
  const [sortedValues, setSortedValues] = useState([]);

  const { currentPage, currentItems, setNextPage, setPrevPage, totalPages } =
    customhook();

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((res) => {
        console.log(res);
        setPosts(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const sortedList = useMemo(() => {
    let sorted = [...posts];
    return sorted.sort((a, b) =>
      sortType === "ASC"
        ? a.title.localeCompare(b.title)
        : sortType === "DSC"
        ? b.title.localeCompare(a.title)
        : posts
    );
  }, [sortType, posts]);

  const filteredItems = useMemo(() => {
    if (!inputValue) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        post.body.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, posts]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />

      {isLoading && <p> is Loading</p>}

      <button onClick={() => setSortType("ASC")}>ASC</button>
      <button onClick={() => setSortType("DSC")}>DSC</button>
      <br />
      <br />

      <button onClick={setNextPage}>Next Page</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={setPrevPage}>Previous Page</button>

      <table className="table">
        <caption>Table with the Filtration Option</caption>
        <thead className="table__head">
          <tr className="table__row">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {currentItems.map(({ id, userId, title, body }) => {
            return (
              <tr key={id} className="table__row">
                <td className="table__data">{userId}</td>
                <td className="table__data">{title}</td>
                <td className="table__data">{body}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" rowSpan={2}>
              Numbers
            </th>
            <td colSpan={2}> 52 </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;

// Функция сортировки с if...else
// const sortedList = () => {
//   let sorted = [...posts];

//   if (sortType === "ASC") {
//     sorted.sort((a, b) => a.title.localeCompare(b.title));
//   } else if (sortType === "DSC") {
//     sorted.sort((a, b) => b.title.localeCompare(a.title));
//   }

//   return sorted;
// };
