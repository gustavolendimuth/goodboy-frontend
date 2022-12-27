/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../css/loading.css';

function Loading() {
  const { loading, setLoading, setAlert } = useContext(Context);

  useEffect(() => {
    if (loading < 0) setLoading(0);
    const timer = setTimeout(() => {
      setLoading(0);
      setAlert({ ok: false, message: 'Ops... estamos com problemas, tente novamente mais tarde.' });
    }, 10000);

    if (!loading) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="overlay">
      <div className="spinner-modal">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-light">carregando...</p>
      </div>
    </div>
  );
}

export default Loading;
