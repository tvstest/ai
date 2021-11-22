import './App.css'
import { CircularProgress, ThemeProvider } from '@mui/material'
import { Suspense } from 'react'
import Routes from 'components/Routes'
import theme from 'configs/app-theme'
import { BrowserRouter as Router } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
