import React, { lazy, ReactElement } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';

/* const Login = lazy(() => import('@pages/login'));
const Layout = lazy(() => import('@pages/layout'));
const Home = lazy(() => import('@pages/home'));
const Article = lazy(() => import('@pages/article'));
const Material = lazy(() => import('@pages/material'));
const Publish = lazy(() => import('@pages/publish'));
const Discuss = lazy(() => import('@pages/discuss'));
const Fans = lazy(() => import('@pages/fans'));
const Personal = lazy(() => import('@pages/personal')); */

export const routers: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render(): ReactElement {
      return <Redirect to="/login" />;
    },
  },
  {
    path: '/login',
    component: lazy(() => import('@pages/login')),
  },
  {
    path: '/',
    component: lazy(() => import('@pages/layout')),
    routes: [
      {
        path: '/',
        exact: true,
        render(): ReactElement {
          return <Redirect to="/home" />;
        },
      },
      {
        path: '/home',
        component: lazy(() => import('@pages/home')),
      },
      {
        path: '/article',
        component: lazy(() => import('@pages/article')),
      },
      {
        path: '/material',
        component: lazy(() => import('@pages/material')),
      },
      {
        path: '/publish',
        component: lazy(() => import('@pages/publish')),
      },
      {
        path: '/discuss',
        component: lazy(() => import('@pages/discuss')),
      },
      {
        path: '/fans',
        component: lazy(() => import('@pages/fans')),
      },
      {
        path: '/personal',
        component: lazy(() => import('@pages/personal')),
      },
    ],
  },
];

export default routers;
