/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Products from '../Components/Products/Products';
import Sale from './Components/Sale';
import Spotlight from './Components/Spotlight';
import Context from '../../Context/Context';
import useSaleAndSpotlight from '../../Hooks/useSaleAndSpotlight';

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
