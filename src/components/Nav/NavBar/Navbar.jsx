import { useNavigate, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StyledNavBar from './StyledNavbar';
import useLogout from '../../../hooks/useLogout';

const Navbar = () => {
  const linkClass = ({ isActive }) => (isActive ? 'active-link navlink' : 'navlink');
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  const location = useLocation();
  return (
    <StyledNavBar>
      <NavLink className={linkClass} to="/">
        <p>POSTS</p>
      </NavLink>
      <NavLink className={linkClass} to="/users">
        USERS
      </NavLink>
      {location.pathname !== '/login' && (
        <NavLink className={linkClass} to="/logout" onClick={signOut}>
          LOG OUT
        </NavLink>
      )}
    </StyledNavBar>
  );
};

export default Navbar;
