import { Dispatch, FC, memo } from "react";
import TextInput from "../../../../../components/common/input/TextInput";
import Button from "../../../../../components/common/button/Button";

import { steps } from "../../data";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "../../SellerRegistration";

export interface ShopFormProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  goNext: Dispatch<number>;
}

const ShopForm: FC<ShopFormProps> = memo(({ register, errors, goNext }) => {
  return (
    <main className="sm:w-full md:w-[35%] mx-auto space-y-3 ">
      <p className="text-sm">
        Tips: Đặt tên theo những gì bạn bán, phong cách hay cảm hứng của bạn
      </p>
      <TextInput
        className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
        type="text"
        placeholder={"Nhập tên shop của bạn..."}
        label={steps[0].shopName as string}
        register={register}
        errors={errors}
        validatedObject={{}}
      />

      <ul className="list-disc list-inside text-sm">
        <li>Tên shop có độ dài từ 6-20 ký tự</li>
        <li>Không chứa ký tự đặc biệt, bao gồm khoản trắng và ký tự có dấu</li>
      </ul>
      <Button
        onClick={goNext}
        className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 text-sm font-sans font-normal text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
      >
        Cập nhật và tiếp tục
      </Button>
    </main>
  );
});

export default ShopForm;
