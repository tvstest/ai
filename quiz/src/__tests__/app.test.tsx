import { render } from '@testing-library/react'
import App from 'App'
import '@testing-library/jest-dom'

test('App is rendered properly with mui and router configuration', () => {
  render(<App />)
})
