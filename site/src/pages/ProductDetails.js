import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Context from '../context/Context';
import urlFor from '../services/urlFor';

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
        setSession
    })

    useEffect(() => {
        // console.log("produtos na pagina de detalhes", products)
        const productsWithThisId = products?.filter((p) => p._id === id);
        if (productsWithThisId?.length > 0) {
            setProduct(productsWithThisId[0]);
        }
    }, [products, id]);

    const handleAddClick = () => {
        // check if this product is already in the cart
        const shoppingCart = getLocalStorage('shoppingCart');
        if (shoppingCart) {
            if (shoppingCart[id]) {
                shoppingCart[id] = shoppingCart[id] + 1;
            } else {
                shoppingCart[id] = 1;
            }
            setLocalStorage('shoppingCart', shoppingCart);
        } else {
            setLocalStorage('shoppingCart', { [id]: 1 });
        }
    }

    if (product?.title) {
        return (
            <div>
                <div>
                    <div key={product.title}>
                        <div>
                            <div>
                                <p>{product.title}</p>
                            </div>
                            <div>
                                <img src={urlFor(product.photo?.image).url()} alt={product.photo?.alt} />
                            </div>
                            <div>
                                <p>{product.description}</p>
                            </div>
                            <div>
                                <div onClick={() => handleAddClick()}>QUANTIDADE E ADICIONAR NO CARRINHO</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    } else {
        <div>Produto não encontrado</div>
    }

}
