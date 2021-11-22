import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { setupIntersectionObserverMock } from 'app/utility/testUtilities'
import App from '../App'

beforeEach(() => {
  setupIntersectionObserverMock()
})

test('renders posts in navbar', () => {
  render(<App />)
  const linkElement = screen.getByText(/posts/i)
  expect(linkElement).toBeInTheDocument()
})
