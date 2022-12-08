/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import '../css/checkout.css';
import { Link, Navigate } from 'react-router-dom';
import Context from '../context/Context';
import fetchContent from '../services/fetchContent';
import CartProducts from '../components/CartProducts';
import currencyFormatter from '../services/currencyFormatter';

export default function Cart() {
  const {
    cartItems,
    setCartItemsData,
    cartItemsData,
    setTotal,
    total,
    localStorageIsReady,
    setCheckoutResponse,
  } = useContext(Context);

  if (!cartItems?.length) {
    return <Navigate to="/" />;
  }

  const getCartItemsData = async () => {
    const items = cartItems.map((item) => item.id);
    const response = await fetchContent('product', items);
    setCartItemsData(response);
  };

  useEffect(() => {
    if (cartItems?.length && localStorageIsReady) {
      const e = async () => getCartItemsData();
      e();
    }
  }, [localStorageIsReady]);

  useEffect(() => {
    if (cartItemsData) {
      setTotal(cartItemsData
        .reduce((acc, curr) => {
          const result = acc + (cartItems.find((item) => item.id === curr._id)?.quantity * curr.price);
          if (!result) return 0;
          return result;
        }, 0));
    }
  }, [cartItems, cartItemsData]);

  useEffect(() => {
    setCheckoutResponse();
  }, []);

  if (!cartItemsData) return null;

  return (
    <section className="shopping-cart">
      <div className="container container__cart">
        <div className="block-heading">
          <h2>Carrinho</h2>
          <p>Confira os produtos e as quantidades</p>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                {cartItemsData ? cartItemsData.map((item) => (
                  <CartProducts key={ item._id } item={ item } />
                )) : null}
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Cart</h3>
                <div className="p-3">
                  <span className="text">Total</span>
                  <span className="price" id="cart-total">
                    {`R$${currencyFormatter('pt-BR', total)}`}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-lg btn-block"
                    id="checkout-btn"
                  >
                    Finalizar a Compra
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
