import { FC, memo, Fragment, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/sidebar/AdminSidebar";
import HeaderAdmin from "../components/header/HeaderAdmin";
import { useUserProfile } from "@hooks/useUserProfile";
import Forbidden from "src/pages/Forbidden";
import LoadingMessage from "@components/admin/LoadingMessage";
import ErrorMessage from "@components/admin/ErrorMessage";

const AdminLayout: FC = memo(() => {
  const { user, isPending, error } = useUserProfile();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const sidebar = document.getElementById("logo-sidebar");

    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (isPending) {
    return <LoadingMessage />;
  }

  if (!user) {
    if (error) {
      return <ErrorMessage msg={error.message} />;
    }
    return <Forbidden />;
  }

  if (user.role !== "admin" && user.role !== "collab") {
    return <Forbidden />;
  }

  return (
    <Fragment>
      <HeaderAdmin toggleSidebar={toggleSidebar} name={user.name} />
      <AdminSideBar isSidebarOpen={isSidebarOpen} role={user.role} username={user.username}/>
      <div className="p-4 sm:ml-64 mt-16">
        <Outlet context={[user]} />
      </div>
    </Fragment>
  );
});

export default AdminLayout;
