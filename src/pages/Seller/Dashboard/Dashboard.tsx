import { FC, memo } from 'react';
import SellerSideBar from '../../../components/sidebar/SellerSideBar';
import ChartLineComponent from './components/ChartLine';

const Dashboard: FC = memo(() => {
  return (
    <div>
      <SellerSideBar name = "dashboard"></SellerSideBar>
      <div className="p-4 sm:ml-64 mt-16">
        <div className='space-y-3 border rounded-lg p-3 mb-3 shadow'>
          <div className='space-y-2'>
            <p className='text-xl font-bold'>Việc cần phải làm</p>
            <p>Những việc bạn cần phải làm</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">0</p>
                  <p>Chờ xác nhận</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">1</p>
                  <p>Đang xử lý</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">1</p>
                  <p>Chờ lấy hàng</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">0</p>
                  <p>Trả hàng</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">0</p>
                  <p>S.phẩm hết hàng</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">0</p>
                  <p>S.phẩm tạm ngưng</p>
              </div>
              <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-orange-500 text-center">0</p>
                  <p>S.phẩm vi phạm</p>
              </div>
          </div>

        </div>
        <div>
          <ChartLineComponent/>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
