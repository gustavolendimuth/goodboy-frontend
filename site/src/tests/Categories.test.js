import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../context/Provider';

describe('verifica o funcionamento do componente Categories', () => {
  it('deve renderizar corretamente o dropdown de categorias de produtos para cães', async () => {
    render(<Provider><App /></Provider>);

    const btnGatos = screen.getByRole('button', { name: /gatogatos/i });
    const btnCaes = screen.getByRole('button', { name: /cãocães/i });
    expect(btnGatos).toBeVisible();
    expect(btnCaes).toBeVisible();
  });
});
