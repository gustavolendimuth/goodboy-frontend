/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import '../css/sale.css';
import random from '../services/random';
import ProductCard from './ProductCard';

export default function Sale() {
  const { products } = useContext(Context);
  const [saleProducts, setSaleProducts] = useState();

  useEffect(() => {
    setSaleProducts(
      random(products?.filter((product) => product.sale), 4),
    );
  }, [products]);

  if (!saleProducts) return null;

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
            {saleProducts?.map((product) => (
              <ProductCard key={ product._id } product={ product } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
