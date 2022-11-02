import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

export default function Categories() {
  const {
    products,
    categories,
  } = useContext(Context);

  const mainCategoryCaes = categories?.[0]?.subCategories || [];
  //   const mainCategoryGatos = categories?.[1]?.subCategories || [];
  useEffect(() => {
    // console.log('chamou useEffect');
    if (categories) console.log('Objeto das categorias', categories);
    // if (products) console.log('Objeto dos produtos', products);
  }, [products, categories]);

  return (
    <div>
      <div>
        <h2>HomeProducts</h2>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#teste">Action</a></li>
            <li><a className="dropdown-item" href="#teste">Another action</a></li>
            <li><a className="dropdown-item" href="#teste">Something else here</a></li>
          </ul>
        </div>
        {products && products.map((product) => (
          <div key={ product.title }>
            <p>{product.title}</p>
            <img src={ urlFor(product.photo.image).url() } alt={ product.photo.alt } />
          </div>
        ))}
      </div>
    </div>
  );
}

/* {
  mainCategoryGatos.map((subCategory) => (
    <button
      key={ subCategory }
      type="button"
      data-testid={ `${subCategory}-cães` }
      // onClick={ () => handleClick(subCategory) }
    >
      { subCategory }
    </button>

  ))
} */
