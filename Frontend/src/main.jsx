import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Login from "./pages/Login";
import UserAuthStore from "../store/UserAuthStore";
import Dashboard from "./pages/Dashboard";
import WorkspaceServerStore from "../store/WorkspaceServerStore";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
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
    path: '/auth/signup',
    element: <Signup/>
  },
  {
    path: '/dashboard',
    element: <WorkspaceServerStore> <Dashboard /></WorkspaceServerStore>
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy/>
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions/>
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthStore>
      <RouterProvider router={router} />
    </UserAuthStore>
  </React.StrictMode>
);