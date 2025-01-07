import { useLocation } from 'react-router-dom';
import StyledUser from '../../components/Users/User/StyledUser';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { userInfo } = location.state;

  const handleAdminChange = async (e) => {
    console.log(e.target.checked);
    try {
      await axiosPrivate.put(`/users/${userInfo.id}`, JSON.stringify({ admin: e.target.checked }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAuthorChange = async (e) => {
    try {
      await axiosPrivate.put(
        `/users/${userInfo.id}`,
        JSON.stringify({ author: e.target.checked }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledUser>
      <h3>{userInfo.username}</h3>
      <label htmlFor="isAdmin">isAdmin: </label>
      <input
        type="checkbox"
        name="isAdmin"
        id="isAdmin"
        defaultChecked={userInfo.admin}
        onChange={handleAdminChange}
        value="isAuthor"
      />
      <label htmlFor="isAuthor">isAuthor: </label>
      <input
        type="checkbox"
        name="isAuthor"
        id="isAuthor"
        defaultChecked={userInfo.author}
        onChange={handleAuthorChange}
        value="isAuthor"
      />
    </StyledUser>
  );
};

export default User;
