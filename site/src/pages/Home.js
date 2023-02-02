/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Products from '../components/Products';
import Sale from '../components/Sale';
import Spotlight from '../components/Spotlight';
import Context from '../context/Context';
import useSaleAndSpotlight from '../hooks/useSaleAndSpotlight';

export default function Home() {
  const { products } = useContext(Context);

  useSaleAndSpotlight();

  return (
    <>
      <section>
        <Sale />
      </section>
      <section>
        <Spotlight />
      </section>
      <section className="pt-5">
        <Products products={ products } />
      </section>
    </>
  );
}
