import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import urlFor from '../services/urlFor';
// import '../css/productDetails.css';
import fetchContent from '../services/fetchContent';
import QuantityFormGroup from '../components/QuantityFormGroup';

export default function ProductDetails() {
  const {
    products,
    getLocalStorage,
    setLocalStorage,
    session,
    setSession,
  } = useContext(Context);
  const { id } = useParams();
  const [product, setProduct] = useState();

  console.log({
    getLocalStorage,
    setLocalStorage,
    session,
    setSession,
  });

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchContent('product', id);
      console.log('data product', data);
      setProduct([data]);
    };
    getProduct();
  }, []);

  useEffect(() => {
    // console.log("produtos na pagina de detalhes", products)
    const productsWithThisId = products?.filter((p) => p._id === id);
    if (productsWithThisId?.length > 0) {
      setProduct(productsWithThisId[0]);
    }
  }, [products, id]);

  // const handleAddClick = () => {
  //   // check if this product is already in the cart
  //   const shoppingCart = getLocalStorage('shoppingCart');
  //   if (shoppingCart) {
  //   //   shoppingCart.push(product);
  //   // }
  //   // setLocalStorage('shoppingCart', [product]);
  //     if (shoppingCart[id]) {
  //       shoppingCart[id] += 1;
  //     } else {
  //       shoppingCart[id] = 1;
  //     }
  //     setLocalStorage('shoppingCart', shoppingCart);
  //   } else {
  //     setLocalStorage('shoppingCart', { [id]: 1 });
  //   }
  // };

  if (product?.title) {
    return (
      <div className="product-card d-flex flex-column justify-content-center align-items-center p-3">
        <div>
          <div className="product-title" key={ product.title }>
            <div>
              <div>
                <p>{product.title}</p>
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
                {/* <button type="button" className="btn btn-primary" onClick={ () => handleAddClick() }>ADICIONAR AO CARRINHO</button> */}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
  return <div>Produto não encontrado</div>;
}
