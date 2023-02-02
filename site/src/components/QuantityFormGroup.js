/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function QuantityFormGroup({ id }) {
  const { addToCart, removeFromCart, deleteFromCart, cartItems, getItemQuantity } = useContext(Context);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(id));
  }, [cartItems]);

  return (
    <div className="actions p-2 d-flex flex-column justify-content-center align-items-center">
      {quantity > 0 ? (
        <div className="bottom w-100">
          <div className="input-group mb-2">
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
