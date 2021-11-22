import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Montserrat',
    },
  })
)

export default theme
