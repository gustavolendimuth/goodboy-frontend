import React, { useContext } from 'react';
import fetchContent from '../services/fetchContent';
import Context from '../context/Context';

// Renderizar os botões de categorias
// pegar o retorno da requisição da API

export default function Categories() {
  const {
    categories,
    setCategories,
  } = useContext(Context);

  getProducts = async () => {
    const categoriesResponse = await fetchContent('categories');
    setCategories(categoriesResponse);
  };

  return (
    <div>
      Cães
      {/* {map das subs dos cães} */}
      Gatos
      {/* {map das subs dos gatos} */}
    </div>
  );
}
