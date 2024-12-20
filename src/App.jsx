import './styles/App.css';
import routesConfig from './routes/routesConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

const router = createBrowserRouter(routesConfig);

export const AdminContext = createContext({
  authToken: '',
  updateAuthToken: () => {},
});

function App() {
  const [authToken, setAuthToken] = useState('');

  const updateAuthToken = (newToken) => {
    setAuthToken(newToken);
  };

  return (
    <AdminContext.Provider value={{ authToken, updateAuthToken }}>
      <RouterProvider router={router} />
    </AdminContext.Provider>
  );
}

export default App;
