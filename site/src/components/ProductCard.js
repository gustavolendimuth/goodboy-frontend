/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
// A função urlFor é usada para retornar o endereço da imagem a partir do retorno da API
import urlFor from '../services/urlFor';
import '../css/productCard.css';
import Context from '../context/Context';
import currencyFormatter from '../services/currencyFormatter';

// Componente dos Cards que recebe como props um array de produtos e faz o map desses produtos

export default function ProductCard({ product }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    getItemQuantity,
    deleteFromCart,
  } = useContext(Context);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(getItemQuantity(product._id));
  }, [cartItems]);

  if (!product) return null;

  return (
    <div className="col" key={ product.title }>
      <div className="product-card d-flex flex-column justify-content-center align-items-center p-3">
        <div className="p-2">
          <img
            src={ urlFor(product.photo.image).url() }
            alt={ product.photo.alt }
            height="200px"
            width="200px"
            style={ { objectFit: 'contain' } }
          />
        </div>
        <div>
          <p className="product-title p-2">{product.title}</p>
        </div>
        <div>
          <p className="product-price">
            {`R$${currencyFormatter('pt-BR', product.price)}`}
          </p>
        </div>
        <div className="actions p-2">
          {quantity > 0 ? (
            <div className="d-flex justify-content-center align-items-center pt-1 pb-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={ () => removeFromCart(product._id) }
              >
                -
              </button>
              <p className="quantity px-2"><b>{quantity}</b></p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={ () => addToCart(product._id) }
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={ () => addToCart(product._id) }
            >
              Adicionar ao carrinho
            </button>
          )}
          {quantity > 0 && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={ () => deleteFromCart(product._id) }
            >
              Remover do carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ProductCard.defaultProps = {
  product: {},
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        asset: PropTypes.shape({
          _ref: PropTypes.string,
        }),
      }),
      alt: PropTypes.string,
    }),
  }),
};
