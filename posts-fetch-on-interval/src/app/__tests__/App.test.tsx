import * as React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { setupIntersectionObserverMock } from 'app/utility/testUtilities'
import App from '../App'

beforeEach(() => {
  setupIntersectionObserverMock()
})

test('renders posts text in navbar', () => {
  render(<App />)
  const linkElement = screen.getByText(/posts/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders App correctly', () => {
  const domTree = renderer.create(<App />).toJSON()
  expect(domTree).toMatchSnapshot()
})
