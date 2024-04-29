import { FC, Fragment, memo } from 'react';
import styles from './GiftDetailModal.module.css';
import { DeleteOutlined } from '@ant-design/icons';


interface GiftComponentProps {
  srcImage: string;
  description: string;
  price: number;
}

/*
  Remember adding links to product details page
*/

const GiftComponent: FC<GiftComponentProps> = memo(
  ({ srcImage, description, price }) => {
    // const [isDeletedModal, setIsDeletedModal] = useState(true);
    return (
      <Fragment>
        {/* <Modal isOpen={isDeletedModal} setIsOpen={setIsDeletedModal} /> */}
        <div className="flex justify-between items-start">
          {/* Item container */}
          <div className="flex space-x-2">
            <div>
              <img
                className="h-[50px] w-[50px] overflow-hidden"
                src={srcImage}
              />
            </div>
            {/* specifications container */}
            <div>
              <p className={`${styles.description}`}>{description}</p>
              <p className={`${styles.price}`}>{price}đ</p>
            </div>
          </div>
          {/* Button container */}
          <div className="flex justify-center items-center space-x-1 hover:cursor-pointer">
            <div className="flex justify-center items-center">
              <DeleteOutlined />
            </div>
            <p>Xóa</p>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default GiftComponent;
