import { lazy } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import { AppRoutings } from 'app/utility/enums/app-routings'

const routes: Array<RouteProps> = [
  {
    component: lazy(() => import('app/pages/Home')),
    path: AppRoutings.Home,
    exact: true,
  },
]

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ component, exact, path }, routeIndex) => (
        <Route
          key={routeIndex}
          component={component}
          exact={exact}
          path={path}
        />
      ))}
    </Switch>
  )
}

export default Routes
