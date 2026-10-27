import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResumenPedido from '../components/ResumenPedido';

describe('Área 5: Regla de Negocio - Descuento Duoc 20%', () => {
  it('5.1 Debería aplicar y mostrar el descuento del 20% en el resumen', () => {
    const { container } = render(
      <BrowserRouter>
        <ResumenPedido subtotal={100000} descuento={20000} total={80000} />
      </BrowserRouter>
    );

    expect(screen.getByText(/descuento duoc \(20%\)/i)).toBeInTheDocument();
    expect(container.querySelector('.monto-total')).toHaveTextContent('$80.000');
  });

  it('5.2 Debería mostrar el monto total sin descuento reflejado', () => {
    const { container } = render(
      <BrowserRouter>
        <ResumenPedido subtotal={100000} descuento={0} total={100000} />
      </BrowserRouter>
    );

    expect(screen.queryByText(/descuento duoc \(20%\)/i)).toBeNull();
    expect(container.querySelector('.monto-total')).toHaveTextContent('$100.000');
  });
});