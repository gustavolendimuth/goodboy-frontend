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
    fetch(`${process.env.REACT_APP_PROJECT_API_URL}/process_payment`, {
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
        throw new Error(error);
      });
  };

  const loadPaymentForm = async () => {
    const settings = {
      initialization: {
        amount: currencyFormatter({ format: 'en-US', value: total }),
      },
      callbacks: {
        onReady: () => {
          console.log('brick ready');
        },
        onError: (error) => {
          console.log(error);
          throw new Error(error);
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
      navigate(`/checkout/compra/${checkoutResponse.id}`);
    }
  }, [checkoutResponse]);

  return (
    <section className="payment-form">
      <div className="container container__payment">
        <div className="section-title text-center pt-5 pb-4">
          <h1>Checkout</h1>
          <h3>Finalize a compra utilizando o pagamento seguro do Mercado Pago</h3>
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
          <div className="alert alert-warning mx-4" role="alert">
            <h3>
              <b>Cartão de crédito de teste</b>
            </h3>
            <b>Número do cartão:</b> 5031 4332 1540 6351
            <br />
            <b>Data de vencimento:</b> 11/25
            <br />
            <b>Código de segurança:</b> 123
            <br />
            <b>Nome do titular:</b> APRO
            <br />
            <b>CPF:</b> 12345678909
            <br />
            <b>E-mail:</b> seu email
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
