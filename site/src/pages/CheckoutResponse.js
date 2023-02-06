/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';
import { removeLocalStorage } from '../services/localStorage';

export default function CheckoutResponse() {
  const { checkoutResponse, setCartItems, setCartItemsData, setLoading, setAlert, setCheckoutResponse } = useContext(Context);
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  if (!paymentId) return <Navigate to="/checkout" />;

  const mp = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);
  const bricksBuilder = mp.bricks();

  const renderStatusScreenBrick = async (param) => {
    setLoading((prevLoading) => prevLoading + 1);
    const settings = {
      initialization: {
        paymentId, // id de pagamento gerado pelo Mercado Pago
      },
      callbacks: {
        onReady: () => {
          setLoading((prevLoading) => prevLoading - 1);
        },
        onError: (error) => {
          setLoading((prevLoading) => prevLoading - 1);
          setAlert({
            ok: false,
            message: 'Desculpe... serviço indisponível, tente mais tarde',
          });
          console.log(error);
        },
      },
    };
    window.statusBrickController = await param.create(
      'statusScreen',
      'statusScreenBrick_container',
      settings,
    );
  };

  useEffect(() => {
    if (checkoutResponse?.status === 'approved' || status === 'approved') {
      removeLocalStorage('cart');
      setCartItems();
      setCartItemsData();
      setCheckoutResponse();
    }
  }, [checkoutResponse]);

  useEffect(() => {
    if (paymentId) renderStatusScreenBrick(bricksBuilder);
  }, [paymentId]);

  return (
    <section className="form-payment shopping-cart light">
      <div className="container container__payment">
        <div className="section-title text-center pt-5 pb-4">
          <h1>Dados do Pagamento</h1>
          <h5>Confira as informações do pagamento. Caso ocorra algum problema, volte para o carrinho e tente novamente.</h5>
        </div>
        <div id="statusScreenBrick_container"> </div>
      </div>
    </section>
  );
}
