import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import ViewMessage from 'src/pages/Message/ViewMessage';

const SellerMessagePage: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "Message"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <ViewMessage />
      </div>
    </div>
  );
});

export default SellerMessagePage;