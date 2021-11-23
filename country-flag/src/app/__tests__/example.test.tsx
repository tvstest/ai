import App from 'app/App'
import { render } from '../../test-utils'
import '@testing-library/jest-dom'

test('App loads with router and mui theme configuration properly', () => {
  render(<App />)
})

// test('buttons are disabled when data is being fetched', async () => {
//     const { getByTestId } = render(<CountrySearch />)
//   const buttonElement = getByTestId('random-button')

//     fireEvent.click(buttonElement)

//     expect(buttonElement).toBeDisabled()
// })

// // it('renders correctly', () => {
// //     const tree = renderer
// //         .create(<div>Instagram</div>)
// //             .toJSON();
// //     expect(tree).toMatchSnapshot();
// // })
