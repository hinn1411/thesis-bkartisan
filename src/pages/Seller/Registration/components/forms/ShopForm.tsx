import { FC, memo } from 'react';
import TextInput from '../../../../../components/common/input/TextInput';
import Button from '../../../../../components/common/button/Button';
import { FormComponentProps } from './types';
import { steps } from '../../data';
const ShopForm: FC<FormComponentProps> = memo(({ register, errors, next }) => {
  return (
    <main className="sm:w-full md:w-[35%] mx-auto space-y-3 ">
      <p className="text-sm">
        Tips: Đặt tên theo những gì bạn bán, phong cách hay cảm hứng của bạn
      </p>
      <TextInput
        type="text"
        placeholder={'Nhập tên shop của bạn...'}
        label={steps[0].fields[0]}
        register={register}
        errors={errors}
        validatedObject={{}}
      />
      <ul className="list-disc list-inside">
        <li>Tên shop có độ dài từ 6-20 ký tự</li>
        <li>Không chứa ký tự đặc biệt, bao gồm khoản trắng và ký tự có dấu</li>
      </ul>
      <Button
        onClick={next}
        className="w-full md:w-auto md:mx-auto flex justify-center items-center p-4 space-x-2 font-sans font-normal text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
      >
        Cập nhật và tiếp tục
      </Button>
    </main>
  );
});

export default ShopForm;
