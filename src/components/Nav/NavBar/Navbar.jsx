import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import StyledNavBar from './StyledNavbar';

const Navbar = () => {
  const location = useLocation();
  return (
    <StyledNavBar>
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      <NavLink to="/users">Users</NavLink>
      {location.pathname !== '/login' && <NavLink to="/logout">Log out</NavLink>}
    </StyledNavBar>
  );
};

export default Navbar;
