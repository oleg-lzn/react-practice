import React, { useReducer } from "react";

// Определяем структуру состояния
type CartState = {
  items: { id: number; name: string; price: number; quantity: number }[];
  total: number;
};

// Определяем типы действий
type CartAction =
  | { type: "addItem"; payload: { id: number; name: string; price: number } }
  | { type: "removeItem"; payload: { id: number } }
  | { type: "clearCart" };

// Начальное состояние корзины
const initialState: CartState = {
  items: [],
  total: 0,
};

// Редьюсер для управления состоянием корзины
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "addItem": {
      const { id, name, price } = action.payload;

      // Проверяем, есть ли товар в корзине
      const existingItem = state.items.find((item) => item.id === id);

      let updatedItems;
      if (existingItem) {
        // Если товар уже есть, увеличиваем его количество
        updatedItems = state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Если товара нет, добавляем его в корзину
        updatedItems = [...state.items, { id, name, price, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        total: state.total + price,
      };
    }
    case "removeItem": {
      const { id } = action.payload;

      const itemToRemove = state.items.find((item) => item.id === id);
      if (!itemToRemove) return state; // Если товара нет, возвращаем текущее состояние

      const updatedItems = state.items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Удаляем товар, если количество стало 0

      return {
        ...state,
        items: updatedItems,
        total: state.total - itemToRemove.price,
      };
    }
    case "clearCart": {
      return initialState; // Возвращаем состояние по умолчанию
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Компонент корзины
export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button onClick={() => dispatch({ type: "removeItem", payload: { id: item.id } })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${state.total}</p>
      <button onClick={() => dispatch({ type: "addItem", payload: { id: 1, name: "Apple", price: 2 } })}>
        Add Apple
      </button>
      <button onClick={() => dispatch({ type: "addItem", payload: { id: 2, name: "Banana", price: 1 } })}>
        Add Banana
      </button>
      <button onClick={() => dispatch({ type: "clearCart" })}>Clear Cart</button>
    </div>
  );
}
