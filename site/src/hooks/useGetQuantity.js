import { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';

const useGetQuantity = (id) => {
  const [quantity, setQuantity] = useState(0);
  const {
    cartItems,
  } = useContext(Context);

  useEffect(() => {
    setQuantity(cartItems?.find((item) => item.id === id)?.quantity || 0);
  }, [id, cartItems]);
  return quantity;
};

export default useGetQuantity;
