import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from 'App'

test('App loads with router and mui theme configuration properly', () => {
  render(
    <Router>
      <App />
    </Router>
  )
})

test('matches the app snapshot', async () => {
  expect(
    <Router>
      <App />
    </Router>
  ).toMatchSnapshot()
})
