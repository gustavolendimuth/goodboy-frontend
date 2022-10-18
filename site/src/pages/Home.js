import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import HomeProducts from '../components/HomeProducts';
import Sale from '../components/Sale';
import Search from '../components/Search';
// A função fetchContent é responsável por fazer o fetch das informações
import fetchContent from '../services/fetchContent';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
// import urlFor from '../services/urlFor';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProducts = async () => {
      const data = await fetchContent('products');
      if (data) {
        setProducts(data);
        console.log(data);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <section>
        <Search />
      </section>
      <section>
        <Categories />
      </section>
      <section>
        <Sale />
      </section>
      <section>
        <HomeProducts products={ products } />
      </section>
    </>
  );
}
