import ErrorMessage from '@components/admin/ErrorMessage';
import LoadingMessage from '@components/admin/LoadingMessage';
import { useUserProfile } from '@hooks/useUserProfile';
import { FC, memo, Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const SellerLayout: FC = memo(() => {
  const { user, isPending, error } = useUserProfile();

  if (isPending) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage msg={error.message} />;
  }
  
  return (
    <Fragment>
      
      <Outlet context={[user]}/>
    </Fragment>
  );
});

export default SellerLayout;
