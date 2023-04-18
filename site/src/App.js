/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Pages
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import CategoryResult from './Pages/Category/Category';
import SearchResult from './Pages/SearchResult/SearchResult';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';
import CheckoutResponse from './Pages/CheckoutResponse/CheckoutResponse';
import Orders from './Pages/Orders/Orders';
// Components
import Footer from './Pages/Components/Footer/Footer';
import Navbar from './Pages/Components/Navbar/Navbar';
import Categories from './Pages/Components/CategoriesBar/CategoriesBar';
import Alert from './Pages/Components/Alert/Alert';
import Loading from './Pages/Components/Loading/Loading';
// Hooks
import useToken from './Hooks/useToken';
import useCartLocalStorage from './Hooks/useCartLocalStorage';
import useProducts from './Hooks/useProducts';
import ScrollToTop from './Hooks/ScrollToTop';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pages/assets/styles/main.css';
import './Pages/assets/styles/custom.scss';
import FloatingButtons from './Pages/Components/FloatingButtons/FloatingButtons';

function App() {
  // A função useToken é responsável por verificar o token ao abrir a página e salvar no localStorage após o login
  useToken();
  // A função useGetCartLocalStorage é responsável por resgatar o carrinho ao abrir a página e salvar no localStorage após adicionar um item
  useCartLocalStorage();
  // A função useProducts é responsável por resgatar os produtos da API
  useProducts();

  return (
    <BrowserRouter>
      <FloatingButtons />
      <Loading />
      <ScrollToTop />
      <Alert />
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
          <Route element={ <CheckoutResponse /> } path="/checkout/compra" />
          <Route element={ <Login /> } path="/login/:email/:magicLink" />
          <Route element={ <Login /> } path="/login" />
          <Route element={ <Orders /> } path="/compras" />
          <Route element={ <Orders /> } path="/compras" />
          <Route element={ <CategoryResult /> } path="/categoria/:mainCategory/:subCategory" />
          <Route element={ <SearchResult /> } path="/search/:searchInput" />
          <Route element={ <Home /> } path="*" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
