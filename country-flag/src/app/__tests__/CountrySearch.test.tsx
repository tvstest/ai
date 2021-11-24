import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react'
import CountrySearch from 'app/pages/CountrySearch'
import { countryService } from 'app/services/country-service'
import appTheme from 'app/configs/theme'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from 'app/App'

beforeEach(() => {
  render(
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <CountrySearch />
      </ThemeProvider>
    </BrowserRouter>
  )
})

test('submit button is disabled initially', async () => {
  const buttonElement = screen.getByTestId('country-search-button')
  expect(buttonElement).toBeDisabled()
})

test('when some input is given submit button is not disabled', async () => {
  const inputElement = screen.getByTestId('country-search-input')
  fireEvent.change(inputElement, { target: { value: 'india' } })

  const buttonElement = screen.getByTestId('country-search-button')

  expect(buttonElement).not.toBeDisabled()
})

test('specific country get api is called due to routing', async () => {
  cleanup()
  const countryServiceMock = jest.spyOn(countryService, 'getByName')
  const { getByTestId } = render(<App />)
  const inputElement = getByTestId('country-search-input')
  fireEvent.change(inputElement, { target: { value: 'india' } })

  const buttonElement = getByTestId('country-search-button')
  await act(async () => {
    fireEvent.click(buttonElement)
  })

  await waitFor(async () => {
    expect(countryServiceMock).toHaveBeenLastCalledWith('india')
  })
})
