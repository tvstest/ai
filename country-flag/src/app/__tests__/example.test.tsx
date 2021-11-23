import App from 'app/App'
import { act, fireEvent, render, waitFor, screen } from 'test-utils'
import '@testing-library/jest-dom'
import CountrySearch from 'app/pages/CountrySearch'
import { countryService } from 'app/services/country-service'

test('App loads with router and mui theme configuration properly', () => {
  render(<App />)
})

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

test('specific country is not found', async () => {
  // const countryServiceMock = jest.spyOn(countryService, 'getByName')
  const { getByTestId } = render(<App />)
  const inputElement = getByTestId('country-search-input')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: 'india' },
    })
  })

  await act(async () => {
    const buttonElement = getByTestId('country-search-button')
    fireEvent.click(buttonElement)
  })

  await waitFor(async () => {
    const headerText = screen.getByText(/No countries found!/i)
    expect(headerText).toBeInTheDocument()
    // expect(countryServiceMock).toHaveBeenLastCalledWith('india')
  })
})
// // it('renders correctly', () => {
// //     const tree = renderer
// //         .create(<div>Instagram</div>)
// //             .toJSON();
// //     expect(tree).toMatchSnapshot();
// // })
