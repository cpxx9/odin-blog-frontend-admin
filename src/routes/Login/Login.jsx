import axios from '../../api/axios';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import StyledLogin from './StyledLogin';
import useInput from '../../hooks/useInput';

const LOGIN_URL = '/login';

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const failAuth = location.state?.failAuth;

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttributes] = useInput('user', '');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ username: user, password: pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = res?.data?.token;
      setAuth({ user, accessToken });
      resetUser();
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
          {...userAttributes}
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
        <div className="persistCheck">
          <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
          <label htmlFor="persist">Remeber this device?</label>
        </div>
      </form>
    </StyledLogin>
  );
};

export default Login;
