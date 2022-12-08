/* eslint-disable react/jsx-max-depth */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import goodboyLogo from '../images/goodboy_logo-transp.webp';
import '../css/navbar.css';
import Context from '../context/Context';

export default function Navbar() {
  const { cartItems } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <img src={ goodboyLogo } alt="Good Boy Logo" width="222px" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse px-5" id="navbarSupportedContent">
          <form className="d-flex px-5 mx-auto mb-2 mb-lg-0" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active mx-4" href="/">
                <div className="d-flex gap-2 align-items-center">
                  <div className="login-links">
                    <BiLogIn className="login-icon" />
                  </div>
                  <div className="login-links">
                    Minha Conta
                    {' '}
                    <br />
                    Entrar/Cadastrar
                  </div>
                </div>

              </a>
            </li>
            <li className="nav-item">
              <div className="mx-4">
                <Link
                  className="nav-link active d-flex gap-2 align-items-center"
                  to={ cartItems?.length ? '/carrinho' : null }
                >
                  <div>
                    <FiShoppingCart className="cart-icon" />
                  </div>
                  <div className="cart-number-container d-flex justify-content-center align-items-center">
                    <div className="cart-number">
                      {' '}
                      <b>{cartItems?.length ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : 0}</b>
                      {' '}
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
