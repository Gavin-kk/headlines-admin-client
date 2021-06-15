import React, { FC, Suspense } from 'react';
import './assets/css/global.css';
import { BrowserRouter } from 'react-router-dom';
import Loading from '@components/loading';
import { renderRoutes } from 'react-router-config';
import routers from './router';

const App: FC = (): React.ReactElement => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>{renderRoutes(routers)}</Suspense>
  </BrowserRouter>
);

export default App;
