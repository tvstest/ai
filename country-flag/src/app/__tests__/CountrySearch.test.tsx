import { act, fireEvent, render, waitFor } from 'test-utils'
import CountrySearch from 'app/pages/CountrySearch'
import { countryService } from 'app/services/country-service'

test('submit button is disabled initially', async () => {
  const { getByTestId } = render(<CountrySearch />)
  const buttonElement = getByTestId('country-search-button')
  expect(buttonElement).toBeDisabled()
})

test('when some input is given submit button is not disabled', async () => {
  const { getByTestId } = render(<CountrySearch />)
  const inputElement = getByTestId('country-search-input')
  fireEvent.change(inputElement, { target: { value: 'india' } })

  const buttonElement = getByTestId('country-search-button')

  expect(buttonElement).not.toBeDisabled()
})

test('specific country get api is called', async () => {
  const countryServiceMock = jest.spyOn(countryService, 'getByName')
  const { getByTestId } = render(<CountrySearch />)
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
