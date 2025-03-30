import React, { useState, useEffect } from "react";

// дебаунсер на search

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(timer); 
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("🔍 Отправка запроса для:", debouncedQuery); // вызов API здесь!! 
    }
  }, [debouncedQuery]); // Выполняем запрос, когда обновился debouncedQuery

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос..."
      />
      <p>🔎 Поиск по: {debouncedQuery}</p>
    </div>
  );
};

export default SearchComponent;

// дебаунсер на resize 

import React, { useState, useEffect } from "react";

const ResizeComponent = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    let timer;
    const debouncedResize = () => {
      clearTimeout(timer);
      timer = setTimeout(handleResize, 500); // Задержка 500 мс
    };

    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  return <h1>📏 Ширина окна: {windowWidth}px</h1>;
};

export default ResizeComponent;

