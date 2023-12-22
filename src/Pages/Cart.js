// client/src/pages/Cart.js
import React from 'react';
import OrderSummary from './OrderSummary';
// import './Cart.css'; // Import your CSS file for styling

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-page">
    <div className="cart">
      {/* <h2>Cart</h2> */}

      <ul>
        <li>
          <span>
            Name
          </span>
          <span>
            Price
          </span>
          <span>
            Processor
          </span>
          <span>
            Quantity
          </span>
          <span>
            Remove Quantity
          </span>
        </li>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span>{item.processor}</span>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    <OrderSummary cart={cart}/>
    </div>
  );
};

export default Cart;
