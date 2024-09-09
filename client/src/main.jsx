import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import {  HelmetProvider } from 'react-helmet-async';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
  <div className="">
    <AuthProvider>
      <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>
    </AuthProvider>
  </div>
  </HelmetProvider>
);
