import React from 'react';
import goodboyLogo from '../images/goodboy_logo-transp.webp';
import '../css/banner.css';

export default function Banner() {
  return (
    <div className="banner-container p-5">
      <h1>Banner aqui</h1>
      <img src={ goodboyLogo } alt="Good Boy Logo" width="222px" />
    </div>
  );
}

// imagem e fundo vermelho apenas para representar o banner
