import { FC, Fragment, memo, Dispatch } from "react";
import styles from "./GiftDetailModal.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "@utils/formatCurrency";
import { CURRENCIES } from "@contants/currencies";

interface GiftComponentProps {
  coverImage: string;
  name: string;
  price: number;
  quantity: number;
  setItem: Dispatch<any>;
}

/*
  Remember adding links to product details page
*/

const GiftComponent: FC<GiftComponentProps> = memo(
  ({ coverImage, name, price, setItem }) => {
    // const [isDeletedModal, setIsDeletedModal] = useState(true);
    const formattedPrice = formatCurrency(price, CURRENCIES.VIETNAMDONG);
    return (
      <Fragment>
        {/* <Modal isOpen={isDeletedModal} setIsOpen={setIsDeletedModal} /> */}
        <div className="flex justify-between items-start">
          {/* Item container */}
          <div className="flex space-x-2">
            <div>
              <img
                className="h-[50px] w-[50px] overflow-hidden"
                src={coverImage}
              />
            </div>
            {/* specifications container */}
            <div>
              <p className={`${styles.description}`}>{name}</p>
              <p className={`${styles.price}`}>{formattedPrice}</p>
            </div>
          </div>
          {/* Button container */}
          <div
            onClick={() => {
              console.log(`card/box`);
              setItem([]);
            }}
            className="flex justify-center items-center space-x-1 hover:cursor-pointer"
          >
            <div className="flex justify-center items-center">
              <DeleteOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <p>Xóa</p>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default GiftComponent;
