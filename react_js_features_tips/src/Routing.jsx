import { Navigate, Outlet } from "react-router-dom";

// приватный маршрут для обертки множества одинаковых маршрутов, имеющих одинаковый уровень защиты
const PrivateRoute = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

<Route element={<PrivateRoute />}>
  <Route path="/profile" element={<Profile />} />
  <Route path="/settings" element={<Settings />} />
</Route>;

// работает в связке с хуком, возвращающим стейт логина

import { Navigate, useLocation } from "react-router-dom";
import { useIsLoggedIn } from "../LoggedInWrapper/LoggedInWrapper";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const { isLoggedIn } = useIsLoggedIn();
  const location = useLocation();
  const from = location.state?.from || "items";

  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (isLoggedIn && anonymous) {
    return <Navigate to={from} />;
  }

  return children;
};

export default ProtectedRoute;

import { useState, useContext, createContext } from "react";

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoggedInWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useIsLoggedIn = () => useContext(LoggedInContext);

// Получить объект с отчётом из массива
//   Я хочу получить функцию которая примет этот массив на вход и вернёт объект,
//   который скажет сколько у меня субъектов в регионе 1 и сколько в регионе 2
//   Дополнительные объявления переменны-массивов использовать нельзя,
//   нужен return {какое то действие создающее объект из массива}
//   Логику реализовать внутри этой функции getResult

// Написать функцию вывода строкой через запятую названий (name) объектов
// Брать только объекты связанные с типами у которых class="Устройства"
// В решении учитывать что объектов может быть
// условно миллиард, а типов миллион, исходить из необходимости максимально снизить затраты по времени и ресурсам

// const objects = [
//   { id: 1, name: "Test 1", object_type: 1 },
//   { id: 2, name: "Test 2", object_type: 1 },
//   { id: 3, name: "Test 3", object_type: 2 },
//   { id: 4, name: "Test 4", object_type: 3 },
//  ]

//    //Типы
//   const object_types = [
//      { id: 1, class: "Устройства" },
//      { id: 2, class: "Устройства" },
//      { id: 3, class: "Порты" },
//      { id: 4, class: "Кабели" }
//    ]
// // "Test 1, Test 2, Test 3"
