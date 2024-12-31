import { useNavigate, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StyledNavBar from './StyledNavbar';
import useLogout from '../../../hooks/useLogout';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const location = useLocation();
  return (
    <StyledNavBar>
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      <NavLink to="/users">Users</NavLink>
      {location.pathname !== '/login' && (
        <NavLink to="/logout" onClick={signOut}>
          Log out
        </NavLink>
      )}
    </StyledNavBar>
  );
};

export default Navbar;
