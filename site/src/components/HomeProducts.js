import PropTypes from 'prop-types';
import React from 'react';
import urlFor from '../services/urlFor';

export default function HomeProducts({ products }) {
  return (
    <div>
      <h2>HomeProducts</h2>
      {products && products.map((product) => (
        <div key={ product.title }>
          <p>{product.title}</p>
          <img src={ urlFor(product.photo.image).url() } alt={ product.alt } />
        </div>
      ))}
    </div>
  );
}

HomeProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
};
