/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable import/prefer-default-export */
import { useContext, useEffect, useState } from 'react';
import fetchOrders from '../services/fetchOrders';
import Context from '../context/Context';

export default function LoadPaymentForm() {
  const errorMessage = 'Desculpe... serviço indisponível, tente mais tarde';

  const {
    setCheckoutResponse,
    total,
    setLoading,
    setAlert,
    items,
    cartItemsData,
    getItemQuantity,
    setItems,
    checkoutResponse,
  } = useContext(Context);

  const [paymentFormLoaded, setPaymentFormLoaded] = useState(false);
  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);

  useEffect(() => {
    if (!cartItemsData) return;
    setItems(
      cartItemsData?.map((item) => ({
        id: item._id,
        title: item.title,
        quantity: getItemQuantity(item._id),
        unit_price: item.price,
      })),
    );
  }, [cartItemsData]);

  const processPayment = async (formData) => {
    setLoading((prevLoading) => prevLoading + 1);

    const { result, error } = await fetchOrders({
      endpoint: 'process_payment',
      method: 'POST',
      body: { formData, items },
    });

    if (error || result.message || !result) {
      setLoading((prevLoading) => prevLoading - 1);
      setAlert({ ok: false, message: errorMessage });
      return;
    }
    return result;
  };

  const loadPaymentForm = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const { result: preferenceId } = await fetchOrders({ endpoint: 'preference', method: 'POST', body: { items } });

    const settings = {
      initialization: {
        amount: total,
        preferenceId,
        items,
      },
      callbacks: {
        onReady: () => {
          setLoading((prevLoading) => prevLoading - 1);
        },
        onError: (error) => {
          console.log(error);
          setAlert({
            ok: false,
            message: 'Dados inválidos, verifique os campos e tente novamente',
          });
        },
        onSubmit: ({ selectedPaymentMethod, formData }) => new Promise(() => {
          if (selectedPaymentMethod === 'wallet_purchase') {
            setAlert({ ok: true, message: 'Finalize o pagamento na aba do Mercado Pago', keep: true, overlay: true });
            return;
          }
          processPayment(formData)
            .then((result) => {
              if (result) setCheckoutResponse(result);
              return result;
            })
            .catch((error) => {
              console.log(error);
              setLoading((prevLoading) => prevLoading - 1);
              setAlert({ ok: false, message: errorMessage });
            });
        }),
      },
      locale: 'pt-BR',
      customization: {
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          bankTransfer: 'all',
          mercadoPago: ['wallet_purchase'],
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
    return bricks.create('payment', 'mercadopago-bricks-container__PaymentCard', settings);
  };

  useEffect(() => {
    let cardPaymentBrickController;

    const mountCardPaymentBrickController = async () => {
      if (!checkoutResponse && total && items && !paymentFormLoaded) {
        cardPaymentBrickController = await window.cardPaymentBrickController;
        if (cardPaymentBrickController) cardPaymentBrickController.unmount();
        window.cardPaymentBrickController = loadPaymentForm();
        setPaymentFormLoaded(true);
      }
    };
    mountCardPaymentBrickController();
    return () => {
      setPaymentFormLoaded(false);
      if (cardPaymentBrickController) cardPaymentBrickController.unmount();
    };
  }, [items, total]);
}
