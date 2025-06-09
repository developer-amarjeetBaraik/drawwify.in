import React from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Login from "./pages/Login";
import UserAuthStore from "../store/UserAuthStore";
import Dashboard from "./pages/Dashboard";
import WorkspaceServerStore from "../store/WorkspaceServerStore";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: `/workspace/:slug`,
    element: <WorkspaceServerStore><Workspace /></WorkspaceServerStore>
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <WorkspaceServerStore> <Dashboard /></WorkspaceServerStore>
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
      <UserAuthStore>
        <RouterProvider router={router} />
      </UserAuthStore>
    </Auth0Provider>
  </React.StrictMode>
);