import App from 'app/App'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'

beforeEach(() => {
  render(<App />)
})

test('matches the app snapshot', () => {
  const domTree = renderer.create(<App />).toJSON()
  expect(domTree).toMatchSnapshot()
})

test('get India country info and its capital weather info for Delhi', () => {
  const headerText = screen.getByText(/Country and Weather Info/i)
  expect(headerText).toBeInTheDocument()
})
