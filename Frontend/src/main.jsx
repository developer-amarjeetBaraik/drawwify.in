import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import CanvasNavbarStore from "../store/CanvasNavbarStore";

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/workspace',
    element:<Workspace/>
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);