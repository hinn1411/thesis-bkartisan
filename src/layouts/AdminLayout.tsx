import { FC, memo, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../components/sidebar/AdminSidebar';
const AdminLayout: FC = memo(({}) => {
  return (
    <Fragment>
      <AdminSideBar />
      <Outlet />
    </Fragment>
  );
});

export default AdminLayout;
