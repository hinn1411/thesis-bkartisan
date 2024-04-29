import { FC, memo } from 'react';
import { FormComponentProps } from './types';
import { steps } from '../../data';
import TextInput from '../../../../../components/common/input/TextInput';
import Button from '../../../../../components/common/button/Button';
const lastStepIdx = steps.length - 1;

const ConfirmationForm: FC<FormComponentProps> = memo(
  ({ errors, register, next }) => {
    return (
      <main className="sm:w-full md:w-[40%] mx-auto  space-y-4">
        <p className="text-sm line-clamp-2 text-start">
          Mã xác thực đã được gửi đến email đã được đăng ký, nhập mã xác thực
          đồng nghĩa với việc thông tin bạn cung cấp là chính chủ.
        </p>
        {/* Button container */}
        <div className="mx-auto flex flex-col space-y-4">
          <TextInput
            type="text"
            label={steps[lastStepIdx].fields[0]}
            register={register}
            errors={errors}
            placeholder="Nhập mã xác thực"
            validatedObject={{}}
          />
          <div className="mt-4">
            <Button
              onClick={next}
              className="w-full md:w-auto md:mx-auto flex justify-center items-center p-4 font-sans font-normal text-white rounded-md px-4 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
            >
              Xác nhận
            </Button>
          </div>
        </div>
        <div></div>
      </main>
    );
  }
);

export default ConfirmationForm;
