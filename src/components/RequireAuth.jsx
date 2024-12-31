import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const admin = decoded?.user.admin || false;

  return auth?.accessToken && admin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location, failAuth: true, isAdmin: admin }} replace />
  );
};

export default RequireAuth;
