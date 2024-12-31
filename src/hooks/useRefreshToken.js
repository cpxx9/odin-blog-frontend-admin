import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(res.data.token);
      return {
        ...prev,
        accessToken: res.data.token,
        userInfo: {
          admin: res.data.user.admin,
          author: res.data.user.author,
        },
      };
    });
    return res.data.token;
  };
  return refresh;
};

export default useRefreshToken;
