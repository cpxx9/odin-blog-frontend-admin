import { useContext } from 'react';
import StyledLogin from './StyledLogin';
import { AdminContext } from '../../App';

const Login = () => {
  const { authToken, setAuthToken } = useContext(AdminContext);

  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData, e.target.username.value);
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <StyledLogin>
      {authToken ? (
        <h1>You are already logged in!</h1>
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
