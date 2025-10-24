// dbContext.js
"use client";

import { createContext, useContext } from "react";

const DbContext = createContext();

export const DbProvider = ({ db, children }) => (
  <DbContext.Provider value={db}>{children}</DbContext.Provider>
);

export const useDb = () => useContext(DbContext); // экспорт хуком чтобы потом просто доставать db = useDb()

// app/layout.js
import { DbProvider } from "@/context/dbContext";
import { db } from "@/db/db";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DbProvider db={db}>{children}</DbProvider>
      </body>
    </html>
  );
}

// app/dashboard/page.js
("use client");
import { useDb } from "@/context/dbContext";

export default function Dashboard() {
  const db = useDb();
  return <div>База подключена: {String(!!db)}</div>;
}

// Длинная версия

// dbContext.js
("use client");

import { createContext, useContext } from "react";

// 1. создаём контекст с дефолтным значением null
const DbContext = createContext(null);

// 2. провайдер, который внедряет значение db в дерево компонентов
export function DbProvider({ db, children }) {
  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

// 3. кастомный хук, чтобы удобно доставать db из контекста
export function useDb() {
  const context = useContext(DbContext);

  if (context === null) {
    throw new Error("useDb() must be used inside a <DbProvider>");
  }

  return context;
}
