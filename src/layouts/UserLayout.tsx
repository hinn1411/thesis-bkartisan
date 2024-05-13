import { FC, memo, Fragment } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import CartProvider from 'src/store/cartContext';
const UserLayout: FC = memo(() => {
  return (
    <Fragment>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </Fragment>
  );
});

export default UserLayout;
