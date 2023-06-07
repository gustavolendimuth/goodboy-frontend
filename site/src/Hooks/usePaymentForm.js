/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable import/prefer-default-export */
import { useContext, useEffect, useState } from 'react';
import fetchOrders from '../utils/fetchOrders';
import Context from '../Context/Context';
// Utils
import urlFor from '../utils/urlFor';
import currencyFormatter from '../utils/currencyFormatter';

export default function usePaymentForm() {
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

  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);
  const [paymentFormLoaded, setPaymentFormLoaded] = useState(false);

  const errorMessage = 'Desculpe... serviço indisponível, tente mais tarde';

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
        amount: currencyFormatter({ format: 'en-US', value: total }),
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
            setAlert({
              ok: true,
              message: 'Finalize o pagamento na aba do Mercado Pago',
              keep: true,
              overlay: true,
            });
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
          maxInstallments: 1,
        },
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
      },
    };
    const bricks = await mercadopago.bricks();
    return bricks.create('payment', 'mercadopago-bricks-container__PaymentCard', settings);
  };

  useEffect(() => {
    const mountCardPaymentBrickController = async () => {
      if (!checkoutResponse && total && items && !paymentFormLoaded) {
        const cardPaymentBrickController = await window.cardPaymentBrickController;
        if (cardPaymentBrickController) window.location.reload();
        window.cardPaymentBrickController = loadPaymentForm();
        setPaymentFormLoaded(true);
      }
    };
    mountCardPaymentBrickController();
    return () => {
      setPaymentFormLoaded(false);
    };
  }, [items, total]);

  // useEffect(() => {
  //   const mountCardPaymentBrickController = async () => {
  //     if (!checkoutResponse && total && items && !paymentFormLoaded) {
  //       const cardPaymentBrickController = await window.cardPaymentBrickController;
  //       if (cardPaymentBrickController) {
  //         console.log(cardPaymentBrickController);
  //         cardPaymentBrickController.unmount();
  //       }
  //       window.cardPaymentBrickController = loadPaymentForm();
  //       setPaymentFormLoaded(true);
  //     }
  //   };
  //   mountCardPaymentBrickController();
  //   return () => {
  //     setPaymentFormLoaded(false);
  //   };
  // }, [items, total]);

  useEffect(() => {
    if (!cartItemsData) return;
    setItems(
      cartItemsData?.map((item) => ({
        id: item._id,
        title: item.title,
        quantity: getItemQuantity(item._id),
        unit_price: item.price,
        ncm: item.ncm,
        image: urlFor(item.photo.image)
          .size(500)
          .quality(95)
          .url(),
        originCode: item.originCode,
        situation: item.situation,
      })),
    );
  }, [cartItemsData]);
}
