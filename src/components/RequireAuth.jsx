import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth?.accessToken && auth?.userInfo?.admin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location, failAuth: true }} replace />
  );
};

export default RequireAuth;
