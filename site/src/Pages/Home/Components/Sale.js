/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../../../Context/Context';
import './styles/Sale.css';
import ProductCard from '../../Components/ProductCard/ProductCard';

export default function Sale() {
  const { salesAndSpotlights } = useContext(Context);

  if (!salesAndSpotlights) return null;

  return (
    <section className="sale-container pt-5 pb-4">
      <div className="container px-4">
        <div className="section-title">
          <h1 className="text-light">Promoções</h1>
        </div>
        <div className="pt-4">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pb-5 justify-content-center"
          >
            {salesAndSpotlights?.sales?.map((product) => (
              <ProductCard key={ product._id } product={ product } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
