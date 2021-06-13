import React, { lazy, ReactElement } from 'react';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';

const Login = lazy(() => import('@pages/login'));
const Layout = lazy(() => import('@pages/layout'));
const Home = lazy(() => import('@pages/home'));
const Article = lazy(() => import('@pages/article'));
const Material = lazy(() => import('@pages/material'));
const Publish = lazy(() => import('@pages/publish'));
const Discuss = lazy(() => import('@pages/discuss'));
const Fans = lazy(() => import('@pages/fans'));
const Personal = lazy(() => import('@pages/personal'));

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
      {
        path: '/article',
        component: Article,
      },
      {
        path: '/material',
        component: Material,
      },
      {
        path: '/publish',
        component: Publish,
      },
      {
        path: '/discuss',
        component: Discuss,
      },
      {
        path: '/fans',
        component: Fans,
      },
      {
        path: '/personal',
        component: Personal,
      },
    ],
  },
];

export default routers;
