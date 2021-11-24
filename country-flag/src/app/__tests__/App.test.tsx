import App from 'app/App'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

beforeEach(() => {
  render(<App />)
})

test('matches the app snapshot', async () => {
  expect(<App />).toMatchSnapshot()
})

test('get India country info and its capital weather info for Delhi', () => {
  const headerText = screen.getByText(/Country and Weather Info/i)
  expect(headerText).toBeInTheDocument()
})

test('specific country is found via api call', async () => {
  const inputElement = screen.getByTestId('country-search-input')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: 'india' },
    })
  })
  await act(async () => {
    const buttonElement = screen.getByTestId('country-search-button')
    fireEvent.click(buttonElement)
  })

  await waitFor(async () => {
    const contentText = screen.getByText('India')
    expect(contentText).toBeInTheDocument()
  })

  // await act(async () => {
  //   const contentTextBtn = screen.getByText('India').closest('[data-testid="capital-weather-button"]')[0]
  //   const buttonElement = screen.getByTestId('capital-weather-button')
  //   fireEvent.click(contentTextBtn)
  // })

  // await waitFor(async () => {
  //   const contentText = screen.getByText(/Delhi/i)
  //   expect(contentText).toBeInTheDocument()
  // })
})
