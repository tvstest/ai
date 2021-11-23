import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import Navbar from 'app/components/Navbar'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Routes } from 'app/utils/enums/routes'
import appTheme from 'app/configs/theme'
import CountrySearch from 'app/pages/CountrySearch'
import CountryList from 'app/pages/CountryList'

const AppComponent: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path={Routes.Home} component={CountrySearch} />
          <Route exact path={Routes.CountriesByName} component={CountryList} />
          <Redirect to={Routes.Home} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => render(ui, { wrapper: AppComponent, ...options })

export * from '@testing-library/react'
export { customRender as render }
