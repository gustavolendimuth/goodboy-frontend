/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/sale.css';
import ProductCard from './ProductCard';

export default function Sale() {
  const { products } = useContext(Context);
  return (
    <section className="sale-container pt-5 pb-4">
      <div className="container px-4">
        <div className="section-title">
          <h1 className="text-light">Promoções</h1>
        </div>
        <div className="pt-4">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pb-5"
          >
            {products && products.map((product) => (
              <ProductCard key={ product._id } product={ product } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
