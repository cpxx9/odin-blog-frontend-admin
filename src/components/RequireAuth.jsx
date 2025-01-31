import { useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import useLogout from '../hooks/useLogout';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const admin = decoded?.user.admin || false;

  if (auth?.accessToken && admin) {
    return <Outlet />;
  } else {
    signOut();
    return (
      <Navigate to="/login" state={{ from: location, failAuth: true, isAdmin: admin }} replace />
    );
  }
};

export default RequireAuth;
