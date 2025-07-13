import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './views/login'
import Home from './views/home'
import AuthGuard from '../core/guards/authGuard';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Router;