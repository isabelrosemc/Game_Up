import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('muestra el título principal', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /level-up gamer/i })).toBeInTheDocument()
  })
})