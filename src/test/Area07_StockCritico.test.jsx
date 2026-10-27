import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

describe('Área 7: Alerta de Stock en Inventario', () => {
  it('7.1 Debería mostrar la cantidad de stock disponible en la tarjeta', () => {
    const prod = { codigo: 'CG001', nombre: 'PC Gamer', stock: 2, precio: 1299990 };
    render(
      <BrowserRouter>
        <ProductCard producto={prod} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Stock: 2/i)).toBeInTheDocument();
  });

  it('7.2 Debería mostrar "Sin stock" cuando el producto no tiene disponibilidad', () => {
    const prodSinStock = { codigo: 'AC002', nombre: 'Mouse', stock: 0, precio: 15000 };
    render(
      <BrowserRouter>
        <ProductCard producto={prodSinStock} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Sin stock/i)).toBeInTheDocument();
  });
});