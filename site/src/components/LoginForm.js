/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function LoginForm({ message, setMessage }) {
  const [email, setEmail] = useState();

  const onChange = ({ target }) => {
    setEmail(target.value);
    console.log(target.value);
  };

  const singingIn = (param) => {
    const response = fetch(`${process.env.REACT_APP_PROJECT_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: param }),
    });
    if (response.message) {
      setMessage(response.message);
    }
    console.log('response', response);
    return response;
  };

  return (
    <section className="form-signin w-100 m-auto">
      {
        message && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong>
            {' '}
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
          </div>
        )
      }
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          singingIn(email);
        } }
      >
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Faça o login</h1>
          <p className="pb-3">Ao clicar em login, será enviado um email com o link para fazer o login</p>
        </div>

        <div className="form-floating">
          <input type="email" className="form-control" onChange={ onChange } value={ email } id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="checkbox mb-3">
          <label htmlFor="remember-me">
            <input type="checkbox" value="remember-me" id="remember-me" checked />
            {' '}
            manter conectado
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      </form>
    </section>
  );
}

LoginForm.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default LoginForm;
