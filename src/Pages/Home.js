
import React, { useState } from 'react';
import logo from '../images/logo.jpg';
import { Link, Routes, Route } from 'react-router-dom'; // Import Routes and Route

import Header from '../Components/Header';
import Menu from './Menu';
import Cart from './Cart';
import OrderSummary from './OrderSummary';

const Home = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);


    if (existingItem) {
      // If the item already exists in the cart, update the quantity
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    alert(` ${item.name} Successfully added to cart`)
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((i) => i.id !== item.id);
    setCart(updatedCart);
    alert(` ${item.name} Successfully removed from cart`)
  };

  const updateQuantity = (itemId, quantityChange) => {

    // Implement the logic to update the quantity of the item in the cart
    // For example, find the item in the cart, update its quantity, and setCart with the updated cart
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <div className="home">
      <div className="header">
        <div className="allLinks">
          <img className="logo" src={logo} alt="logo" />
          <Link className='homeLink' to="/">My Ordering App</Link>
        </div>
        <div className="allLinks">

          <nav>
            <ul>
          
              <li>
                <Link to="/cart">
                  <div className="cart-container">
                    <button style={{ backgroundColor: 'grey' }}>
                      <i className="fa-solid fa-cart-shopping"></i>
                      <span className="cart-length">{cart.length}</span>
                    </button>
                  </div>

                </Link>
      

              </li>
            </ul>
          </nav>
        </div>

      </div>

      <Routes>
        <Route path="/" element={<Menu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
        <Route path="/order-summary" element={<OrderSummary cart={cart} />} />
      </Routes>
    </div>
  );
};

export default Home;
