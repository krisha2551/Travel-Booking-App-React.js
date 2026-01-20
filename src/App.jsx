import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/Layout";
import Home from "./components/ui/Home";
import TripsData from "./components/pages/Trips";
import TripDetail from "./components/pages/TripDetail";
import Auth from "./auth/Auth";   

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "trips",
          element: <TripsData />,
        },
        {
          path: "trips/:id",
          element: <TripDetail />,
        },
        {
          path: "login",      
          element: <Auth />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
