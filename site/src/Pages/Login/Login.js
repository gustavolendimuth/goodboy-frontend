/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Context from '../../Context/Context';
import './Login.css';
import useLogin from '../../Hooks/useLogin';

function Login() {
  const { email, magicLink } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      keepConnected: true,
    },
  });

  const {
    token,
    user,
    setLoginForm,
  } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate('/');
    }
  }, [token, user]);

  useLogin({ email, magicLink });

  return (
    <div className="container py-4">
      <section className="form-signin">
        <form
          onSubmit={
            handleSubmit((data) => {
              if (data.email) setLoginForm(data);
            })
          }
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
    </div>
  );
}

export default Login;
