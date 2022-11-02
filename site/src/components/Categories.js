import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../css/Categories.css';

export default function Categories() {
  const {
    products,
    categories,
  } = useContext(Context);

  // declaração e tratamento do retorno da API para iterar sobre as categorias de produtos
  const mainCategoryCaes = categories?.[0]?.subCategories || [];
  const mainCategoryGatos = categories?.[1]?.subCategories || [];

  // log das categorias
  useEffect(() => {
    if (categories) console.log('Objeto das categorias', categories);
  }, [products, categories]);

  return (
    <div className="categories-container">
      <div className="dropdown">
        {/* botão de dropdown */}
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img className="animal-img-icon" alt="cão" src="https://images.tcdn.com.br/files/1127101/themes/7/img/ico-caes.png" height="30" width="35" />
          Cães
        </button>
        {/* iteração sobre as categorias de produtos para retorna-los em itens de um dropdown clicável */}
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            mainCategoryCaes.map((subCategory) => (
              <a
                className="dropdown-item"
                // link placeholder para redirecionamento
                href="https://www.w3schools.com/tags/att_a_href.asp#:~:text=Definition%20and%20Usage,will%20not%20be%20a%20hyperlink."
                key={ subCategory }
                data-testid={ `${subCategory}-caes` }
              >
                { subCategory }
              </a>

            ))
          }
        </div>
      </div>
      <div className="dropdown">
        {/* botão de dropdown */}
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img className="animal-img-icon" alt="gato" src="https://images.tcdn.com.br/files/1127101/themes/7/img/ico-gatos.png" height="30" width="30" />
          Gatos
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {/* iteração sobre as categorias de produtos para retorna-los em itens de um dropdown clicável */}
          {
            mainCategoryGatos.map((subCategory) => (
              <a
                className="dropdown-item"
                // link placeholder para redirecionamento
                href="https://www.w3schools.com/tags/att_a_href.asp#:~:text=Definition%20and%20Usage,will%20not%20be%20a%20hyperlink."
                key={ subCategory }
                data-testid={ `${subCategory}-gatos` }
              >
                { subCategory }
              </a>

            ))
          }
        </div>
      </div>
    </div>
  );
}
