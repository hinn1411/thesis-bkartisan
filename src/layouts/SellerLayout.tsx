import { FC, memo, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const SellerLayout: FC = memo(() => {
  return (
    <Fragment>
      
      <Outlet />
    </Fragment>
  );
});

export default SellerLayout;
