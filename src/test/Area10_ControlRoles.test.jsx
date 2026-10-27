import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';

describe('Área 10: Control de Accesos y Roles', () => {
  it('10.1 Debería mostrar la barra de navegación correctamente para Administrador', () => {
    const admin = { nombreCompleto: 'Camila Reyes', tipoUsuario: 'Administrador' };
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <Navbar usuario={admin} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('10.2 Debería renderizar la navegación para usuario Cliente', () => {
    const cliente = { nombreCompleto: 'Matías López', tipoUsuario: 'Cliente' };
    render(
      <BrowserRouter>
        <AuthProvider>
          <CarritoProvider>
            <Navbar usuario={cliente} />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});