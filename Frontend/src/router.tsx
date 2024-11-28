import { createBrowserRouter, Navigate } from "react-router-dom";
import homepageRoutes from './pages/user/routes'

export const router = createBrowserRouter([
  ...homepageRoutes,
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);