/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/spotlight.css';
import ProductCard from './ProductCard';

export default function Spotlight() {
  const { products } = useContext(Context); // aqui deverá ser um array do spotlight, e não products
  return (
    <section className="spotlight-container pt-5 pb-3">
      <div className="container px-4">
        <div className="section-title">
          <h1 className="text-light">Destaques</h1>
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

// Repeti o mesmo componente porque é o mesmo map, apenas trocaremos o array "products" pelo array "spotlight" via props
