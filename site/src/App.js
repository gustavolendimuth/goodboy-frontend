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
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import Search from './components/Search';
import Categories from './components/Categories';
// A função fetchContent é responsável por fazer o fetch das informações
import fetchContent from './services/fetchContent';
// A função transforma formatCategoriesObject o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
import formatCategoriesObject from './services/formatCategoriesObject';
import CheckoutResponse from './pages/CheckoutResponse';

function App() {
  const {
    getLocalStorage,
    setLocalStorage,
    setCartItems,
    cartItems,
    setProducts,
    setCategories,
    categories,
    products,
    setLocalStorageIsReady,
  } = useContext(Context);

  const getProducts = async () => {
    const productsResponse = await fetchContent('products');
    if (productsResponse) setProducts(productsResponse);
  };

  const getCategories = async () => {
    const categoriesResponse = await fetchContent('categories');
    if (categoriesResponse) setCategories(formatCategoriesObject(categoriesResponse));
  };

  useEffect(() => {
    if (cartItems?.length) {
      setLocalStorage('cart', cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const cart = getLocalStorage('cart');
    if (cart) {
      setCartItems(cart);
    }

    if (!products)getProducts();
    if (!categories) getCategories();
    setLocalStorageIsReady(true);
  }, []);

  return (
    <BrowserRouter>
      <header>
        <Navbar />
        <section>
          <Categories />
        </section>
      </header>
      <main>
        <Routes>
          <Route element={ <Home /> } path="/" exact />
          <Route element={ <ProductDetails /> } path="/produto/:id" />
          <Route element={ <Cart /> } path="/carrinho" />
          <Route element={ <Checkout /> } path="/checkout" />
          <Route element={ <CheckoutResponse /> } path="/checkout/resultado" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
