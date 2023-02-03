import React from 'react';
import { Link } from 'react-router-dom';
import goodboyLogo from '../images/goodboy_logo-transp.webp';
import pixLogo from '../images/pix-logo.png';
import visa from '../images/visa.svg';
import mastercard from '../images/mastercard.svg';
import mercadopago from '../images/mercadopago-logo.svg';

export default function Footer() {
  return (
    <footer className="py-4 mt-5 border-top bg-secondary text-light">
      <div className="container d-flex justify-content-between flex-wrap">
        <div className="pt-3">
          <Link className="logo" to="/" title="Good Boy" aria-label="Good Boy">
            <img width="150px" src={ goodboyLogo } alt="Good Boy" />
          </Link>
          <div className="social-media flex align-center">
            <a href="https://www.instagram.com/goodboy_house" title="Instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="icon icon-instagram v-align-middle" />
            </a>
          </div>
        </div>
        <div className="d-flex flex-column gap-1 pt-3">
          <h4 className="m-0">Institucional </h4>
          <p>
            <Link to="/sobre-a-good-boy" className="text-decoration-none text-light" title="Sobre a Good Boy">Sobre a Good Boy</Link>
          </p>
          <p>
            <Link to="/contato" className="text-decoration-none text-light" title="Fale Conosco">Fale Conosco</Link>
          </p>
        </div>
        <div className="d-flex flex-column gap-1 pt-3">
          <h4 className="m-0">Atendimento </h4>
          <p>
            <a href="tel:13996932144" className="text-decoration-none text-light" title="Telefone: (13) 99693-2144">
              (13) 99693-2144
            </a>
          </p>
          <p>
            <a href="mailto:contato@goodboy.net.br" className="text-decoration-none text-light" title="Email: contato@goodboy.net.br">
              contato@goodboy.net.br
            </a>
          </p>
        </div>
        <div>
          <h4 className="pt-3">Formas de pagamento </h4>
          <p className="pb-3 d-flex gap-3">
            <img height="25px" alt="Pix" src={ pixLogo } />
            <img height="25px" alt="Visa" src={ visa } />
            <img height="25px" alt="Mastercard" src={ mastercard } />
          </p>
          <h4 className="pt-3">Pagamento seguro</h4>
          <div className="google-seal">
            <img height="30px" alt="Mercadopago" src={ mercadopago } />
          </div>
        </div>
      </div>
      {/* <div className="col-md-4 d-flex align-items-center gap-5">
          <Link className="order-md-0" to="/">
            <img src={ goodboyLogo } alt="Good Boy Logo" width="150px" className="img-fluid" />
          </Link>
        </div> */}
    </footer>
  );
}
