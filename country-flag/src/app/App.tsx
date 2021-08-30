import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CountrySearchForm from "app/components/Country/CountrySearchForm";
import CountryList from "app/components/Country/CountryList";
import Navbar from "app/components/Navbar";
import { Routes } from "app/utils/enums/routes";
import { ThemeProvider } from "@material-ui/core";
import appTheme from "app/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path={Routes.Home} component={CountrySearchForm} />
          <Route exact path={Routes.CountriesByName} component={CountryList} />
          <Redirect to={Routes.Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
export default App;
