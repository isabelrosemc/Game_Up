import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/tienda/Login';
import { AuthProvider } from '../context/AuthContext';

describe('Área 1: Autenticación de Usuario (Login)', () => {
  it('1.1 Debería renderizar los campos del formulario de login correctamente', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="password"]')).toBeInTheDocument();
  });

  it('1.2 Debería permitir interactuar con el formulario y presionar iniciar sesión', () => {
    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const emailInput = container.querySelector('input[type="email"]');
    const passInput = container.querySelector('input[name="password"]');

    fireEvent.change(emailInput, { target: { value: 'invalido@duoc.cl' } });
    fireEvent.change(passInput, { target: { value: 'errorpass' } });

    const boton = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(boton).toBeInTheDocument();
    fireEvent.click(boton);
  });
});