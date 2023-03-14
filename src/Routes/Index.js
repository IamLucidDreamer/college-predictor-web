import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import React, { lazy, Suspense } from 'react'
import ProtectedRoute from "./ProtectedRoute";

const HomePage = lazy(() => import("../views/index"))
const SignUp = lazy(() => import("../views/auth/Signup"));
const Predictor = lazy(() => import("../views/predictor"))
const Login = lazy(() => import("../views/auth/Login"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/predictor",
        element: <ProtectedRoute > <Predictor /></ProtectedRoute>,
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