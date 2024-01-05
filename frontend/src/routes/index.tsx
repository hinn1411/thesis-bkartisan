import { createBrowserRouter } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import ErrorPage from '../pages/errors/Error';
import HomePage from '../pages/home/Home';
import ProductDetailPage from '../pages/products/ProductDetail';
import FavouriteProductPage from '../pages/favourite/FavouriteProduct';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/login/Login';
import RegisterPage from '../pages/register/Register';
import EnterEmailPage from '../pages/enter-email/EnterEmail';
import SendPasswordPage from '../pages/send-password/SendPassword';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'favourite/:userId', element: <FavouriteProductPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/enter-email',
    element: <EnterEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/send-password',
    element: <SendPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
]);
export default router;
