import { Dispatch, FC, memo } from "react";
import { steps } from "../../data.ts";
import TextInput from "@components/common/input/TextInput";
import Button from "@components/common/button/Button";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "../../SellerRegistration.tsx";

export interface ConfirmationFormProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  goNext: Dispatch<number>;
}

const ConfirmationForm: FC<ConfirmationFormProps> = memo(
  ({ errors, register, goNext }) => {
    return (
      <main className="sm:w-full md:w-[40%] mx-auto  space-y-4">
        <p className="text-sm line-clamp-2 text-start">
          Mã xác thực đã được gửi đến email đã được đăng ký, nhập mã xác thực
          đồng nghĩa với việc thông tin bạn cung cấp là chính chủ.
        </p>
        {/* Button container */}
        <div className="mx-auto flex flex-col space-y-4">
          <TextInput
            className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
            type="text"
            label={steps[2].emailCode as string}
            register={register}
            errors={errors}
            placeholder="Nhập mã xác thực"
            validatedObject={{}}
          />
          <div className="mt-4">
            <Button
              onClick={goNext}
              className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 text-sm font-sans font-normal text-white rounded-md px-12 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
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
