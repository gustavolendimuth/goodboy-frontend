/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';
import '../css/spotlight.css';
import random from '../services/random';
import ProductCard from './ProductCard';

export default function Spotlight() {
  const { products } = useContext(Context);
  const [spotlightProducts, setSpotlightProducts] = useState();

  useEffect(() => {
    setSpotlightProducts(
      random(products?.filter((product) => product.spotlight), 4),
    );
  }, [products]);

  if (!spotlightProducts) return null;

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
            {spotlightProducts && spotlightProducts.map((product) => (
              <ProductCard key={ product._id } product={ product } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
