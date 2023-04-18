/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
// Context
import Context from '../../Context/Context';
// Components
import InvoiceModal from './Components/InvoiceModal';
// Utils
import { removeLocalStorage } from '../../utils/localStorage';
// Styles
import '../Checkout/Checkout.css';

export default function CheckoutResponse() {
  const {
    checkoutResponse,
    setCartItems,
    setCartItemsData,
    setLoading,
    setAlert,
    setCheckoutResponse,
  } = useContext(Context);

  const [statusBrickFormLoaded, setStatusBrickFormLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  let statusBrickController;

  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);

  const renderStatusBrick = async () => {
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
    const bricksBuilder = await mercadopago.bricks();
    window.statusBrickController = bricksBuilder.create(
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
  }, [checkoutResponse, status]);

  useEffect(() => {
    const statusBrickLoad = async () => {
      if (paymentId && status && !statusBrickFormLoaded) {
        statusBrickController = await window.statusBrickController;
        if (statusBrickController) statusBrickController.unmount();
        await renderStatusBrick();
        setStatusBrickFormLoaded(true);
      }
    };
    statusBrickLoad();
    return () => {
      setStatusBrickFormLoaded(false);
      if (statusBrickController) statusBrickController.unmount();
    };
  }, []);

  if (!paymentId) return <Navigate to="/checkout" />;

  return (
    <section className="form-payment shopping-cart light">
      <InvoiceModal paymentId={ paymentId } status={ checkoutResponse?.status || status } />
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
