/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/bootstrap.min.css';
import './css/main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './pages/Home';
import Footer from './components/Footer';
import Context from './context/Context';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import Search from './components/Search';
import Categories from './components/Categories';

// A função fetchContent é responsável por fazer o fetch das informações
import fetchContent from './services/fetchContent';
// A função transforma formatCategoriesObject o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
import formatCategoriesObject from './services/formatCategoriesObject';

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

    const {
        products,
        setProducts,
        categories,
        setCategories,
    } = useContext(Context);

    useEffect(() => {
        window.scrollTo(0, 0);

        const getProducts = async () => {
            const productsResponse = await fetchContent('products');

            if (productsResponse) setProducts(productsResponse);
        };

        const getCategories = async () => {
            const categoriesResponse = await fetchContent('categories');

            if (categoriesResponse) setCategories(formatCategoriesObject(categoriesResponse));
        };

        getProducts();
        getCategories();
    }, []);

    useEffect(() => {
        if (categories) console.log('Objeto das categorias', categories);
        if (products) console.log('Objeto dos produtos', products);
    }, [products, categories]);

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
                    <Route element={<Home />} path="/" exact />
                    <Route element={<ProductDetails />} path="/produto/:id" />
                    <Route element={<Products />} path="/produto/:query" />
                    <Route element={<Cart />} path="/carrinho/:session" />
                    <Route element={<Checkout />} path="/checkout/:session" />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
