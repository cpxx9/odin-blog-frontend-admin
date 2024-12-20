import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminContext } from '../App';

const AuthCheck = () => {
  const { authToken } = useContext(AdminContext);

  // If has token, return outlet in other case return navigate to login page

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthCheck;
