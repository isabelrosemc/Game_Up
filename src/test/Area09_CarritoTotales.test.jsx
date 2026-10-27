import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../pages/tienda/Carrito';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Área 9: Carrito - Totales y Visualización', () => {
  it('9.1 Debería renderizar la vista del carrito con sus elementos principales', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <Carrito />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /carrito/i })).toBeInTheDocument();
  });

  it('9.2 Debería mostrar el mensaje de carrito vacío si no hay ítems', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <Carrito />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});