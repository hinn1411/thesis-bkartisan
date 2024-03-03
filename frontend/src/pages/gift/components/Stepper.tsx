import { FC, memo, useState } from 'react';
import styles from './Stepper.module.css';
import { CheckOutlined } from '@ant-design/icons';
interface StepperProps {
  currentState: number;
  setCurrent: any;
  isCompleted: boolean;
  setIsCompleted: any;
}

const Stepper: FC<StepperProps> = memo(
  ({ currentState, setCurrent, isCompleted }) => {
    const steps = ['Chọn hộp quà', 'Chọn quà', 'Chọn thiệp chúc'];
    return (
      <div>
        <div className="flex justify-center">
          {steps?.map((step, i) => (
            <div
              className={`${styles.step_item} ${
                currentState == i + 1 && styles.active
              } ${(i + 1 < currentState || isCompleted) && styles.complete}`}
              key={i}
            >
              <div onClick={() => setCurrent(i + 1)} className={styles.step}>
                
                  {i + 1 < currentState || isCompleted ? (
                    <CheckOutlined size={24} />
                  ) : (
                    i + 1
                  )}
                
              </div>
              <p
                onClick={() => setCurrent(i + 1)}
                className="text-gray-500 mt-2 hover:cursor-pointer"
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default Stepper;
