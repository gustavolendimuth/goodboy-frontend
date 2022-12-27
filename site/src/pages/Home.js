/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import AllProducts from '../components/AllProducts';
import Sale from '../components/Sale';
import Spotlight from '../components/Spotlight';

export default function Home() {
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
