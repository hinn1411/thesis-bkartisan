import { FC, memo } from "react";
import { Outlet } from "react-router-dom";
import { useUserProfile } from "@hooks/useUserProfile";
import Forbidden from "src/pages/Forbidden";
import LoadingMessage from "@components/admin/LoadingMessage";
import ErrorMessage from "@components/admin/ErrorMessage";

const AuthLayout: FC = memo(() => {
  const { user, isPending, error } = useUserProfile();

  if (isPending) {
    return <LoadingMessage />;
  }

  if (error) {
    if (error.response?.status === 401) {
        return <ErrorMessage msg={"Vui lòng đăng nhập để vào trang này!"} />;
    }
    return <ErrorMessage msg={error.message} />;
  }

  if (!user) {
    return <Forbidden />;
  }

  return (
    <div className="p-5">
      <Outlet context={[user]} />
    </div>
  );
});

export default AuthLayout;
