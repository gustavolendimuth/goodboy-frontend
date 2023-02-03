/* eslint-disable react/forbid-component-props */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogIn, BiLogOut, BiCreditCard, BiBone } from 'react-icons/bi';
import Cart from './Cart';
import goodboyLogo from '../images/goodboy_logo-transp.webp';
import Context from '../context/Context';
import '../css/navbar.css';
// import fetchContent from '../services/fetchContent';

export default function Navbar() {
  const {
    // setProducts,
    user,
    setUser,
    setToken,
  } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  // const searchProductsBar = async () => {
  //   const productsResponse = await fetchContent({ query: 'searchProducts', searchInput });
  //   if (productsResponse) { await setProducts(productsResponse); }
  //   console.log('searchInput', searchInput);
  //   console.log('productsResponse', productsResponse);
  // };

  const logout = () => {
    setUser();
    setToken();
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex justify-content-center align-items-center gap-3 py-3">
        <Link className="order-md-0" to="/">
          <img src={ goodboyLogo } alt="Good Boy Logo" width="200px" className="img-fluid" />
        </Link>
        <form onSubmit={ (e) => e.preventDefault() } className="d-flex mx-auto mb-2 mb-lg-0 order-2 order-lg-1" role="search">
          <input className="form-control me-2 search" type="search" placeholder="Produto" aria-label="Search" onChange={ (e) => setSearchInput(e.target.value) } />
          <button className="btn btn-primary d-flex px-3" type="submit" onClick={ () => navigate(`/search/${searchInput}`) }>
            <BiBone className="login-icon me-1" />
            Buscar
          </button>
        </form>
        <ul className="navbar-nav mx-auto ms-md-auto me-md-0 mb-2 mb-lg-0 d-flex align-items-center order-1 order-lg-2">
          <li className="nav-item">
            <div className="d-flex align-items-center">
              <div className="login-links">
                {
                  user
                    ? (
                      <div className="d-flex gap-2 align-items-center">
                        <Link to="/compras" className="btn btn-outline-light btn-sm px-3 d-flex justify-content-center align-items-center">
                          <BiCreditCard className="login-icon me-1" />
                          Compras
                        </Link>
                        <form
                          className="d-inline"
                          onSubmit={ (e) => {
                            e.preventDefault();
                            logout();
                          } }
                        >
                          <button
                            type="submit"
                            className="btn btn-outline-danger btn-sm px-3 d-flex justify-content-center align-items-center"
                          >
                            <BiLogOut className="login-icon me-1" />
                            Sair
                          </button>
                        </form>
                      </div>)
                    : (
                      <Link
                        to="/login"
                        className="btn btn-outline-danger btn-sm px-3 d-flex
                          justify-content-center align-items-center"
                      >
                        <BiLogIn className="login-icon me-1" />
                        Entrar
                      </Link>
                    )
                }
              </div>
              <div className="p-3">
                <button
                  className="btn btn-secondary cart rounded-circle"
                  type="button"
                  title="Ir para o carrinho"
                >
                  <Cart />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
