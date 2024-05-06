import { FC, memo, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import Stepper from './components/Stepper';
import TextInput from '../../../components/common/input/TextInput';
import { useForm } from 'react-hook-form';
const SellerRegistration: FC = memo(() => {
  const [currentState, setCurrentState] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shopName: ``,
      password: ``,
    },
  });
  return (
    <main className="min-h-screen px-20 my-5">
      <div className="flex justify-start items-center space-x-1">
        <InfoCircleOutlined />

        <p className="font-base">
          Hiện tại hệ thống chỉ hỗ trợ người bán ở Việt Nam. (Support Vietnamese
          sellers only)
        </p>
      </div>
      <div className="mt-4 space-y-5">
        <p className="text-center text-3xl">Trở thành người bán</p>
        <Stepper
          currentState={currentState}
          setCurrent={setCurrentState}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        <div className="w-[40%] mx-auto space-y-3 ">
          <p className="text-sm">
            Tips: Đặt tên theo những gì bạn bán, phong cách hay cảm hứng của bạn
          </p>
          <TextInput
            type="text"
            placeholder={'Nhập tên shop của bạn...'}
            label="username"
            register={register}
            errors={errors}
            validatedObject={{
              required: `Vui lòng nhập tên tài khoản`,
              minLength: {
                value: 6,
                message: `Tên tài khoản phải có ít nhất 6 ký tự`,
              },
            }}
          />
          <ul className="list-disc list-inside">
            <li>Tên shop có độ dài từ 6-20 ký tự</li>
            <li>
              Không chứa ký tự đặc biệt, bao gồm khoản trắng và ký tự có dấu
            </li>
          </ul>
          <button className="w-full md:w-auto md:mx-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
            Cập nhật và tiếp tục
          </button>
        </div>
      </div>
    </main>
  );
});

export default SellerRegistration;
