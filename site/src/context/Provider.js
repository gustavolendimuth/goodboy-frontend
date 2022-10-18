/* eslint-disable react/jsx-no-constructed-context-values */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [session, setSession] = useState();

  const setLocalStorage = (key, value) => {
    if (key && value) localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key) => key && JSON.parse(localStorage.getItem(key));

  const context = {
    setLocalStorage,
    getLocalStorage,
    session,
    setSession,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
