/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import './Products.css';
import ProductCard from '../ProductCard/ProductCard';

export default function Products({ products }) {
  return (
    <section className="all-products-container container px-4">
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pt-4 pb-5 justify-content-center"
      >
        {products?.map((product) => (
          <ProductCard key={ product._id } product={ product } />
        ))}
      </div>
    </section>
  );
}

Products.defaultProps = {
  products: [],
};

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })),
};
