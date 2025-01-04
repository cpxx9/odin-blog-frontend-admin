import MainLayout from '../layouts/MainLayout';
import Root from '../routes/Root/Root';
import NotFound from '../routes/NotFound';
import { createRoutesFromElements, Route } from 'react-router-dom';
import Login from './Login/Login';
import RequireAuth from '../components/RequireAuth';
import Users from './Users/Users';
import PersistLogin from '../components/PersistLogin';
import Post from './Post/Post';

const routesConfig = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route path="login" element={<Login />} />
    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Root />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
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
