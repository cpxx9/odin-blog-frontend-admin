import { Outlet } from 'react-router-dom';
import Navbar from '../components/Nav/NavBar/Navbar';
import useAuth from '../hooks/useAuth';

const MainLayout = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth?.accessToken && <Navbar />}
      <Outlet />
    </>
  );
};

export default MainLayout;
