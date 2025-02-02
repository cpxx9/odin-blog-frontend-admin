import { jwtDecode } from 'jwt-decode';
import { useNavigate, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StyledNavBar from './StyledNavbar';
import useLogout from '../../../hooks/useLogout';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { auth } = useAuth();
  const linkClass = ({ isActive }) => (isActive ? 'active-link navlink' : 'navlink');
  const navigate = useNavigate();
  const logout = useLogout();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

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
      {decoded?.user?.admin && (
        <NavLink className={linkClass} to="/users">
          USERS
        </NavLink>
      )}
      {location.pathname !== '/login' && (
        <NavLink className={linkClass} to="/logout" onClick={signOut}>
          LOG OUT
        </NavLink>
      )}
    </StyledNavBar>
  );
};

export default Navbar;
