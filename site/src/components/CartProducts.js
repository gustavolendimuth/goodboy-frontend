/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */

import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import currencyFormatter from '../services/currencyFormatter';
import urlFor from '../services/urlFor';
import QuantityFormGroup from './QuantityFormGroup';

export default function CartProducts({ item, info }) {
  const { index, array } = info;
  const { cartItems, getItemQuantity } = useContext(Context);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(item._id));
  }, [cartItems]);

  if (!item) return null;

  return (
    <div key={ item._id } className="product">
      <div
        className={ `row d-flex justify-content-center 
          ${index !== array.length - 1 && 'item pb-3'} 
          ${index !== 0 && 'pt-3'}` }
      >
        <div className="col-12 col-lg-2 p-0 text-center">
          <img
            src={ urlFor(item.photo.image).height(150).url() }
            alt={ item.photo.alt }
            style={ { objectFit: 'contain' } }
            width="150px"
            height="150px"
          />
        </div>
        <div className="col-12 col-lg-6 my-auto pt-3 pt-lg-0">
          <div className="product-info d-flex flex-column justify-content-center gap-3">
            <p className="fs-5 text-center text-md-start text-primary m-0">
              {item.title}
            </p>
            <div className="text-center text-lg-start">
              <p className="m-0">
                preço
              </p>
              <p className="fs-5 m-0">
                <b>
                  {
                    currencyFormatter({ format: 'pt-BR', value: item.price, symbol: true })
                  }
                </b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex justify-content-center justify-content-lg-end pt-3 pt-lg-0">
            <QuantityFormGroup id={ item._id } />
          </div>
          <div className="text-center text-lg-end">
            <div className="my-auto pt-3">
              <p className="m-0">
                subtotal
              </p>
              <p className="fs-5 m-0">
                <b>
                  {
                    currencyFormatter({ format: 'pt-BR', value: item.price * quantity, symbol: true })
                  }
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CartProducts.propTypes = {
  info: PropTypes.shape({
    array: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      photo: PropTypes.shape({
        alt: PropTypes.string,
        image: PropTypes.shape,
      }),
      price: PropTypes.number,
      title: PropTypes.string,
    })).isRequired,
    index: PropTypes.number,
  }).isRequired,
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photo: PropTypes.shape({
      alt: PropTypes.string,
      image: PropTypes.shape(),
    }),
    price: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};
