import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import LandingPage from './Components/Landing';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import UserDashBoard from './Components/Dashboard/public'
import DashboardAdminPage from './Components/Dashboard/admin'
import { 
  PrivateRoute,
  PrivateRouteAdmin
} from './Components/PrivateRoute';
import PaymentForm from './Components/Payment'

const router = createBrowserRouter([
  {path: "/", element: <LandingPage/>},
  {path: "/dashboard", element: <PrivateRoute><UserDashBoard/></PrivateRoute>},
  {path: "/dashboard-admin", element: <PrivateRouteAdmin><DashboardAdminPage/></PrivateRouteAdmin>},
  {path: "/login", element: <LoginPage/>},
  {path: "/register", element: <RegisterPage/>},
  {path: "/payment", element: <PrivateRoute><PaymentForm/></PrivateRoute>},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
