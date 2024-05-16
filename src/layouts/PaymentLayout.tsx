import { FC, memo, Fragment } from 'react';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';
import PaymentHeader from '@components/header/PaymentHeader';
const PaymentLayout: FC = memo(() => {
  return (
    <Fragment>
      <PaymentHeader />
      <Outlet />
      <Footer />
    </Fragment>
  );
});

export default PaymentLayout;
