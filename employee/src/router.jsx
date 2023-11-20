import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Users from './components/Users';
import NotFound from './components/NotFound';
import GuestLayout from './components/GuestLayout';
import DefaultLayout from './components/DefaultLayout';
import Dashboard from './components/Dashboard';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: '/dashboard',
                element:<Dashboard/>
            }
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
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
        path: "*",
        element: <NotFound />,
    },
]);


export default Router;