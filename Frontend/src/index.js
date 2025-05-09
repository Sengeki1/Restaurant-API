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
import PaymentForm from './Components/Payment'

const router = createBrowserRouter([
  {path: "/", element: <LandingPage/>},
  {path: "/dashboard", element: <UserDashBoard/>},
  {path: "/login", element: <LoginPage/>},
  {path: "/register", element: <RegisterPage/>},
  {path: "/payment", element: <PaymentForm/>},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
