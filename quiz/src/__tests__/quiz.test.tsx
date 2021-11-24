import { fireEvent, render, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { AppRoutings } from 'utilities/enum/app-routings'
import { Language } from 'utilities/enum/language'
import '@testing-library/jest-dom'
import CircularProgress from '@mui/material/CircularProgress'
import theme from 'configs/app-theme'
import Routes from 'components/Routes'
import { Suspense } from 'react'
import { Router } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import FillInTheBlank from 'components/QuestionType/FillInTheBlanks'
import { act } from 'react-dom/test-utils'

test("On selecting answer it's relevant handler is called", async () => {
  const mockFn = jest.fn()
  const { getByTestId } = render(
    <FillInTheBlank userAnswer="Danial" handleAnswer={mockFn} />
  )

  const inputElement = getByTestId('fillInput')

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: 'east' },
    })
  })

  await waitFor(async () => {
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

test('Input component matches the snapshot', () => {
  const mockFn = jest.fn()
  const element = render(
    <FillInTheBlank userAnswer="Danial" handleAnswer={mockFn} />
  )
  expect(element).toMatchSnapshot()
})

test('After submitting form user is navigated to quiz page', async () => {
  const history = createMemoryHistory()
  history.push({
    pathname: AppRoutings.Quiz,
    state: { language: Language.English, name: 'Danial' },
  })
  const { getByText } = render(
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Suspense>
  )
  await waitFor(async () => expect(getByText(/Hi Danial/i)).toBeInTheDocument())
})
