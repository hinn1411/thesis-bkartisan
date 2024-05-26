import { FC, memo, useState } from "react";
import { useFetchBuyerOrders } from "./hooks/useFetchBuyerOrders";
import OrderList from "./components/OrderList";
import { ORDER_STATES } from "./state.ts";
const Order: FC = memo(() => {
  const [currentTab, setCurrentTab] = useState(0);
  const { data: orders, isLoading, setCurrentStatus } = useFetchBuyerOrders();
  console.log(orders);
  const orderCategories = Object.values(ORDER_STATES);

  return (
    <div className=" min-h-screen mx-4 md:mx-20 space-y-6 my-6">
      {/* <OrderDetailsModal isOpen={true} /> */}
      <h1 className="text-2xl font-semibold font-sans text-center mt-4">
        Quản lý đơn hàng
      </h1>
      {/* Tab container */}
      <div className="flex justify-center space-y-4">
        {/* Tabs header  */}
        <div className="text-sm font-medium text-center text-black b border-gray-300">
          <ul className="flex flex-wrap">
            {orderCategories.map((title, index: number) => (
              <li
                onClick={() => {
                  setCurrentTab(index);
                  if (title == ORDER_STATES.ALL) {
                    setCurrentStatus("");
                  } else {
                    setCurrentStatus(title as string);
                  }
                }}
                key={index}
                className="me-2"
              >
                <p
                  className={
                    currentTab == index
                      ? `inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active`
                      : `inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`
                  }
                >
                  {title as string}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Order list */}
      <OrderList data={orders} isLoading={isLoading} className="space-y-6" />
    </div>
  );
});

export default Order;
