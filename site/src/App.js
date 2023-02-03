/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Páginas
import Login from './pages/Login';
import Home from './pages/Home';
import CategoryResult from './pages/CategoryResult';
import SearchResult from './pages/SearchResult';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutResponse from './pages/CheckoutResponse';
import Orders from './pages/Orders';
// Componentes
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Alert from './components/Alert';
import Loading from './components/Loading';
// Hooks customizados
import useToken from './hooks/useToken';
import useCartLocalStorage from './hooks/useCartLocalStorage';
import useProducts from './hooks/useProducts';
import ScrollToTop from './hooks/ScrollToTop';
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import './css/custom.scss';
import FloatingButtons from './components/FloatingButtons';

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
          <Route element={ <CheckoutResponse /> } path="/checkout/compra/:id" />
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
