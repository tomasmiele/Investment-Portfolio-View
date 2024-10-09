import { createBrowserRouter, Navigate } from "react-router-dom";
import homepageRoutes from './pages/homepage/routes'

export const router = createBrowserRouter([
  ...homepageRoutes,
  {
    path: "/",
    element: <Navigate to="/homepage" />,
  },
]);