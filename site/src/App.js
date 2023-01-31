/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.scss';
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
import Login from './pages/Login';
import useCartLocalStorage from './hooks/useCartLocalStorage';
import useToken from './hooks/useToken';
import Alert from './components/Alert';
import ScrollToTop from './hooks/ScrollToTop';
import Orders from './pages/Orders';
import Loading from './components/Loading';
import CategoryResult from './pages/CategoryResult';

function App() {
  const {
    setProducts,
    setCategories,
    categories,
    products,
    setLoading,
  } = useContext(Context);

  const getProducts = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const productsResponse = await fetchContent('products');
    if (productsResponse) setProducts(productsResponse);
    setLoading((prevLoading) => prevLoading - 1);
  };

  const getCategories = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const categoriesResponse = await fetchContent('categories');
    if (categoriesResponse && !categories) setCategories(formatCategoriesObject(categoriesResponse));
    setLoading((prevLoading) => prevLoading - 1);
  };

  useEffect(() => {
    if (!products) getProducts();
    if (!categories) getCategories();
  }, []);

  // A função useToken é responsável por verificar o token ao abrir a página e salvar no localStorage após o login
  useToken();
  // A função useGetCartLocalStorage é responsável por resgatar o carrinho ao abrir a página e salvar no localStorage após adicionar um item
  useCartLocalStorage();

  return (
    <BrowserRouter>
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
          <Route element={ <Home /> } path="*" />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
