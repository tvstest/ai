import App from 'app/App'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { countryService } from 'app/services/country-service'
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

test('specific country is found via api call', async () => {
  const countryServiceMock = jest.spyOn(countryService, 'getByName')
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

  expect(countryServiceMock).toHaveBeenLastCalledWith('india')

  await waitFor(
    async () => {
      const contentText = screen.getByText('India')
      expect(contentText).toBeInTheDocument()
    },
    { timeout: 5000 }
  )
})
