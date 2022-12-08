/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/spotlight.css';
import '../css/productCard.css';
import ProductCard from './ProductCard';

export default function AllProducts() {
  const { products } = useContext(Context); // aqui deverá ser um array do spotlight, e não products
  return (
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
  );
}

// Repeti o mesmo componente porque é o mesmo map, apenas trocaremos o array "products" pelo array "spotlight" via props
