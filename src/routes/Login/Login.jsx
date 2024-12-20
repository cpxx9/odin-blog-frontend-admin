import { useContext } from 'react';
import StyledLogin from './StyledLogin';
import { AdminContext } from '../../App';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { authToken, updateAuthToken } = useContext(AdminContext);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/login', {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    const data = await res.json();
    updateAuthToken(data.token);
  };
  return (
    <StyledLogin>
      {authToken ? (
        <Navigate to="/" />
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={login}>
            <label htmlFor="username">
              <input type="text" name="username" id="username" />
            </label>
            <label htmlFor="password">
              <input type="password" name="password" id="password" />
            </label>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </StyledLogin>
  );
};

export default Login;
