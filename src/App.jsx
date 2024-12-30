import './styles/App.css';
import routesConfig from './routes/routesConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routesConfig);

function App() {
  return (
    <main className="App">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
