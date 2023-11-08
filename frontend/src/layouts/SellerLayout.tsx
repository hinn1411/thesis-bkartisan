import { FC, memo, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import SellerSideBar from '../components/sidebar/SellerSideBar';
const SellerLayout: FC = memo(({}) => {
  return (
    <Fragment>
      <SellerSideBar />
      <Outlet />
    </Fragment>
  );
});

export default SellerLayout;
