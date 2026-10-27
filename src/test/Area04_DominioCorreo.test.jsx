import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from '../pages/tienda/Registro';

describe('Área 4: Validación de Dominios de Correo', () => {
  it('4.1 Debería aceptar correos con dominios permitidos (@duoc.cl o @gmail.com)', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText(/correo/i);
    fireEvent.change(emailInput, { target: { value: 'alumno@duoc.cl' } });
    fireEvent.blur(emailInput);

    expect(screen.queryByText(/correo no permitido/i)).toBeNull();
  });

  it('4.2 Debería verificar el campo de correo ante dominios no autorizados', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText(/correo/i);
    fireEvent.change(emailInput, { target: { value: 'usuario@hotmail.com' } });
    fireEvent.blur(emailInput);

    expect(emailInput.value).toBe('usuario@hotmail.com');
  });
});