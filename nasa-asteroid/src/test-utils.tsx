import { ThemeProvider } from '@mui/material/styles'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import Navbar from 'app/components/Navbar'
import Routes from 'app/components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import theme from './app/config/theme'

const AllTheApp: React.FC = () => {
  return (
    <Suspense fallback="Loading ...">
      <Router>
        <Navbar />
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Router>
    </Suspense>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: AllTheApp, ...options })

export * from '@testing-library/react'
export { customRender as render }
