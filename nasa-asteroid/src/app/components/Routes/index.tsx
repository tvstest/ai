import { lazy } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import { AppRoutings } from 'app/utility/enums/app-routings'

const routes: Array<RouteProps & { id: string | number }> = [
  {
    id: 1,
    component: lazy(() => import('app/pages/Home')),
    path: AppRoutings.Home,
    exact: true,
  },
]

const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map(({ component, exact, path, id }) => (
        <Route key={id} component={component} exact={exact} path={path} />
      ))}
    </Switch>
  )
}

export default Routes
