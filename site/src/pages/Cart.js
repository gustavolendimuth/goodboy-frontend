/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useContext, useEffect } from 'react';
import '../css/checkout.css';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import CartProducts from '../components/CartProducts';
import currencyFormatter from '../services/currencyFormatter';
import '../css/cart.css';
import useCartItemsData from '../hooks/useCartItemsData';

export default function Cart() {
  const {
    cartItemsData,
    cartItems,
    total,
    cartLocalStorage,
    setCheckoutResponse,
  } = useContext(Context);

  const navigate = useNavigate();

  // hook que carrega os dados dos produtos do carrinho
  useCartItemsData();

  useEffect(() => {
    if (!cartItems && cartLocalStorage) {
      navigate('/');
    }
  }, [cartItems]);

  useEffect(() => {
    setCheckoutResponse();
  }, []);

  return (
    <section className="shopping-cart">
      <div className="container container__cart">
        <div className="section-title text-center pt-5 pb-4">
          <h1>Carrinho</h1>
          <h4>Confira os produtos e as quantidades</h4>
        </div>
        <div className="content rounded-4">
          <div className="items p-4">
            {
              cartItemsData && cartItemsData.map((item, index, array) => (
                <CartProducts key={ item._id } item={ item } info={ { index, array } } />
              ))
            }
          </div>
          <div className="summary d-flex flex-column align-items-center align-items-sm-end">
            <div className="w-auto">
              <div className="d-flex flex-column align-items-center flex-sm-row justify-content-between">
                <p className="fs-4">
                  Total
                </p>
                <p className="fs-4" id="cart-total">
                  <b>
                    {
                      currencyFormatter({ format: 'pt-BR', value: total, symbol: true })
                    }
                  </b>
                </p>
              </div>
              <div className="d-flex justify-content-center pt-4">
                <Link
                  to="/checkout"
                  className="btn btn-primary btn-lg w-100 px-5"
                  id="checkout-btn"
                >
                  Finalizar a Compra
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
