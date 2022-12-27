/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Context from '../context/Context';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../services/localStorage';
import fetchAPI from '../services/fetchAPI';

const useToken = () => {
  const {
    setToken,
    token,
    setUser,
    user,
    setAlert,
    loginForm,
    setLoading,
  } = useContext(Context);

  useEffect(() => {
    const verifyToken = async (param) => {
      setLoading((prevLoading) => prevLoading + 1);

      const { response, result } = await fetchAPI({ endpoint: 'login', method: 'POST', body: { token: param } });

      if (!response.ok) {
        setToken();
        removeLocalStorage('token');
        setAlert({
          ok: response?.ok || false,
          message: result?.message || 'Serviço indisponível, tente mais tarde',
          time: 5000,
        });
        return;
      }

      setToken(param);
      const decoded = jwtDecode(param);
      setUser(decoded.data);
      setLoading((prevLoading) => prevLoading - 1);
    };

    const result = getLocalStorage('token');
    if (result && !user) {
      verifyToken(result);
    }
  }, []);

  useEffect(() => {
    if (loginForm?.email) {
      setLocalStorage('keepConnected', JSON.stringify(loginForm.keepConnected));
    }
  }, [loginForm]);

  useEffect(() => {
    const keepConnected = getLocalStorage('keepConnected') === 'true';
    if (token && keepConnected) {
      setLocalStorage('token', token);
    } else {
      removeLocalStorage('token');
    }
  }, [token]);
};

export default useToken;
