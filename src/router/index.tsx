import React, { lazy, ReactElement } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';

const Login = lazy(() => import('@pages/login'));

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
];

export default routers;
