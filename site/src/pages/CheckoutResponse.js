/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';
import { removeLocalStorage } from '../services/localStorage';

export default function CheckoutResponse() {
  const { checkoutResponse, setCartItems, setCartItemsData, setLoading, setAlert } = useContext(Context);
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

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
    if (checkoutResponse?.status === 'approved') {
      removeLocalStorage('cart');
      setCartItems();
      setCartItemsData();
    }
  }, [checkoutResponse]);

  useEffect(() => {
    if (paymentId) renderStatusScreenBrick(bricksBuilder);
  }, [paymentId]);

  return (
    <section className="shopping-cart light">
      <div className="container container__payment">
        <div className="section-title text-center pt-5 pb-4">
          <h1>Dados do Pagamento</h1>
          <h4>Confira as informações do pagamento de sua compra</h4>
        </div>
        <div className="form-payment">
          <div id="statusScreenBrick_container"> </div>
        </div>
      </div>
    </section>
  );
}
