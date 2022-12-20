/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import Context from '../context/Context';
import '../css/login.css';
import useSingingIn from '../hooks/useSingingIn';

function Login() {
  const { email, magicLink } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      keepConnected: true,
    },
  });

  const {
    token,
    setToken,
    user,
    setUser,
    alert,
    setAlert,
    setLoginForm,
  } = useContext(Context);

  const navigate = useNavigate();
  useSingingIn();

  useEffect(() => {
    if (token && user) {
      navigate('/');
    }
  }, [token, user]);

  const getToken = async () => {
    const response = await fetch(`${process.env.REACT_APP_PROJECT_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, magicLink }),
    });

    const result = await response.json();

    if (response.ok) {
      const decoded = jwtDecode(result.token);
      setUser(decoded);
      setToken(result.token);
      result.message = 'Login efetuado com sucesso';
    }

    setAlert({ ok: response.ok, message: result.message, time: 5000 });
  };

  useEffect(() => {
    if (!token && email && magicLink && !alert) {
      getToken();
    }
  }, [email, magicLink]);

  return (
    <section className="form-signin">
      <form
        onSubmit={ handleSubmit((data) => setLoginForm(data)) }
      >
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Faça o login</h1>
          <p className="pb-3">Ao clicar no botão, será enviado um email com o link para fazer o login</p>
        </div>

        <div className="form-floating">
          <input type="email" className="form-control login my-2" { ...register('email') } id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Endereço de email</label>
        </div>

        <div className="checkbox mb-3">
          <label htmlFor="keepConnected">
            <input
              type="checkbox"
              { ...register('keepConnected') }
            />
            {' '}
            manter conectado
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Enviar link de login</button>
      </form>
    </section>
  );
}

export default Login;
