import React, { useContext, useEffect, useRef } from 'react';
import './FloatingButtons.css';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import CartIcon from '../CartIcon/CartIcon';
import Context from '../../../Context/Context';

export default function FloatingButtons() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useContext(Context);

  const scrollToTop = useRef(null);
  // const cart = useRef(null);
  const checkout = useRef(null);

  useEffect(() => {
    const scrollFunction = () => {
      if (document.body.scrollTop > 170 || document.documentElement.scrollTop > 170) {
        scrollToTop.current.style.display = 'block';
      } else {
        scrollToTop.current.style.display = 'none';
      }
    };

    window.onscroll = () => { scrollFunction(); };
  }, []);

  useEffect(() => {
    if (pathname === '/checkout') {
      checkout.current.style.display = 'none';
    } else {
      checkout.current.style.display = 'block';
    }
  }, [pathname]);

  return (
    <div className="floating-buttons bg-danger rounded-5">
      <button
        ref={ scrollToTop }
        className="btn btn-danger scroll-to-top rounded-circle"
        type="button"
        onClick={ () => window.scrollTo(0, 0) }
        title="Ir para o topo"
      >
        <BsFillArrowUpCircleFill />
      </button>

      <CartIcon className={ pathname === '/carrinho' ? 'd-none' : 'd-block' } />

      <button
        ref={ checkout }
        className="btn btn-danger checkout rounded-circle"
        type="button"
        onClick={ () => navigate(cartItems?.length ? '/checkout' : null) }
        title="Ir para o checkout"
      >
        <FaMoneyBillWave />
      </button>
    </div>
  );
}
