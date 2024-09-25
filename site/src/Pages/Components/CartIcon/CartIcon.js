import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import Context from '../../../Context/Context';
import './CartIcon.css';

export default function CartIcon({ className }) {
  const { cartItems } = useContext(Context);

  return (
    <button
      className={ `btn btn-danger cart rounded-circle ${className}` }
      type="button"
      title="Ir para o carrinho"
    >
      <Link className="nav-link active" to={ cartItems?.length ? '/carrinho' : null }>
        <div className="position-relative">
          <FiShoppingCart className="cart-icon" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
            {cartItems?.length ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : 0}
          </span>
        </div>
      </Link>
    </button>
  );
}

CartIcon.defaultProps = {
  className: '',
};

CartIcon.propTypes = {
  className: PropTypes.string,
};
