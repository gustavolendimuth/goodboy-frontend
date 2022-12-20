/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Context from '../context/Context';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../services/localStorage';

const useToken = () => {
  const {
    setToken,
    token,
    setUser,
    user,
    setAlert,
    loginForm,
  } = useContext(Context);

  useEffect(() => {
    const verifyToken = async (param) => {
      const response = await fetch(`${process.env.REACT_APP_PROJECT_DB_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: param }),
      });

      const result = await response.json();
      if (!response.ok) {
        setToken();
        removeLocalStorage('token');
        setAlert({ ok: response.ok, message: result.message, time: 3000 });
        return;
      }

      setToken(param);
      const decoded = jwtDecode(param);
      setUser(decoded.data);
      setAlert({ ok: response.ok, message: result.message, time: 3000 });
    };

    const result = getLocalStorage('token');
    if (result && !user) {
      verifyToken(result);
    }
  }, []);

  useEffect(() => {
    if (loginForm.email) {
      if (loginForm.keepConnected) {
        setLocalStorage('keepConnected', loginForm.keepConnected);
      } else {
        removeLocalStorage('keepConnected');
      }
    }
  }, [loginForm]);

  useEffect(() => {
    const keepConnected = getLocalStorage('keepConnected');
    if (token && keepConnected) {
      setLocalStorage('token', token);
    } else {
      removeLocalStorage('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) console.log('user', user);
  }, [user]);
};

export default useToken;
