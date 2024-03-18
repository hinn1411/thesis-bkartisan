import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';

const ViewMessage: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "Message"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">aaaaaaaa</div>
    </div>
  );
});

export default ViewMessage;
