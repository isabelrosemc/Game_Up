import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

describe('Área 8: Enlaces y Visualización de Producto', () => {
  it('8.1 Debería tener el enlace "Ver más" apuntando al detalle del producto', () => {
    const prod = { codigo: 'AC001', nombre: 'Control Xbox', stock: 5, precio: 45000 };
    render(
      <BrowserRouter>
        <ProductCard producto={prod} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link', { name: /ver más/i });
    expect(link).toHaveAttribute('href', '/productos/AC001');
  });

  it('8.2 Debería mostrar la clase sin-stock cuando el stock es 0', () => {
    const prodAgotado = { codigo: 'AC002', nombre: 'Mouse', stock: 0, precio: 15000 };
    render(
      <BrowserRouter>
        <ProductCard producto={prodAgotado} />
      </BrowserRouter>
    );
    expect(screen.getByText(/sin stock/i)).toHaveClass('sin-stock');
  });
});