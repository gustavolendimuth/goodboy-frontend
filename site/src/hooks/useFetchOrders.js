/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

const useFetchOrders = ({ method }) => {
  const { token, setAlert, setLoading, setOrders, user, setOrdersIsFinished } = useContext(Context);

  useEffect(() => {
    const fetchOrders = async () => {
      let response;
      let result;

      if (!user) return;

      try {
        setLoading((prevLoading) => prevLoading + 1);

        const data = await fetchAPI({ endpoint: 'order', method: 'GET', token });
        result = data.result;
        response = data.response;

        if (response.ok && method === 'GET') {
          setOrders(result);
        }
      } finally {
        setLoading((prevLoading) => prevLoading - 1);

        if (result?.message) {
          setAlert({
            ok: response?.ok || false,
            message: 'Serviço indisponível, tente mais tarde',
            time: 5000,
          });
        }
      }

      setOrdersIsFinished(true);
    };

    fetchOrders();
  }, [user]);
};

export default useFetchOrders;
