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
import '../css/cart.css';

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
        <div className="section-title text-center pt-5 pb-4">
          <h1>Carrinho</h1>
          <h3>Confira os produtos e as quantidades</h3>
        </div>
        <div className="content rounded-4">
          <div className="items p-4">
            {
              cartItemsData && cartItemsData.map((item, index, array) => (
                <CartProducts key={ item._id } item={ item } info={ { index, array } } />
              ))
            }
          </div>
          <div className="summary w-100 d-flex flex-column align-items-end">
            <div className=" w-auto">
              <div className="d-flex justify-content-between">
                <h3 className="text">
                  Total
                </h3>
                <h3 className="price" id="cart-total">
                  <b>
                    {
                      currencyFormatter({ format: 'pt-BR', value: total, symbol: true })
                    }
                  </b>
                </h3>
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
