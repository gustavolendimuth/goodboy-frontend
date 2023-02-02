import React, { useEffect, useRef } from 'react';
import '../css/floatingButtons.css';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from './Cart';

export default function FloatingButtons() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const scrollToTop = useRef(null);
  const cart = useRef(null);
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
    if (pathname === '/carrinho') {
      cart.current.style.display = 'none';
    } else {
      cart.current.style.display = 'block';
    }
  }, [pathname]);

  return (
    <div className="floating-buttons d-flex flex-column bg-danger rounded-5">
      <button
        ref={ scrollToTop }
        className="btn btn-danger scroll-to-top rounded-circle"
        type="button"
        onClick={ () => window.scrollTo(0, 0) }
        title="Ir para o topo"
      >
        <BsFillArrowUpCircleFill />
      </button>

      <button
        ref={ cart }
        className="btn btn-danger cart rounded-circle"
        type="button"
        title="Ir para o carrinho"
      >
        <Cart />
      </button>

      <button
        ref={ checkout }
        className="btn btn-danger checkout rounded-circle"
        type="button"
        onClick={ () => navigate('/checkout') }
        title="Ir para o checkout"
      >
        <FaMoneyBillWave />
      </button>
    </div>
  );
}
