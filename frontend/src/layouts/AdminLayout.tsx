import { FC, memo, Fragment, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../components/sidebar/AdminSidebar';
import HeaderAdmin from '../components/header/HeaderAdmin';

const AdminLayout: FC = memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const sidebar = document.getElementById('logo-sidebar');

    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Fragment>
      <HeaderAdmin toggleSidebar={toggleSidebar}/>
      <AdminSideBar isSidebarOpen={isSidebarOpen}/>
      <div className="p-4 sm:ml-64 mt-16">
        <Outlet />
      </div>
    </Fragment>
  );
});

export default AdminLayout;
