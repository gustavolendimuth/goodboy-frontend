/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import fetchOrders from '../utils/fetchOrders';

const useFetchOrders = () => {
  const { token, setAlert, setLoading, setOrders, user, setOrdersIsFinished } = useContext(Context);

  useEffect(() => {
    const getOrders = async () => {
      let response;
      let result;

      if (!user) return;

      try {
        setLoading((prevLoading) => prevLoading + 1);

        const data = await fetchOrders({ endpoint: 'order', method: 'GET', token });
        result = data.result;
        response = data.response;

        if (response.ok) {
          setOrders(result);
        }
      } finally {
        setLoading((prevLoading) => prevLoading - 1);

        if (result?.message) {
          setAlert({
            ok: response?.ok || false,
            message: 'Serviço indisponível, tente mais tarde',
          });
        }
      }

      setOrdersIsFinished(true);
    };

    getOrders();
  }, [user]);
};

export default useFetchOrders;
