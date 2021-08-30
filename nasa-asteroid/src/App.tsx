import { ThemeProvider } from '@material-ui/core'
import Navbar from 'app/components/Navbar'
import Routes from 'app/components/Routes'
import { Suspense } from 'react'
import theme from './app/config/theme'

const App: React.FC = () => {
  return (
    <Suspense fallback="Loading ...">
      <Navbar />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Suspense>
  )
}

export default App
