/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { Fragment, lazy, Suspense } from 'react';
import AuthLayout from 'layouts/Auth';
import ApplicationLayout from 'layouts/Application';
import { RouteConfig } from 'react-router-config';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoadingScreen } from 'components';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';

const routesConfig: RouteConfig[] = [
  {
    path: '/errors/error-404',
    exact: true,
    component: lazy(() => import('views/errors/error.page')),
  },
  {
    path: '/auth',
    layout: AuthLayout,
    guard: GuestGuard,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/auth/Login.page')),
      },
      {
        path: '*',
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: '/',
    layout: ApplicationLayout,
    guard: AuthGuard,
    routes: [
      {
        path: '/app/error-404',
        exact: true,
        component: lazy(() => import('views/errors/error.page')),
      },
      {
        path: '/',
        exact: true,
        component: lazy(() => import('views/medicaments/Medicine.page')),
      },
      {
        path: '/categories',
        exact: true,
        component: lazy(() => import('views/categories/Categories.page')),
      },

      {
        path: '*',
        component: () => <Redirect to="/app/error-404" />,
      },
    ],
  },
  {
    path: '*',
    component: () => <Redirect to="/app/error-404" />,
  },
];

const renderRoutes = (routes: RouteConfig[]) =>
  routes ? (
    <Suspense fallback={<LoadingScreen isDashboard />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component: any = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
