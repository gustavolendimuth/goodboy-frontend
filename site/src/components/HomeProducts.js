import PropTypes from 'prop-types';
import React from 'react';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
import urlFor from '../services/urlFor';

export default function HomeProducts({ products = [] }) {
  return (
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
  );
}

HomeProducts.defaultProps = {
  products: [],
};

HomeProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};
