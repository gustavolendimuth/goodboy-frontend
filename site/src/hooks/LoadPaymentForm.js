/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';
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
  } = useContext(Context);

  const mercadopago = new MercadoPago(process.env.REACT_APP_PROJECT_PUBLIC_KEY);

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

  if (!items) return null;

  return loadPaymentForm;
}
