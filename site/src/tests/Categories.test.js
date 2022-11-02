import { render, screen } from '@testing-library/react';
import App from '../App';

describe('verifica o funcionamento do componente Categories', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
