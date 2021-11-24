import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import App from './App'

test('navbar is getting rendered properly with application name', () => {
  render(<App />)
  const linkElement = screen.getByText(/quiz application/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders App correctly', () => {
  const domTree = renderer.create(<App />).toJSON()
  expect(domTree).toMatchSnapshot()
})
