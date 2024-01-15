import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';

const Dashboard: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "dashboard"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">aaaaaaaa</div>
    </div>
  );
});

export default Dashboard;
