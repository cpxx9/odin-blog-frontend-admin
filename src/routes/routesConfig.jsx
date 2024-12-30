import MainLayout from '../layouts/MainLayout';
import Root from '../routes/Root/Root';
import NotFound from '../routes/NotFound';
import { createRoutesFromElements, Route } from 'react-router-dom';
import Login from './Login/Login';
import RequireAuth from '../components/RequireAuth';
import Users from './Users/Users';

const routesConfig = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route path="login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route index element={<Root />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Route>
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
