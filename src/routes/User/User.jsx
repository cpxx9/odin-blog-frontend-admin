import { useLocation } from 'react-router-dom';
import StyledUser from '../../components/Users/User/StyledUser';

const User = () => {
  const location = useLocation();
  const { userInfo } = location.state;

  return (
    <StyledUser>
      <h3>{userInfo.username}</h3>
      <label htmlFor="isAdmin">isAdmin: </label>
      <input
        type="checkbox"
        name="isAdmin"
        id="isAdmin"
        defaultChecked={userInfo.admin}
        value={userInfo.admin}
      />
      <label htmlFor="isAuthor">isAuthor: </label>
      <input
        type="checkbox"
        name="isAuthor"
        id="isAuthor"
        defaultChecked={userInfo.author}
        value={userInfo.author}
      />
    </StyledUser>
  );
};

export default User;
