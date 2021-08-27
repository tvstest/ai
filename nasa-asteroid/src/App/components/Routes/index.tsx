import { lazy } from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import { AppRoutings } from "App/utility/enums/app-routings";

const routes: Array<RouteProps> = [
  {
    component: lazy(() => import("../../pages")),
    path: AppRoutings.Home,
    exact: true,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routes.map((route, routeIndex) => (
        <Route key={routeIndex} {...route} />
      ))}
    </Switch>
  );
};

export default Routes;
