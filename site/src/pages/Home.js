/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import AllProducts from '../components/AllProducts';
// import Banner from '../components/Banner';
import Sale from '../components/Sale';
import Spotlight from '../components/Spotlight';
import Context from '../context/Context';

export default function Home() {
  const {
    products,
    categories,
  } = useContext(Context);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (categories) console.log('Objeto das categorias', categories);
  }, [categories]);

  useEffect(() => {
    if (products) console.log('Objeto dos produtos', products);
  }, [products]);

  return (
    <>
      <section>
        <Sale />
      </section>
      <section>
        <Spotlight />
      </section>
      <section>
        <AllProducts />
      </section>
    </>
  );
}
