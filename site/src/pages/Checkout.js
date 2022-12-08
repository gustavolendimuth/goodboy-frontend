/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';
import currencyFormatter from '../services/currencyFormatter';

export default function Checkout() {
  const {
    checkoutResponse,
    setCheckoutResponse,
    total,
    cartItemsData,
    getItemQuantity,
  } = useContext(Context);

  const navigate = useNavigate();

  if (!total) {
    return <Navigate to="/carrinho" />;
  }

  let cardPaymentBrickController;
  let items;
  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);

  const processPayment = (formData) => {
    fetch('http://localhost:3001/process_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.REACT_APP_PROJECT_AUTH,
      },
      body: JSON.stringify({ formData, items }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result?.error_message) {
          throw new Error(result.error_message);
        }
        console.log('Payment processed successfully', result);
        setCheckoutResponse(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPaymentForm = async () => {
    const settings = {
      initialization: {
        amount: currencyFormatter('en-US', total),
      },
      callbacks: {
        onReady: () => {
          console.log('brick ready');
        },
        onError: (error) => {
          console.log(error);
        },
        onSubmit: ({ selectedPaymentMethod, formData, paymentType }) => new Promise((resolve, reject) => {
          processPayment(formData)
            .then((response) => resolve(response))
            .catch((error) => reject(new Error(error)));
        }),
      },
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          creditCard: 'all',
          bankTransfer: ['pix'],
        },
        visual: {
          style: {
            theme: 'light',
            customVariables: {
              formBackgroundColor: '#ffffff',
              baseColor: 'gray',
            },
          },
        },
      },
    };

    const bricks = await mercadopago.bricks();
    cardPaymentBrickController = await bricks.create('payment', 'mercadopago-bricks-container__PaymentCard', settings);
  };

  useEffect(() => {
    if (!checkoutResponse) {
      loadPaymentForm();
    }
  }, [total]);

  useEffect(() => {
    if (!cartItemsData) navigate('/carrinho');
    items = cartItemsData?.map((item) => ({
      productId: item._id,
      title: item.title,
      quantity: getItemQuantity(item._id),
      unitPrice: item.price,
      description: item.description,
    }));
  }, [cartItemsData]);

  useEffect(() => {
    if (checkoutResponse) {
      navigate('/checkout/resultado');
    }
  }, [checkoutResponse]);

  if (checkoutResponse) {
    return <Navigate to="/checkout/resultado" />;
  }

  return (
    <section className="payment-form">
      <div className="container container__payment">
        <div className="block-heading">
          <h2>Checkout</h2>
          <p>Finalize a compra utilizando o pagamento seguro do Mercado Pago</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Resumo</h2>
            <div className="item">
              {
                cartItemsData?.map((item) => (
                  <div key={ item._id } className="d-flex py-2">
                    <div className="px-0">{getItemQuantity(item._id)}</div>
                    <div className="w-100 px-3">{item.title}</div>
                    <div className="px-0">{`R$${currencyFormatter('pt-BR', item.price)}`}</div>
                  </div>
                ))
              }
            </div>
            <div className="total">
              Total
              <span className="price" id="summary-total">{`R$${currencyFormatter('pt-BR', total)}`}</span>
            </div>
            <input type="hidden" id="amount" />
            <input type="hidden" id="description" />
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
