/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
// Components
import QuantityFormGroup from '../QuantityFormGroup/QuantityFormGroup';
// Utils
import urlFor from '../../../utils/urlFor';
import currencyFormatter from '../../../utils/currencyFormatter';
// Styles
import './ProductCard.css';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="col" key={ product.title }>
      <div className="product-card gap-3 card h-100 d-flex flex-column justify-content-between align-items-center p-4">
        <Link to={ `/produto/${product._id}` }>
          {
            product.photo.image.asset._ref ? (
              <img
                src={ urlFor(product.photo.image)
                  .format('webp').quality(90).height(250)
                  .url() }
                className="product-image img-fluid"
                alt={ product.photo.alt }
                loading="lazy"
              />
            ) : (
              <div
                width="200px"
                height="200px"
                className="rounded bg-primary d-flex flex-column justify-content-center align-items-center"
              >
                <h1>Foto</h1>
              </div>
            )
          }
        </Link>
        <div>
          <Link className="text-decoration-none" to={ `/produto/${product._id}` }>
            <p className="product-title p-0 m-0">{product.title}</p>
          </Link>
        </div>
        <div>
          <p className="product-price p-0 m-0">
            { currencyFormatter({ format: 'pt-BR', value: product.price, symbol: true }) }
          </p>
        </div>
        <div className="d-flex justify-content-center w-100">
          <QuantityFormGroup id={ product._id } />
        </div>
      </div>
    </div>
  );
}

ProductCard.defaultProps = {
  product: {},
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        asset: PropTypes.shape({
          _ref: PropTypes.string,
        }),
      }),
      alt: PropTypes.string,
    }),
  }),
};
