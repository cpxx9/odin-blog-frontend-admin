import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: res.data.token,
        userInfo: {
          id: res.data.user.id,
          username: res.data.user.username,
          email: res.data.user.email,
          firstname: res.data.user.firstname,
          lastname: res.data.user.lastname,
          admin: res.data.user.admin,
          author: res.data.user.author,
          created: res.data.user.created,
          updated: res.data.user.updated,
        },
      };
    });
    return res.data.token;
  };
  return refresh;
};

export default useRefreshToken;
