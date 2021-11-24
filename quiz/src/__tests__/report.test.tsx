import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { AppRoutings } from 'utilities/enum/app-routings'
import '@testing-library/jest-dom'
import CircularProgress from '@mui/material/CircularProgress'
import theme from 'configs/app-theme'
import Routes from 'components/Routes'
import { Suspense } from 'react'
import { Router } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import { state } from '__mock__'

beforeEach(() => {
  const history = createMemoryHistory()
  history.push({
    pathname: AppRoutings.Report,
    state,
  })
  render(
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Suspense>
  )
})

test('Assuming quiz submitted report card show results', async () => {
  await waitFor(async () => {
    const labels = screen.getAllByTestId('grid-item')
    expect(labels.length).toBe(state.questionAnswers.length)
  })
})
