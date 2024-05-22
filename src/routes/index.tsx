import { createBrowserRouter } from "react-router-dom";

// Layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import AuthLayout from "src/layouts/AuthLayout";

// Common pages
import ErrorPage from "../components/common/errors/Error";

// Auth pages
import LoginPage from "../pages/Buyer/login/Login";
import RegisterPage from "../pages/Buyer/register/Register";
import EnterEmailPage from "../pages/Buyer/enter-email/EnterEmail";
import SendPasswordPage from "../pages/Buyer/send-password/SendPassword";

// Buyer pages
import HomePage from "../pages/Buyer/home/Home";
import SearchPage from "../pages/Buyer/search/Search";
import ProductDetailPage from "../pages/Buyer/products/ProductDetail";
import FavouriteProductPage from "../pages/Buyer/favourite/FavouriteProduct";
import CartPage from "../pages/Buyer/cart/Cart";
// Payments
import CheckoutPage from "src/pages/Buyer/checkout/Checkout";
import CheckoutFailPage from "src/pages/Buyer/checkout/CheckoutFail";
import CheckoutSuccessPage from "src/pages/Buyer/checkout/CheckoutSuccess";
import CategoryPage from "../pages/Buyer/Category/Category";
// -- Gifts
import ChooseBoxPage from "../pages/Buyer/gift/Gift";

// Seller pages
import ViewProduct from "../pages/Seller/ManageProducts/ViewProduct";
import DetailProduct from "../pages/Seller/ManageProducts/DetailProduct";
import CreateProducts from "../pages/Seller/ManageProducts/CreateProducts";
import Dashboard from "../pages/Seller/Dashboard/Dashboard";
import ViewOrders from "../pages/Seller/ManageOrders/ViewOrders";
import DetailOrders from "../pages/Seller/ManageOrders/DetailOrder";
import ViewDiscounts from "../pages/Seller/ManageDiscounts/ViewDiscounts";
import ChangeDiscount from "../pages/Seller/ManageDiscounts/ChangeDiscount";
import CreateDiscount from "../pages/Seller/ManageDiscounts/CreateDiscount";
import ViewGift from "../pages/Seller/ManageGift/ViewGift";
import ChangeGift from "../pages/Seller/ManageGift/ChangeGift";
import CreateGift from "../pages/Seller/ManageGift/CreateGift";
import SellerMessagePage from "src/pages/Seller/Message/SellerMessagePage";
import ViewReport from "../pages/Seller/Report/ViewReport";
import ViewTransport from "../pages/Seller/ManageTransport/ViewTransport";
import SellerRegistrationPage from "../pages/Seller/registration/SellerRegistration";

// Admin pages
import DashboardAdmin from "../pages/Admin/Dashboard/DashboardAdmin";
import UserManagement from "../pages/Admin/User/UserManagement";
import CollabManagement from "../pages/Admin/Collab/CollabManagement";
import ProductManagement from "../pages/Admin/Product/ProductManament";
import ReportManagement from "../pages/Admin/Report/ReportManagement";
import ReviewProduct from "../pages/Admin/ReviewProduct/ReviewProduct";
import OrderManagement from "../pages/Admin/Order/OrderManagement";
import UserDetail from "../pages/Admin/User/UserDetail";
import CollabDetail from "../pages/Admin/Collab/CollabDetail";
import HandledReports from "../pages/Admin/Collab/HandledReports";
import HandledProducts from "../pages/Admin/Collab/HandledProducts";
import AddCollab from "../pages/Admin/Collab/AddCollab";
import ReportDetail from "../pages/Admin/Report/ReportDetail";
import OrderDetail from "../pages/Admin/Order/OrderDetail";
import ChangeInfo from "../pages/Admin/Collab/ChangeInfo";

// Trang tin nhắn
import ViewMessage from "src/pages/Message/ViewMessage";
import PaymentLayout from "src/layouts/PaymentLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "favorite", element: <FavouriteProductPage /> },
      { path: "seller_registration", element: <SellerRegistrationPage /> },
      { path: "category", element: <CategoryPage /> },
      {
        path: "message",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <ViewMessage />,
          },
        ],
      },
    ],
  },
  { path: "/error", element: <ErrorPage /> },
  {
    path: "/checkout",
    element: <PaymentLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CheckoutPage />,
      },
      { path: "success", element: <CheckoutSuccessPage /> },
      { path: "fail", element: <CheckoutFailPage /> },
    ],
  },
  {
    path: "/gift",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <ChooseBoxPage /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/enter_email",
    element: <EnterEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/send_password",
    element: <SendPasswordPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <UserManagement /> },
      { path: "dashboard", element: <DashboardAdmin /> },
      { path: "users", element: <UserManagement /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "collabs", element: <CollabManagement /> },
      { path: "collabs/:id", element: <CollabDetail /> },
      { path: "collabs/:id/reports", element: <HandledReports /> },
      { path: "collabs/:id/products", element: <HandledProducts /> },
      { path: "collabs/:id/change", element: <ChangeInfo /> },
      { path: "collabs/create", element: <AddCollab /> },
      { path: "reports", element: <ReportManagement /> },
      { path: "reports/:id", element: <ReportDetail /> },
      { path: "products", element: <ProductManagement /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "reviewproducts", element: <ReviewProduct /> },
      { path: "reviewproducts/:productId", element: <ProductDetailPage /> },
      { path: "orders", element: <OrderManagement /> },
      { path: "orders/:id", element: <OrderDetail /> },
      { path: "message", element: <ViewMessage /> },
    ],
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "manage_products", element: <ViewProduct /> },
      { path: "manage_products/create_product/", element: <CreateProducts /> },
      { path: "manage_products/detail/:productId", element: <DetailProduct /> },
      { path: "manage_orders", element: <ViewOrders /> },
      { path: "manage_orders/:orderId", element: <DetailOrders /> },
      { path: "manage_discounts", element: <ViewDiscounts /> },
      {
        path: "manage_discounts/change_discount/:discountId",
        element: <ChangeDiscount />,
      },
      {
        path: "manage_discounts/create_discount/",
        element: <CreateDiscount />,
      },
      { path: "report", element: <ViewReport /> },
      { path: "message", element: <SellerMessagePage /> },
      { path: "manage_transport", element: <ViewTransport /> },
      { path: "manage_gift", element: <ViewGift /> },
      { path: "manage_gift/change_gift/:giftId", element: <ChangeGift /> },
      { path: "manage_gift/create_gift/", element: <CreateGift /> },
    ],
  },
]);
export default router;
