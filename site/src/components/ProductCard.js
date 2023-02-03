/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
import { Link } from 'react-router-dom';
import urlFor from '../services/urlFor';
import '../css/productCard.css';
import currencyFormatter from '../services/currencyFormatter';
import QuantityFormGroup from './QuantityFormGroup';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="col" key={ product.title }>
      <div className="product-card gap-3 card h-100 d-flex flex-column justify-content-between align-items-center p-4">
        <Link to={ `/produto/${product._id}` }>
          <img
            src={ urlFor(product.photo.image)
              .format('webp').quality(95).height(250)
              .url() }
            alt={ product.photo.alt }
            style={ { objectFit: 'contain' } }
            loading="lazy"
          />
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
