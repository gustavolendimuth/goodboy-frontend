/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import Context from '../context/Context';

const useSingingIn = () => {
  const { setAlert, loginForm } = useContext(Context);

  useEffect(() => {
    if (loginForm.email?.length) {
      console.log(loginForm);
      const singingIn = async () => {
        const response = await fetch(`${process.env.REACT_APP_PROJECT_API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: loginForm.email }),
        });
        const result = await response.json();
        if (result?.message) {
          setAlert({ ok: response.ok, message: result.message, time: 5000 });
        }
      };

      singingIn();
    }
  }, [loginForm]);
};

export default useSingingIn;
