/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [session, setSession] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [checkoutResponse, setCheckoutResponse] = useState();
  const [total, setTotal] = useState(0);
  const [cartItemsData, setCartItemsData] = useState();
  const [localStorageIsReady, setLocalStorageIsReady] = useState(false);

  const setLocalStorage = (key, value) => {
    if (key && value) localStorage.setItem(key, JSON.stringify(value));
  };
  const getLocalStorage = (key) => key && JSON.parse(localStorage.getItem(key));
  const removeLocalStorage = (key) => key && localStorage.removeItem(key);

  const getItemQuantity = (id) => cartItems?.find((item) => item.id === id)?.quantity || 0;

  const addToCart = (id) => {
    setCartItems((prevCartItems) => {
      if (!prevCartItems) {
        return [{ id, quantity: 1 }];
      }
      if (!prevCartItems.some((item) => item.id === id)) {
        return [...prevCartItems, { id, quantity: 1 }];
      }
      return prevCartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems?.length === 1) removeLocalStorage('cart');
      if (prevCartItems?.some((item) => item.id === id)) {
        return prevCartItems?.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter((item) => {
          if (item.quantity > 0) {
            return true;
          }
          setCartItemsData((prevCartItemsData) => prevCartItemsData?.filter((itemData) => itemData._id !== item.id));
          return false;
        });
      }
      return prevCartItems;
    });
  };

  const deleteFromCart = (id) => {
    setCartItemsData((prevCartItemsData) => prevCartItemsData?.filter((itemData) => itemData._id !== id));
    setCartItems((prevCartItems) => {
      if (prevCartItems?.length === 1) removeLocalStorage('cart');
      return prevCartItems.filter((item) => id !== item.id);
    });
  };

  const context = {
    setLocalStorage,
    getLocalStorage,
    session,
    setSession,
    products,
    setProducts,
    categories,
    setCategories,
    checkoutResponse,
    setCheckoutResponse,
    cartItems,
    setCartItems,
    getItemQuantity,
    addToCart,
    removeFromCart,
    deleteFromCart,
    removeLocalStorage,
    total,
    setTotal,
    cartItemsData,
    setCartItemsData,
    setLocalStorageIsReady,
    localStorageIsReady,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
