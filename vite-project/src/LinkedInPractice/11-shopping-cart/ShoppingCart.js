import { useState, useReducer } from "react";

const items = [
  {
    name: "apple",
    price: 0.39,
  },
  {
    name: "banana",
    price: 0.79,
  },
  {
    name: "cherry tomatoes",
    price: 3.99,
  },
];

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubtotal] = useState(0);

  function addToCart(item) {
    let cartCopy = [...cart];
    const itemInCart = cartCopy.find((i) => item.name === i.name);

    if (itemInCart) {
      itemInCart.quantity += 1;
      setCart(cartCopy);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function increase(name) {
    let cartCopy = [...cart];
    const item = cartCopy.find((i) => i.name === name);
    item.quantity += 1;
    setCart(cartCopy);
  }

  function decrease(name) {
    let cartCopy = [...cart];
    const item = cartCopy.find((i) => i.name === name);
    if (item.quantity > 1) {
      ``;
      item.quantity -= 1;
    } else {
      cartCopy = cartCopy.filter((i) => i.name !== item.name);
    }
    setCart(cartCopy);
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="cart">
        <div className="items">
          <h2>Items</h2>
          {items.map((item) => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div>
          <h2>Cart</h2>
          {cart.map((item) => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>
                <button onClick={() => decrease(item.name)}>-</button>
                {item.quantity}
                <button onClick={() => increase(item.name)}>+</button>
              </p>
              <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="total">
        <h2>
          Total: $
          {cart
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default ShoppingCart;
