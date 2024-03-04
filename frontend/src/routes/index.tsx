import { createBrowserRouter } from 'react-router-dom';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import SellerLayout from '../layouts/SellerLayout';

// Common pages
import ErrorPage from '../pages/errors/Error';

// Auth pages
import LoginPage from '../pages/login/Login';
import RegisterPage from '../pages/register/Register';
import EnterEmailPage from '../pages/enter-email/EnterEmail';
import SendPasswordPage from '../pages/send-password/SendPassword';

// Buyer pages
import HomePage from '../pages/home/Home';
import ProductDetailPage from '../pages/products/ProductDetail';
import FavouriteProductPage from '../pages/favourite/FavouriteProduct';
import CartPage from '../pages/cart/Cart';
// -- Gifts
import ChooseBoxPage from '../pages/gift/Gift';

// Seller pages
import ViewProduct from '../pages/Seller/ManageProducts/ViewProduct';
import DetailProduct from '../pages/Seller/ManageProducts/DetailProduct';
import CreateProducts from '../pages/Seller/ManageProducts/CreateProducts';
import Dashboard from '../pages/Seller/Dashboard/Dashboard';
import SellerRegistrationPage from '../pages/Seller/registration/SellerRegistration';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'favourite/:userId', element: <FavouriteProductPage /> },
      { path: 'seller_registration', element: <SellerRegistrationPage /> },
    ],
  },
  {
    path: '/gift',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <ChooseBoxPage /> }],
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
  {
    path: '/seller',
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'manageproducts', element: <ViewProduct /> },
      { path: 'manageproducts/createproduct', element: <CreateProducts /> },
      { path: 'manageproducts/detail', element: <DetailProduct /> },
    ],
  },
]);
export default router;
