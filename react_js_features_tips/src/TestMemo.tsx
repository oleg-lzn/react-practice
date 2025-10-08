import React from "react";
import { useState, useMemo } from "react";

function Memo() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const users = [
    { id: 1, name: "Oleg" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Elena" },
    { id: 4, name: "Ivan" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      console.log('Фильтрую пользователей')
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
  },[search]);

  return (
    <>
     
     <label> Список клиентов 
        <input type="checkbox" />
        <input
          type="text"
          className=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      
      <ul className="users">
        {filteredUsers.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
      <button onClick={() => setCount(count + 1)}>Клик: {count}</button>
    </>
  );
}

export default Memo;
