/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/bootstrap.min.css';
import './css/main.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import Context from './context/Context';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const {
    getLocalStorage,
    setLocalStorage,
    session,
    setSession,
  } = useContext(Context);

  useEffect(() => {
    const localStorageSession = getLocalStorage('session');
    if (!localStorageSession) {
      setSession(window.crypto.randomUUID());
      return;
    }
    setSession(localStorageSession);
  }, []);

  useEffect(() => {
    setLocalStorage('session', session);
  }, [session]);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route element={ <Home /> } path="/" exact />
          <Route element={ <ProductDetails /> } path="/produto/:id" />
          <Route element={ <Products /> } path="/produto/:query" />
          <Route element={ <Cart /> } path="/carrinho/:session" />
          <Route element={ <Checkout /> } path="/checkout/:session" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
