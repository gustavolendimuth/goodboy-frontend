/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { removeLocalStorage } from '../services/localStorage';
import Context from './Context';

export default function Provider({ children }) {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [checkoutResponse, setCheckoutResponse] = useState();
  const [total, setTotal] = useState(0);
  const [cartItemsData, setCartItemsData] = useState();
  const [cartLocalStorage, setCartLocalStorage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [alert, setAlert] = useState();
  const [loginForm, setLoginForm] = useState();
  const [loading, setLoading] = useState(0);
  const [orders, setOrders] = useState();
  const [ordersIsFinished, setOrdersIsFinished] = useState(false);
  const [allCategories, setAllCategories] = useState();
  const [salesAndSpotlights, setSalesAndSpotlights] = useState();

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
    total,
    setTotal,
    cartItemsData,
    setCartItemsData,
    cartLocalStorage,
    setCartLocalStorage,
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    token,
    setToken,
    alert,
    setAlert,
    loginForm,
    setLoginForm,
    loading,
    setLoading,
    orders,
    setOrders,
    ordersIsFinished,
    setOrdersIsFinished,
    allCategories,
    setAllCategories,
    salesAndSpotlights,
    setSalesAndSpotlights,
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
