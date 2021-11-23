import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import CountrySearch from 'app/pages/CountrySearch'
import CountryList from 'app/pages/CountryList'
import Navbar from 'app/components/Navbar'
import { Routes } from 'app/utils/enums/routes'
import { ThemeProvider } from '@mui/material'
import appTheme from 'app/configs/theme'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <Navbar />
        <Switch>
          <Route exact path={Routes.Home} component={CountrySearch} />
          <Route exact path={Routes.CountriesByName} component={CountryList} />
          <Redirect to={Routes.Home} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}
export default App
