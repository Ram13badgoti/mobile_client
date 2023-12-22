// client/src/pages/OrderSummary.js
import React from 'react';

const OrderSummary = ({ cart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Total Items: {totalItems}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <button>Proceed to checkout</button>
    </div>
  );
};

export default OrderSummary;
