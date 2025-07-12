import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './views/login'
import Home from './views/home'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;