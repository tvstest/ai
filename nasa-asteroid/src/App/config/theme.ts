import { createTheme, responsiveFontSizes } from '@material-ui/core'

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: 'Montserrat',
    },
  })
)

export default theme
