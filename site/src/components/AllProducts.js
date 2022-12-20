/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/spotlight.css';
import '../css/productCard.css';
import ProductCard from './ProductCard';

export default function AllProducts() {
  const { products } = useContext(Context);
  return (
    <section className="container pt-5 px-4">
      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pt-4 pb-5"
      >
        {products && products.map((product) => (
          <ProductCard key={ product._id } product={ product } />
        ))}
      </div>
    </section>
  );
}
