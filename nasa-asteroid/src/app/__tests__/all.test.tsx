import { render, fireEvent, waitFor } from 'test-utils'
import '@testing-library/jest-dom'
import App from 'App'
import Home from 'app/pages/Home'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import { act } from 'react-dom/test-utils'
import service from 'app/services/asteroid-services'

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

test('Random asteroid get api is being called (1 time)', async () => {
  const { getByTestId } = render(<AsteroidForm />)
  const mockFn = jest.spyOn(service, 'getRandomAsteroidId')

  await act(async () => {
    fireEvent.click(getByTestId('random-button'))
  })

  await waitFor(async () => {
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

test('specific asteroid get api is called', async () => {
  const mockFn = jest.spyOn(service, 'getAsteroidById')
  const { getByTestId } = render(<Home />)
  const inputElement = getByTestId('asteroidId')
  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: '2001980' },
    })
  })

  await act(async () => {
    fireEvent.click(getByTestId('form-submit'))
  })

  await waitFor(async () => {
    expect(mockFn).toHaveBeenLastCalledWith('2001980')
  })
})

test('matches the form snapshot', async () => {
  const formContainer = render(<AsteroidForm />)
  expect(formContainer).toMatchSnapshot()
})
