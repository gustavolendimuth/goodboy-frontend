/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import currencyFormatter from '../services/currencyFormatter';
import urlFor from '../services/urlFor';

export default function CartProducts({ item }) {
  const {
    getItemQuantity,
    removeFromCart,
    addToCart,
    deleteFromCart,
    cartItems,
  } = useContext(Context);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(item._id));
  }, [cartItems]);

  if (!item) return null;

  return (
    <div key={ item._id } className="product">
      <div className="info">
        <div className="product-details">
          <div className="row">
            <div className="col-md-3">
              <img
                src={ urlFor(item.photo.image).url() }
                alt={ item.photo.alt }
                width="100%"
                height="200px"
                style={ { objectFit: 'contain' } }
              />
            </div>
            <div className="col-md-5 my-auto">
              <div className="product-info d-flex flex-column justify-content-center">
                <h5>
                  <span>{item.title}</span>
                  <br />
                </h5>
                <span id="unit-price text-danger"><b>{ `R$${currencyFormatter('pt-BR', item.price)}` }</b></span>
              </div>
            </div>
            <div className="col-md-4 my-auto">
              <div className="d-flex justify-content-center align-items-center pt-1 pb-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={ () => removeFromCart(item._id) }
                >
                  -
                </button>
                <p className="quantity px-2"><b>{quantity}</b></p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={ () => addToCart(item._id) }
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm m-2"
                  onClick={ () => deleteFromCart(item._id) }
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CartProducts.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      alt: PropTypes.any,
      image: PropTypes.any,
    }),
    price: PropTypes.any,
  }).isRequired,
};
