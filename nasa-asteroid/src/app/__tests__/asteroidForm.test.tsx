import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import AsteroidForm from 'app/components/Asteroid/AsteroidForm'
import { act } from 'react-dom/test-utils'
import service from 'app/services/asteroid-services'
import '@testing-library/jest-dom'
import AsteroidContextWrapper from 'app/context/AsteroidContext'

beforeEach(() => {
  render(
    <AsteroidContextWrapper>
      <AsteroidForm />
    </AsteroidContextWrapper>
  )
})

test('Form validations are triggered properly', async () => {
  const inputElement = screen.getByTestId('asteroidId')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: '20019' },
    })
  })

  await act(async () => {
    fireEvent.click(screen.getByTestId('form-submit'))
  })

  await waitFor(async () => {
    expect(
      screen.getByText('please enter 7 digit asteroid id')
    ).toBeInTheDocument()
  })
})

test('Random asteroid get api is being called (1 time)', async () => {
  const mockFn = jest.spyOn(service, 'getRandomAsteroidId')

  await act(async () => {
    fireEvent.click(screen.getByTestId('random-button'))
  })

  await waitFor(async () => {
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

test('specific asteroid get api is called', async () => {
  const mockFn = jest.spyOn(service, 'getAsteroidById')
  const inputElement = screen.getByTestId('asteroidId')
  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: '2001980' },
    })
  })

  await act(async () => {
    fireEvent.click(screen.getByTestId('form-submit'))
  })

  await waitFor(async () => {
    expect(mockFn).toHaveBeenLastCalledWith('2001980')
  })
})

test('buttons are disabled when data is being fetched', async () => {
  const buttonElement = screen.getByTestId('random-button')
  fireEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()
})
