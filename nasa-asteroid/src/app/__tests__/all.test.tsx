import { render, fireEvent, waitFor } from 'test-utils'
import '@testing-library/jest-dom'
import App from 'App'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import { act } from 'react-dom/test-utils'

test('App loads with router and mui theme configuration properly', () => {
  render(<App />)
})

test('Form validations are triggered properly', async () => {
  const { getByTestId, getByText } = render(<AsteroidForm />)
  const inputElement = getByTestId('asteroidId')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: '20019' },
    })
  })

  await act(async () => {
    fireEvent.click(getByTestId('form-submit'))
  })

  await waitFor(async () => {
    expect(getByText('please enter 7 digit asteroid id')).toBeInTheDocument()
  })
})
