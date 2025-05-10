import { Navigate, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return { access: false, role: null };

  try {
    const decoded = jwtDecode(token);
    return { access: true, role: decoded.role };
  } catch (err) {
    console.error("Invalid token", err);
    return { access: false, role: null };
  }
};

export const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth.access ? children : <Navigate to="/login" />;
};

export const PrivateRouteAdmin = ({ children }) => {
  const auth = isAuthenticated();
  return (auth.access && auth.role === "admin") ? children : <Navigate to="/login" />;
};

export const logOut = () => {
  const auth = isAuthenticated();
  return auth.access ? 
  <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
    Logout
  </Link> :
  <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
    Login
  </Link>;
};
