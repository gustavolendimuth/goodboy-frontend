/* eslint-disable react-hooks/exhaustive-deps */
import jwtDecode from 'jwt-decode';
import { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import fetchOrders from '../utils/fetchOrders';

const useLogin = ({ email = '', magicLink = '' }) => {
  const { setAlert, loginForm, setLoading, setUser, setToken } = useContext(Context);
  let result;
  let response;
  let body;

  useEffect(() => {
    if (loginForm?.email || magicLink?.length) {
      const login = async () => {
        try {
          setLoading((prevLoading) => prevLoading + 1);

          body = { email: loginForm?.email || email };
          if (magicLink?.length && !loginForm?.email) {
            body.magicLink = magicLink;
          }

          const data = await fetchOrders({ endpoint: 'login', method: 'POST', body });
          result = data.result;
          response = data.response;

          if (response?.ok && result?.token) {
            const decoded = jwtDecode(result.token);
            setUser(decoded);
            setToken(result.token);
            result.message = 'Login efetuado com sucesso';
          }
        } finally {
          setLoading((prevLoading) => prevLoading - 1);

          setAlert({
            ok: response?.ok || false,
            message: result?.message || 'Serviço indisponível, tente mais tarde',
            time: response?.ok && 5000,
          });
        }
      };

      login();
    }
  }, [loginForm]);
};

export default useLogin;
