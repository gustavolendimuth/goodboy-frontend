/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../context/Context';
import '../css/checkout.css';

export default function CheckoutResponse() {
  const { checkoutResponse, removeLocalStorage, setCartItems, setCartItemsData } = useContext(Context);

  if (!checkoutResponse) {
    return <Navigate to="/carrinho" />;
  }

  const mp = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);
  const bricksBuilder = mp.bricks();

  const renderStatusScreenBrick = async (param) => {
    const settings = {
      initialization: {
        paymentId: checkoutResponse.id, // id de pagamento gerado pelo Mercado Pago
      },
      callbacks: {
        onReady: () => {
          console.log('Status Screen Brick is ready');
        },
        onError: (error) => {
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
    renderStatusScreenBrick(bricksBuilder);
  }, []);

  useEffect(() => {
    if (checkoutResponse?.status === 'approved') {
      removeLocalStorage('cart');
      setCartItems();
      setCartItemsData();
    }
  }, [checkoutResponse]);

  return (
    <section className="shopping-cart light">
      <div className="container container__payment">
        <div className="block-heading">
          <h2>Dados do Pagamento</h2>
          <p>Informações sobre sua compra. Salve em seu dispositivo para consulta posterior</p>
        </div>
        <div className="form-payment">
          <div id="statusScreenBrick_container"> </div>
        </div>
      </div>
    </section>
  );
}
