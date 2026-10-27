import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalogo from '../pages/tienda/Catalogo';

describe('Área 6: Catálogo y Mock Data de Productos', () => {
  it('6.1 Debería renderizar la lista completa de productos desde el catálogo', () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );
    expect(screen.getByText('Catan')).toBeInTheDocument();
    expect(screen.getByText('Carcassonne')).toBeInTheDocument();
  });

  it('6.2 Debería renderizar la barra de búsqueda y el filtro de categorías', () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/buscar producto por nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoría/i)).toBeInTheDocument();
  });
});