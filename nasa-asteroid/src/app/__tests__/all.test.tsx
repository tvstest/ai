import { render, fireEvent } from 'test-utils'
import '@testing-library/jest-dom'
import App from 'App'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import { act } from 'react-dom/test-utils'

test('App loads with router and mui theme configuration properly', () => {
  render(<App />)
})

test('rendering and submitting a form', async () => {
  const handleSubmit = jest.fn(() => {
    // eslint-disable-next-line no-console
    console.log('oh')
  })
  const { getByTestId, getByRole } = render(
    <AsteroidForm handler={handleSubmit} />
  )
  const inputElement = getByTestId('asteroidId')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: '2001980' },
    })
  })

  await act(async () => {
    fireEvent.submit(getByRole('button'), { name: 'submit' })
  })

  // not working :(
  expect(handleSubmit).toHaveBeenCalled()
})
