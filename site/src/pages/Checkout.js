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
import fetchAPI from '../services/fetchAPI';

export default function Checkout() {
  const {
    checkoutResponse,
    setCheckoutResponse,
    total,
    cartItemsData,
    getItemQuantity,
    cartLocalStorage,
    cartItems,
    setLoading,
    setAlert,
  } = useContext(Context);
  const [items, setItems] = useState();
  const paymentFormLoaded = useRef(false);
  const errorMessage = 'Desculpe... serviço indisponível, tente mais tarde';
  let cardPaymentBrickController;

  const navigate = useNavigate();

  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);

  const processPayment = async (formData) => {
    setLoading((prevLoading) => prevLoading + 1);
    const { result, error } = await fetchAPI({ endpoint: 'process_payment', method: 'POST', body: { formData, items } });

    if (error || result.message || !result) {
      setLoading((prevLoading) => prevLoading - 1);
      setAlert({ ok: false, message: errorMessage });
      return;
    }
    return result;
  };

  const loadPaymentForm = async () => {
    setLoading((prevLoading) => prevLoading + 1);

    const settings = {
      initialization: {
        amount: total,
        items,
      },
      callbacks: {
        onReady: () => {
          setLoading((prevLoading) => prevLoading - 1);
        },
        onError: (error) => {
          setLoading((prevLoading) => prevLoading - 1);
          setAlert({
            ok: false,
            message: 'Dados inválidos, verifique os campos e tente novamente',
          });
        },
        onSubmit: ({ selectedPaymentMethod, formData, paymentType }) => new Promise(() => {
          processPayment(formData)
            .then((result) => setCheckoutResponse(result))
            .catch((error) => {
              setLoading((prevLoading) => prevLoading - 1);
              setAlert({ ok: false, message: errorMessage });
            });
        }),
      },
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          creditCard: 'all',
          // debitCard: 'all',
          // bankTransfer: ['pix'],
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
    if (!checkoutResponse && total && items && !paymentFormLoaded.current) {
      loadPaymentForm();
      paymentFormLoaded.current = true;
    }
  }, [items, total]);

  useEffect(() => {
    if (cartLocalStorage && !cartItems?.length) {
      navigate('/');
    }
  }, [cartLocalStorage]);

  useCartItemsData();

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
  }, [cartItemsData]);

  useEffect(() => {
    if (checkoutResponse) {
      navigate(`/checkout/compra/${checkoutResponse.id}`);
      window.location.reload(true);
    }
  }, [checkoutResponse]);

  return (
    <section className="payment-form">
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
