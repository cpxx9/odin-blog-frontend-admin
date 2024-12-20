import MainLayout from '../layouts/MainLayout';
import Root from '../routes/Root/Root';
import NotFound from '../routes/NotFound';
import { createRoutesFromElements, Route } from 'react-router-dom';
import Login from './Login/Login';
import AuthGuard from '../utils/AuthCheck';

const routesConfig = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route index element={<AuthGuard Component={<Root />} />} />
    <Route path="login" element={<Login />} />
    <Route path="*" element={NotFound} />
  </Route>,
);

// const routesConfig = [
//   {
//     path: '/',
//     element: <MainLayout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         path: '/',
//         element: <Root />,
//       },
//       {
//         path: '*',
//         element: <NotFound />,
//       },
//     ],
//   },
// ];

export default routesConfig;
