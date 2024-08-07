import { Dispatch, FC, memo } from "react";
import styles from "./Stepper.module.css";
import { CheckOutlined } from "@ant-design/icons";
import { steps } from "../data.ts";
interface StepperProps {
  currentState: number;
  setCurrent: Dispatch<number>;
  isCompleted: boolean;
  setIsCompleted: Dispatch<boolean>;
}

const Stepper: FC<StepperProps> = memo(
  ({ currentState, setCurrent, isCompleted }) => {
    // const steps = ['Đặt tên shop', 'Cập nhật thông tin', 'Xác thực'];
    return (
      <div>
        <div className="flex justify-center">
          {steps?.map((step, i) => (
            <div
              className={`${styles.step_item} ${
                currentState == i && styles.active
              } ${(i < currentState || isCompleted) && styles.complete}`}
              key={i}
            >
              <div onClick={() => setCurrent(i)} className={styles.step}>
                {i < currentState || isCompleted ? (
                  <CheckOutlined
                    size={24}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                ) : (
                  i + 1
                )}
              </div>
              <p
                onClick={() => setCurrent(i)}
                className="text-gray-500 mt-2 hover:cursor-pointer"
              >
                {step.stepName}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Stepper;
