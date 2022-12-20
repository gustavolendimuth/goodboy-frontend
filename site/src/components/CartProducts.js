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
        <div className="col-md-2 p-0 text-center">
          <img
            src={ urlFor(item.photo.image).url() }
            alt={ item.photo.alt }
            width="120px"
            height="120px"
            style={ { objectFit: 'contain' } }
          />
        </div>
        <div className="col-md-6 my-auto">
          <div className="product-info d-flex flex-column justify-content-center gap-3">
            <h3 className=" text-center text-md-start text-primary pt-3 m-0">
              {item.title}
            </h3>
            <div className="text-center text-md-start">
              <p>
                preço
              </p>
              <h4 className="m-0">
                <b>
                  {
                    currencyFormatter({ format: 'pt-BR', value: item.price, symbol: true })
                  }
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-2 my-auto py-3 px-4 text-center">
          <QuantityFormGroup id={ item._id } />
        </div>
        <div className="col-12 col-md-2 my-auto">
          <div className="text-center text-md-end">
            <div className="my-auto py-3">
              <p>
                subtotal
              </p>
              <h3>
                <b>
                  {
                    currencyFormatter({ format: 'pt-BR', value: item.price * quantity, symbol: true })
                  }
                </b>
              </h3>
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
