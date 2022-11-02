import React from "react";
import AuthPage from "../pages/Auth";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/Home";

const routes: Array<{ path: string, element: React.FC }> = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/auth',
    element: AuthPage,
  },
  {
    path: '*',
    element: ErrorPage,
  }
];

export default routes;
