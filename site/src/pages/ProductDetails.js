/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import urlFor from '../services/urlFor';
import '../css/productDetails.css';
import fetchContent from '../services/fetchContent';
import QuantityFormGroup from '../components/QuantityFormGroup';
import currencyFormatter from '../services/currencyFormatter';

export default function ProductDetails() {
  const { setLoading } = useContext(Context);
  const { id } = useParams();
  const [product, setProduct] = useState('');

  const getProduct = async () => {
    setLoading((prevLoading) => prevLoading + 1);
    const [data] = await fetchContent({ query: 'product', id });
    if (!data) { setProduct(null); }
    setProduct(data);
    setLoading((prevLoading) => prevLoading - 1);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (product) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center p-3 container">
        <div className="product-card-div">
          <div key={ product.title }>

            <div className="product-title-div section-title">
              <h1 className="product-title">{product.title}</h1>
            </div>
            <div className="product-image-div">
              <img className="product-image" width="500px" height="500px" src={ urlFor(product.photo?.image).url() } alt={ product.photo?.alt } />
            </div>
            <div className="product-description-div">
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-price-div">
              <p className="product-price">{currencyFormatter({ format: 'pt-br', value: product.price, symbol: true })}</p>
            </div>
            <div className="button-div">
              <QuantityFormGroup id={ id } />
            </div>

          </div>

        </div>
      </div>
    );
  }
  return (product === undefined
    ? <div className="product-title">Produto não encontrado</div> : null
  );
}
