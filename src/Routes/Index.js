import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import React, { lazy, Suspense } from 'react'
import SignUp from "../views/auth/Signup";
const Login = lazy(() => import("../views/auth/Login"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

const Routes = () => {
    return (
        <Suspense fallback={<div className="text-2xl flex mx-auto self-center flex-col">Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense >
    )
}

export default Routes