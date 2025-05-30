import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/workspace',
    element: <Workspace />
  }, {
    path: '/auth/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-u8wjfrj8lxtaapcu.us.auth0.com"
      clientId="5pdnZvV95hKlwhiHGDa6ShHZ1HsTaWKw"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);