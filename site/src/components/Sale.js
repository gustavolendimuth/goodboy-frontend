import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/sale.css';
import ProductCard from './ProductCard';

export default function Sale() {
  const { products } = useContext(Context);
  return (
    <div className="sale-container p-5">
      <div className="container">
        <h2>Componente Promoção</h2>
        <section>
          <ProductCard products={ products } />
        </section>
      </div>
    </div>
  );
}
