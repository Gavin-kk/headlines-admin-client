import React, { lazy, ReactElement } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';

const Login = lazy(() => import('@pages/login'));
const Layout = lazy(() => import('@pages/layout'));
const Home = lazy(() => import('@pages/home'));

export const routers: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render():ReactElement {
      return (<Redirect to="/login" />);
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        render():ReactElement {
          return (<Redirect to="/home" />);
        },
      },
      {
        path: '/home',
        component: Home,
      },
    ],
  },
];

export default routers;
