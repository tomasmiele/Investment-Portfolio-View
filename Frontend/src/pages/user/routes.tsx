import { RouteObject } from "react-router";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { PasswordRecovery } from "./password-recovery/password-recovery";
import { Homepage } from "./homepage/homepage";

const routes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/password-recovery/:token",
        element: <PasswordRecovery />,
      },
    {
        path: "/homepage",
        element: <Homepage />,
    },
    ]

    export default routes