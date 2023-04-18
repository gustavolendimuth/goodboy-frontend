/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../../Context/Context';
import './QuantityFormGroup.css';

function QuantityFormGroup({ id }) {
  const { addToCart, removeFromCart, deleteFromCart, cartItems, getItemQuantity } = useContext(Context);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(id));
  }, [cartItems]);

  return (
    <div className="actions w-100 d-flex flex-column justify-content-center align-items-center gap-2">
      {quantity > 0 ? (
        <div className="input-group quantity-group">
          <button
            type="button"
            className="button-quantity-group btn btn-primary"
            onClick={ () => removeFromCart(id) }
          >
            <b>
              -
            </b>
          </button>
          <div className="form-control">
            <p className="quantity"><b>{quantity}</b></p>
          </div>
          <button
            type="button"
            className="button-quantity-group btn btn-primary"
            onClick={ () => addToCart(id) }
          >
            <b>
              +
            </b>
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={ () => addToCart(id) }
        >
          Adicionar
        </button>
      )}
      {quantity > 0 && (
        <button
          type="button"
          className="btn btn-danger w-100"
          onClick={ () => deleteFromCart(id) }
        >
          Remover
        </button>
      )}
    </div>
  );
}

QuantityFormGroup.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QuantityFormGroup;
