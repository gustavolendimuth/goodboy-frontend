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

      <div className="dropdown show">
        {/* <a
          className="btn btn-secondary dropdown-toggle"
          href="https://getbootstrap.com/docs/4.0/components/dropdowns/"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Cães
        </a> */}
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Cães
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {
            mainCategoryCaes.map((subCategory) => (
              <a
                className="dropdown-item"
                href="https://www.w3schools.com/tags/att_a_href.asp#:~:text=Definition%20and%20Usage,will%20not%20be%20a%20hyperlink."
                key={ subCategory }
                // type="button"
                // data-testid={ `${subCategory}-caes` }
              >
                { subCategory }
              </a>

            ))
          }
        </div>
      </div>
      {/* {
        mainCategoryGatos.map((subCategory) => (
          <button
            key={ subCategory }
            type="button"
            data-testid={ `${subCategory}-caes` }
            // onClick={ () => handleClick(subCategory) }
          >
            { subCategory }
          </button>

        ))
      } */}
    </div>
  );
}
