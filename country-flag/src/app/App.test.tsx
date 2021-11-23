import React from 'react'
import { render, screen } from '@testing-library/react'
import App from 'app/App'

test('renders app component properly', () => {
  render(<App />)
  const headerText = screen.getByText(/Country and Weather Info/i)
  expect(headerText).toBeInTheDocument()
})
