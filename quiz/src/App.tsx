import './App.css'
import { CircularProgress, ThemeProvider } from '@mui/material'
import { Suspense } from 'react'
import Routes from 'components/Routes'
import theme from 'configs/app-theme'

const App: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Suspense>
  )
}

export default App
