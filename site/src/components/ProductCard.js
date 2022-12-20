/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
import urlFor from '../services/urlFor';
import '../css/productCard.css';
import currencyFormatter from '../services/currencyFormatter';
import QuantityFormGroup from './QuantityFormGroup';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="col mx-auto" key={ product.title }>
      <div className="product-card card h-100 d-flex flex-column justify-content-between align-items-center p-4">
        <img
          src={ urlFor(product.photo.image).url() }
          alt={ product.photo.alt }
          height="250px"
          width="250px"
          className="p-2"
          style={ { objectFit: 'contain' } }
        />
        <div>
          <p className="product-title p-2">{product.title}</p>
        </div>
        <div>
          <p className="product-price">
            { currencyFormatter({ format: 'pt-BR', value: product.price, symbol: true }) }
          </p>
        </div>
        <QuantityFormGroup id={ product._id } />
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
