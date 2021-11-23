import App from 'app/App'
import { act, fireEvent, render } from 'test-utils'
import '@testing-library/jest-dom'
import CountrySearch from 'app/pages/CountrySearch'

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

// // it('renders correctly', () => {
// //     const tree = renderer
// //         .create(<div>Instagram</div>)
// //             .toJSON();
// //     expect(tree).toMatchSnapshot();
// // })
