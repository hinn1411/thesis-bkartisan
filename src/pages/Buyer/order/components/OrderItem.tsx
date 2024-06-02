import Button from "@components/common/button/Button";
import { CURRENCIES } from "@contants/currencies";
import { formatCurrency } from "@utils/formatCurrency";
import { FC, memo, useState } from "react";
import { ORDER_STATES } from "../state.ts";
import { usePayment } from "../../checkout/hooks/usePayment.tsx";
import { useCancelOrder } from "../../checkout/hooks/useCancelOrder.tsx";
import CancelOrderModal from "../../checkout/components/CancelOrderModal.tsx";
import { useOrderDetails } from "../hooks/useOrderDetails.tsx";
import OrderDetailsModal from "./OrderDetailsModal.tsx";
import Item from "./Item.tsx";
import ReturnModal from "./ReturnModal.tsx";
import { useChangeOrderState } from "../hooks/useChangeOrderState.tsx";
import ConfirmModal from "./ConfirmModal.tsx";
import { useNavigate } from "react-router-dom";
import ReportOrderModal from "./ReportOrderModal.tsx";
import { useUserProfile } from "@hooks/useUserProfile.tsx";

export interface ItemProps {
  coverImage: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface OrderItemProps {
  orderId: string;
  status: string;
  items: ItemProps[];
  totalPrice: number;
  shipPrice: number;
  discountPrice: number;
  createAt: string;
  paymentMethod: string;
  seller: string;
  sellerName: string;
  sellerAvatar: string;
}

const OrderItem: FC<OrderItemProps> = memo(
  ({
    orderId,
    status,
    items,
    totalPrice,
    shipPrice,
    discountPrice,
    createAt,
    paymentMethod,
    sellerAvatar,
    sellerName,
    seller,
  }) => {
    const navigate = useNavigate();
    const { handleSingleOrderCheckout } = usePayment();
    const { cancelOrder, isOpenCancelOrderModal, setIsOpenCancelOrderModal } =
      useCancelOrder();
    const { isOpenOrderDetailModal, setIsOpenOrderDetailModal } =
      useOrderDetails();
    const { isChangeStateModalOpen, setIsChangeStateModalOpen, changeState } =
      useChangeOrderState();
    const handleCheckout = () => {
      handleSingleOrderCheckout({
        orderId,
        totalPrice: totalPrice - discountPrice + shipPrice,
      });
    };
    const handleCancelOrder = () => {
      cancelOrder({
        orderId: orderId,
      });
    };
    const handleReturnOrder = () => {
      changeState({
        orderId: orderId,
      });
    };
    const handleConfirmOrder = () => {
      changeState({
        orderId: orderId,
      });
    };
    const handleChatWithSeller = () => {
      navigate("/message", {
        state: {
          username: seller,
          name: sellerName,
          avatar: sellerAvatar,
        },
      });
    };

    const [isOpenedReportOrder, setIsOpenedReportOrder] = useState(false);
    const {
      user,
      isPending: isLoadingUser,
      isAuthenticated,
    } = useUserProfile();


    return (
      <li className="w-full md:w-1/2 mx-auto space-y-6 bg-[#FAFAFA] py-[20px] px-[45px] rounded-[7.5px] shadow-xl">
        {user && (
          <ReportOrderModal
            isOpen={isOpenedReportOrder}
            setIsOpen={setIsOpenedReportOrder}
            reporter={user}
            reportedUser={{username: seller, name: sellerName}}
          />
        )}
        {/* Order information */}
        <span className="flex flex-col md:flex-row justify-between border-b-2 border-b-gray-300 pb-4">
          <span className="text-[14px]">
            Đơn hàng <span className="font-semibold">#{orderId}</span> -{" "}
            <span className="text-orange-600">{status}</span>
          </span>
          {/* <span className="text-[13px]">
            Hỗ trợ trả hàng đến{" "}
            <span className="font-sans font-bold">23/4/2024</span>
          </span> */}
        </span>
        {/* Item container */}
        <ul className="space-y-4 pb-6 border-b-2 border-b-gray-300">
          {items.map((item: ItemProps, index: number) => (
            <Item key={index} {...item} />
          ))}
        </ul>
        {/* Bill container */}
        <div className="space-y-4 text-end text-sm">
          <p>
            Tổng đơn:{" "}
            <span className="text-orange-600">
              {formatCurrency(totalPrice, CURRENCIES.VIETNAMDONG)}
            </span>
          </p>
          <p>
            Giảm giá:{" "}
            <span className="text-orange-600">
              {formatCurrency(discountPrice, CURRENCIES.VIETNAMDONG)}
            </span>
          </p>
          <p>
            Phí vận chuyển :{" "}
            <span className="text-orange-600">
              {formatCurrency(shipPrice, CURRENCIES.VIETNAMDONG)}
            </span>
          </p>
          <p>
            Thành tiền:{" "}
            <span className="text-orange-600">
              {formatCurrency(
                totalPrice - discountPrice + shipPrice,
                CURRENCIES.VIETNAMDONG
              )}
            </span>
          </p>
          {/* Button container */}
          <div className="flex flex-col md:flex-row justify-end space-x-0 md:space-x-4 space-y-2 md:space-y-0">
            {status === ORDER_STATES.CONFIRMING && (
              <Button
                onClick={handleCheckout}
                className="text-[13px] font-sans text-center border-2 border-orange-600 bg-orange-600 text-white  py-[10px] px-[27px] rounded-[6px]"
              >
                Thanh toán
              </Button>
            )}
            {[ORDER_STATES.CONFIRMING, ORDER_STATES.PROCESSING].includes(
              status as ORDER_STATES
            ) && (
              <>
                <CancelOrderModal
                  isOpen={isOpenCancelOrderModal}
                  setIsOpen={setIsOpenCancelOrderModal}
                  onCancel={handleCancelOrder}
                />
                <Button
                  onClick={() => setIsOpenCancelOrderModal(true)}
                  className="text-[13px] font-sans text-center border-2 border-red-600  py-[10px] px-[45px] rounded-[6px]"
                >
                  Hủy đơn
                </Button>
              </>
            )}
            {[ORDER_STATES.SHIPPING].includes(status as ORDER_STATES) && (
              <>
                <ConfirmModal
                  isOpen={isChangeStateModalOpen}
                  setIsOpen={setIsChangeStateModalOpen}
                  onConfirm={handleConfirmOrder}
                />
                <Button
                  onClick={() => setIsChangeStateModalOpen(true)}
                  className="text-[13px] font-sans text-center border-2 border-green-600 bg-green-600 text-white  py-[10px] px-[27px] rounded-[6px]"
                >
                  Xác nhận đơn hàng
                </Button>
              </>
            )}
            {[ORDER_STATES.DONE].includes(status as ORDER_STATES) && (
              <>
                <ReturnModal
                  isOpen={isChangeStateModalOpen}
                  setIsOpen={setIsChangeStateModalOpen}
                  onReturn={handleReturnOrder}
                />
                <Button
                  onClick={() => setIsChangeStateModalOpen(true)}
                  className="text-[13px] font-sans text-center border-2 border-[#DC2626]  py-[10px] px-[45px] rounded-[6px]"
                >
                  Trả hàng
                </Button>
              </>
            )}
            {[ORDER_STATES.DENY_RETURN].includes(status as ORDER_STATES) && (
              <Button onClick={() => setIsOpenedReportOrder(true)} className="text-[13px] font-sans text-center border-2 border-orange-600 bg-orange-600 text-white  py-[10px] px-[32px] rounded-[6px]">
                Báo cáo
              </Button>
            )}
            <OrderDetailsModal
              isOpen={isOpenOrderDetailModal}
              setIsOpen={setIsOpenOrderDetailModal}
              data={{
                orderId,
                status,
                items,
                totalPrice,
                shipPrice,
                discountPrice,
                createAt,
                paymentMethod,
                sellerAvatar,
                sellerName,
                seller,
              }}
            />
            <Button
              onClick={() => setIsOpenOrderDetailModal(true)}
              className="text-[13px] font-sans text-center border-2 border-orange-600 bg-orange-600 text-white  py-[10px] px-[27px] rounded-[6px]"
            >
              Xem đơn hàng
            </Button>
            {![ORDER_STATES.CONFIRMING, ORDER_STATES.CANCELED].includes(
              status as ORDER_STATES
            ) && (
              <Button
                onClick={handleChatWithSeller}
                className="text-[13px] font-sans text-center border-2 border-[#D1D5DB] py-[10px] px-[15px] rounded-[6px]"
              >
                Nhắn tin với người bán
              </Button>
            )}
          </div>
        </div>
      </li>
    );
  }
);

export default OrderItem;
