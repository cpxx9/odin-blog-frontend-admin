import { useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else if (!auth?.accessToken) {
      setIsLoading(false);
      signOut();
    } else {
      setIsLoading(false);
    }

    return () => (isMounted = false);
  }, []);

  useEffect(() => {}, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
