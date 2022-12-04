import PropTypes from 'prop-types';
import React from 'react';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
import urlFor from '../services/urlFor';
import '../css/productCard.css';

// Componente dos Cards que recebe como props um array de produtos e faz o map desses produtos

export default function ProductCard({ products = [] }) {
  return (
    <div className="container pt-5">
      <div className="row gx-5 gy-5 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center align-items-center pb-4">
        {products && products.map((product) => (
          <div className="col" key={ product.title }>
            <div className="product-card d-flex flex-column justify-content-center align-items-center p-3">
              <div className="p-2">
                <img src={ urlFor(product.photo.image).url() } alt={ product.photo.alt } className="product-image" />
              </div>
              <div>
                <p className="product-title p-2">{product.title}</p>
              </div>
              <div>
                <p className="product-price">{product.price}</p>
              </div>
              <div className="actions">
                {/* // link placeholder para direcionar para a página de detalhes do produto */}
                <a href={ `/produto/${product._id}` } className="btn btn-primary" role="button">VER PRODUTO</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductCard.defaultProps = {
  products: [],
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};
