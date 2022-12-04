/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Banner from '../components/Banner';
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
        <Banner />
      </section>
    </>
  );
}
