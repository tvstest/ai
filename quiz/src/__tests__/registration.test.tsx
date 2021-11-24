import { fireEvent, render, screen } from '@testing-library/react'
import Registration from 'pages/Registration'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'

beforeEach(() => {
  render(<Registration />)
})

test('registration form is submitted successfully', async () => {
  const inputElement = screen.getByTestId('nameField')
  const buttonElement = screen.getByTestId('submitForm')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: 'Danial' },
    })
  })

  expect(buttonElement).toBeEnabled()
})
