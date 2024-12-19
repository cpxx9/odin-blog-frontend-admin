import MainLayout from '../layouts/MainLayout';
import Root from '../routes/Root/Root';
import NotFound from '../routes/NotFound';

const routesConfig = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Root />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routesConfig;
