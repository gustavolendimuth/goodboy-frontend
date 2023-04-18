/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */

import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
// Context
import Context from '../../../Context/Context';
// Components
import QuantityFormGroup from '../../Components/QuantityFormGroup/QuantityFormGroup';
// Utils
import currencyFormatter from '../../../utils/currencyFormatter';
import urlFor from '../../../utils/urlFor';

export default function CartProducts({ item, info }) {
  const { index, array } = info;
  const { cartItems, getItemQuantity } = useContext(Context);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(item._id));
  }, [cartItems]);

  if (!item) return null;

  return (
    <div key={ item._id } className="product-item">
      <div
        className={ `row d-flex justify-content-center 
          ${index !== array.length - 1 ? 'item pb-3' : ''} 
          ${index !== 0 ? 'pt-3' : ''}` }
      >
        <div className="col-12 col-lg-2 p-0 text-center">
          <img
            src={ urlFor(item.photo.image).height(150).quality(95).url() }
            alt={ item.photo.alt }
            style={ { objectFit: 'contain' } }
            width="150px"
            height="150px"
          />
        </div>
        <div className="col-12 col-lg-8 pt-3 pb-lg-0 pb-3 pt-lg-0 d-flex flex-column justify-content-between text-center text-lg-start align-items-center align-items-lg-start gap-3">
          <div>
            <p className="cart-product-title fs-5 m-0 pt-lg-3 text-primary">
              {item.title}
            </p>
          </div>
          <div className="">
            <p className="m-0">
              Preço
            </p>
            <p className="fs-5 m-0">
              <b>
                {
                  currencyFormatter({ format: 'pt-BR', value: item.price, symbol: true })
                }
              </b>
            </p>
          </div>
          {/* </div> */}
        </div>
        <div className="col-12 col-lg-2 d-flex flex-column justify-content-center">
          <div className="text-end quantity-sub-total-group">
            <QuantityFormGroup id={ item._id } />
            <div>
              <p className="m-0 text-center text-lg-end">
                Subtotal
              </p>
              <p className="fs-5 m-0 text-center text-lg-end">
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
