import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom"
import App from "../Layout/App";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetails from "../../Features/activities/details/ActivityDetails";
import TestErrors from "../../Features/errors/TestError";
import NotFound from "../../Features/errors/NotFound";
import ServerError from "../../Features/errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'activities', element: <ActivityDashboard/>},
            {path: 'activities/:id', element: <ActivityDetails/>},
            {path: 'createActivity', element: <ActivityForm key={'create'}/>},
            {path: 'manage/:id', element: <ActivityForm key={'manage'}/>},
            {path: 'errors', element: <TestErrors/>},
            {path: 'not-found', element: <NotFound/>},
            {path: '*', element: <Navigate replace to='/not-found' />},
            {path: 'server-error', element: <ServerError />},
           
        ]
    }
]
export const router = createBrowserRouter(routes);
