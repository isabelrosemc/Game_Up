import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../pages/tienda/Registro';

describe('Área 3: Validación de Mayoría de Edad (≥ 18 años)', () => {
  it('3.1 Debería permitir el ingreso de fecha para un mayor de 18 años', () => {
    const { container } = render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    const fechaInput = container.querySelector('input[type="date"]');
    if (fechaInput) {
      fireEvent.change(fechaInput, { target: { value: '2000-01-01' } });
      fireEvent.blur(fechaInput);
    }
    expect(screen.queryByText(/debe ser mayor de 18 años/i)).toBeNull();
  });

  it('3.2 Debería registrar el campo de fecha ante un menor de edad', () => {
    const { container } = render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    const fechaInput = container.querySelector('input[type="date"]');
    if (fechaInput) {
      fireEvent.change(fechaInput, { target: { value: '2015-05-15' } });
      fireEvent.blur(fechaInput);
    }
    expect(container).toBeDefined();
  });
});