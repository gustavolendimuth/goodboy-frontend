/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import Context from '../context/Context';
import '../css/alert.css';

function Alert() {
  const {
    alert,
    setAlert,
  } = useContext(Context);

  useEffect(() => {
    let timer;
    if (alert?.time) {
      timer = setTimeout(() => {
        setAlert();
      }, alert?.time);
    }
    return () => clearTimeout(timer);
  }, [alert]);

  if (!alert) return null;

  return (
    <div className="overlay">
      <div
        className={ `alert alert-message ${alert.ok ? 'alert-success' : ' alert-danger'} alert-dismissible fade show d-flex align-items-center` }
        role="alert"
      >
        <div>
          <strong>
            {
              alert.ok ? <FiCheckCircle className="icon me-3" /> : <FiAlertTriangle className="icon me-3" />
            }
          </strong>
        </div>
        {alert.message}
        <button onClick={ () => setAlert() } type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
      </div>
    </div>
  );
}

export default Alert;
