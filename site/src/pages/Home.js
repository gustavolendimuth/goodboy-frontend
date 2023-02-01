/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Products from '../components/Products';
import Sale from '../components/Sale';
import Spotlight from '../components/Spotlight';
import Context from '../context/Context';

export default function Home() {
  const { products } = useContext(Context);
  return (
    <>
      <section>
        <Sale />
      </section>
      <section>
        <Spotlight />
      </section>
      <section>
        <Products products={ products } />
      </section>
    </>
  );
}
