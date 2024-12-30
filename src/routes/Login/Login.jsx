import axios from '../../api/axios';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StyledLogin from './StyledLogin';

const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const failAuth = location.state?.failAuth;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ username: user, password: pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = res?.data?.token;
      const userInfo = res?.data?.user;
      setAuth({ user, userInfo, accessToken });
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      const errDat = err.code === 'ERR_NETWORK' ? 'Server error' : err.response.data.msg;
      setErrMsg(errDat);
    }
  };

  return (
    <StyledLogin>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Login</h1>
      {failAuth && <p>You must sign in as an admin!</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
      </form>
    </StyledLogin>
  );
};

export default Login;
