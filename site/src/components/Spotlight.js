import React, { useContext } from 'react';
import Context from '../context/Context';
import '../css/spotlight.css';
import '../css/productCard.css';
import ProductCard from './ProductCard';

export default function Spotlight() {
  const { products } = useContext(Context); // aqui deverá ser um array do spotlight, e não products
  return (
    <div className="spotlight-container p-5">
      <div className="container">
        <section>
          <h2>Componente Destaques</h2>
          <ProductCard products={ products } />
        </section>
      </div>
    </div>
  );
}

// Repeti o mesmo componente porque é o mesmo map, apenas trocaremos o array "products" pelo array "spotlight" via props
