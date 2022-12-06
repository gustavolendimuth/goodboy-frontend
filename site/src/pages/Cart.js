import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import urlFor from '../services/urlFor';
import '../css/cart.css';

export default function Cart() {
  // const { session } = useParams();

  const [cartList, setCartList] = useState([]);
  const [storage, setStorage] = useState({});

  const {
    products,
    getLocalStorage,
    // setLocalStorage,
  } = useContext(Context);

  useEffect(() => {
    if (products) {
      const shoppingCart = getLocalStorage('shoppingCart');
      setStorage(shoppingCart);
      const productsIdList = Object.keys(shoppingCart);
      const filtered = products.filter((p) => productsIdList?.includes(p._id));
      setCartList(filtered);
    }
  }, [products]);

  const priceProductSum = (num1, num2) => {
    const result = Number(num1) * Number(num2);
    return result;
  };

  const totalPrice = () => {
    let sum = 0;
    cartList.forEach((p) => {
      sum += Number(p.price) * storage[p._id];
    });
    return sum;
  };

  return (
    <div>
      <div className="product-card d-flex flex-column justify-content-center align-items-center p-3">
        <p className="carrinho-title">Meu carrinho</p>
        {cartList?.map((prod) => (
          <div key={ prod._id }>
            <img className="product-image" src={ urlFor(prod.photo?.image).url() } alt={ prod.photo?.alt } />
            <p className="product-title">{prod.title}</p>
            <p className="product-price-single">
              Preço unitário:
              {' '}
              {priceProductSum(prod.price, storage[prod._id])}
            </p>
            <p className="product-price-single">
              Quantidade:
              {' '}
              {storage[prod._id]}
            </p>
            <button type="button">
              Del
            </button>
          </div>
        ))}
      </div>
      <p className="product-price-total">
        Total:
        {' '}
        {totalPrice()}
      </p>
    </div>
  );
}
