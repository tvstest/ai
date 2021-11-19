/* eslint-disable react/no-array-index-key */
import Layout from 'components/Layout'
import { lazy } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { AppRoutings } from 'utilities/enum/app-routings'

interface IRoute {
  path: string
  component:
    | React.LazyExoticComponent<React.FC<{}>>
    // | React.ComponentType<RouteComponentProps<{}>>
    | React.ComponentType<{}>
  isProtectedRoute: boolean
}

const routes: IRoute[] = [
  {
    path: AppRoutings.Registration,
    component: lazy(() => import('pages/Registration')),
    isProtectedRoute: false,
  },
  {
    path: AppRoutings.Quiz,
    component: lazy(() => import('pages/Quiz')),
    isProtectedRoute: false,
  },
]

const Routes: React.FC = () => {
  return (
    <Switch>
      <Layout>
        {routes
          .filter((route) => !route.isProtectedRoute)
          .map(({ path, component }, key) => (
            <Route exact path={path} component={component} key={key} />
          ))}
      </Layout>

      <Redirect
        to={{
          pathname: AppRoutings.Registration,
        }}
      />
    </Switch>
  )
}

export default Routes