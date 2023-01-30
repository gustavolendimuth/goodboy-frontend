import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Context from '../context/Context';
import urlFor from '../services/urlFor';
import '../css/productDetails.css';
import fetchContent from '../services/fetchContent';
import QuantityFormGroup from '../components/QuantityFormGroup';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const [data] = await fetchContent('product', id);
      console.log('data product', data);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) { return <div> Carregando </div>; }
  if (product) {
    return (
      <div className="product-card d-flex flex-column justify-content-center align-items-center p-3">
        <div>
          <div className="product-title" key={ product.title }>
            <div>
              <div>
                <p className="product-title">{product.title}</p>
              </div>
              <div>
                <img className="product-image" src={ urlFor(product.photo?.image).url() } alt={ product.photo?.alt } />
              </div>
              <div>
                <p className="product-description">{product.description}</p>
              </div>
              <div>
                <p className="product-price">{product.price}</p>
              </div>
              <div>
                <QuantityFormGroup id={ id } />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
  return <div>Produto não encontrado</div>;
}
