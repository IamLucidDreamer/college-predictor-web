import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import React, { lazy, Suspense } from 'react'
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/loader/index"
import Dashboard from "../views/layout/Dashboard";
import UserProfile from "../views/layout/UserProfile";
import Card from "../views/layout/Card";

const HomePage = lazy(() => import("../views/index"))
const SignUp = lazy(() => import("../views/auth/Signup"));
const Predictor = lazy(() => import("../views/predictor"))
const Login = lazy(() => import("../views/auth/Login"))
const VerifyOTP = lazy(() => import("../views/auth/VerifyOTP"))
const CompleteProfile = lazy(() => import("../views/auth/CompleteProfile"))

const DashboardHomePage = lazy(() => import("../views/dashboardPages/HomePage"))
const DashboardBlogs = lazy(() => import("../views/dashboardPages/Blogs"))
const DashboardProfile = lazy(() => import("../views/dashboardPages/Profile"))


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
        path: "/verify-otp",
        element: <VerifyOTP />,
    },
    {
        path: "/complete-profile",
        element: <CompleteProfile />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardHomePage />,
            },
            {
                path: "/dashboard/blogs",
                element: <DashboardBlogs />,
            },
            {
                path: "/dashboard/profile",
                element: <DashboardProfile />,
            },
        ],
    },
    {
        path: "/profile",
        element: <ProtectedRoute><DashboardProfile /></ProtectedRoute>,
    }
]);

const Routes = () => {
    return (
        <Suspense fallback={<Loader coverFullScreen={true} />}>
            <RouterProvider router={router} />
        </Suspense >
    )
}

export default Routes