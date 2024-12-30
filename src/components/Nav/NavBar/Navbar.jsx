import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StyledNavBar from './StyledNavbar';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <StyledNavBar>
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      {location.pathname !== '/login' && (
        <NavLink to={auth.accessToken ? '/logout' : '/login'}>
          {auth.accessToken ? 'Log out' : 'Sign in'}
        </NavLink>
      )}
    </StyledNavBar>
  );
};

export default Navbar;
