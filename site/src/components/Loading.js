/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../css/loading.css';

function Loading() {
  const { loading, setLoading } = useContext(Context);

  useEffect(() => {
    if (loading < 0) setLoading(0);
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
