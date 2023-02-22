/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';
import useCartItemsData from '../hooks/useCartItemsData';
import currencyFormatter from '../services/currencyFormatter';
import fetchOrders from '../services/fetchOrders';
import LoadPaymentForm from '../hooks/LoadPaymentForm';

export default function Checkout() {
  const {
    checkoutResponse,
    total,
    cartItemsData,
    getItemQuantity,
    cartLocalStorage,
    cartItems,
    setLoading,
    items,
    setItems,
  } = useContext(Context);

  const paymentFormLoaded = useRef(false);

  const navigate = useNavigate();
  const loadPaymentForm = LoadPaymentForm();

  useEffect(() => {
    if (!cartItemsData || items) return;
    setItems(
      cartItemsData?.map((item) => ({
        productId: item._id,
        title: item.title,
        quantity: getItemQuantity(item._id),
        unitPrice: item.price,
      })),
    );
  }, [cartItemsData, items, getItemQuantity]);

  useEffect(() => {
    const mountCardPaymentBrickController = async () => {
      if (!checkoutResponse && total && items && !paymentFormLoaded.current) {
        const cardPaymentBrickController = await window.cardPaymentBrickController;
        console.log(cardPaymentBrickController);
        if (cardPaymentBrickController) cardPaymentBrickController.unmount();
        window.cardPaymentBrickController = loadPaymentForm();
        paymentFormLoaded.current = true;
      }
    };
    mountCardPaymentBrickController();
  }, [items, total]);

  useEffect(() => {
    if (cartLocalStorage && !cartItems?.length) {
      navigate('/');
    }
  }, [cartLocalStorage]);

  useCartItemsData();

  useEffect(() => {
    if (checkoutResponse) {
      navigate(`/checkout/compra?payment_id=${checkoutResponse.id}`);
      setLoading((prevLoading) => prevLoading - 1);
    }
  }, [checkoutResponse]);

  return (
    <section className="checkout">
      <div className="container container__payment">
        <div className="section-title text-center pt-5 pb-4">
          <h1>Checkout</h1>
          <h4>Finalize a compra utilizando o pagamento seguro do Mercado Pago</h4>
        </div>
        <div className="form-payment rounded-3">
          <div className="products py-5 px-4">
            <h3 className="title"><b>Resumo</b></h3>
            <div className="item">
              {
                cartItemsData?.map((item) => (
                  <div key={ item._id } className="d-flex py-2">
                    <div className="px-0">{getItemQuantity(item._id)}</div>
                    <div className="w-100 px-3">{item.title}</div>
                    <div className="px-0">
                      {
                        currencyFormatter({ format: 'pt-BR', value: item.price * getItemQuantity(item._id), symbol: true })
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="total">
              Total
              <span className="price" id="summary-total">
                {
                  currencyFormatter({ format: 'pt-BR', value: total, symbol: true })
                }
              </span>
            </div>
          </div>
          <div className="container" id="mercadopago-bricks-container__PaymentCard"> </div>
          <div className="px-3 pb-3">
            <Link to="/carrinho" id="go-back">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" className="chevron-left">
                <path
                  fill="#009EE3"
                  fillRule="nonzero"
                  id="chevron_left"
                  d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"
                />
              </svg>
              voltar para o carrinho
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
