/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/sale.css';
import ProductCard from './ProductCard';

export default function Sale() {
  const { products } = useContext(Context);
  return (
    <div className="sale-container pt-5">
      <div className="container">
        <h2>Promoções</h2>
        <section>
          <div className="container pt-5">
            <div
              className="row gx-5 gy-5 row-cols-1 row-cols-sm-2 row-cols-lg-4
              justify-content-center align-items-center pb-4"
            >
              {products && products.map((product) => (
                <ProductCard key={ product._id } product={ product } />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
