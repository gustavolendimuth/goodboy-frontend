/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import Context from '../../../Context/Context';
import './styles/Spotlight.css';
import ProductCard from '../../Components/ProductCard/ProductCard';

export default function Spotlight() {
  const { salesAndSpotlights } = useContext(Context);

  if (!salesAndSpotlights) return null;

  return (
    <section className="spotlight-container pt-5 pb-3">
      <div className="container px-4">
        <div className="section-title">
          <h1 className="text-light">Destaques</h1>
        </div>
        <div className="pt-4">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 pt-4 pb-5 justify-content-center"
          >
            {salesAndSpotlights?.spotlight?.map((product) => (
              <ProductCard key={ product._id } product={ product } />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
