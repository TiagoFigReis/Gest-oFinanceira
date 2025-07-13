import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Login from './views/login'
import Home from './views/home'
import AuthGuard from '../core/guards/authGuard';
import SignUp from './views/signUp';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
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