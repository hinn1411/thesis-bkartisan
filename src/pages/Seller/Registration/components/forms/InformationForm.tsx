import { Dispatch, FC, memo } from "react";
import TextInput from "../../../../../components/common/input/TextInput";
import { steps } from "../../data";
import Button from "../../../../../components/common/button/Button";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Inputs } from "../../SellerRegistration";
import { useFetchCountries } from "@hooks/useFetchCountries";

export interface InformationFormProps {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  goNext: Dispatch<number>;
}

const InformationForm: FC<InformationFormProps> = memo(
  ({ errors, register, goNext }) => {
    const { countries } = useFetchCountries();
    return (
      <main className="sm:w-full md:max-w-md mx-auto space-y-2 mt-4 ">
        <div>
          <div>
            <label className="text-sm">Họ và tên</label>
          </div>
          <TextInput
            className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
            type="text"
            placeholder={"Nhập họ và tên"}
            label={steps[1].name as string}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>

        <div>
          <div>
            <label className="text-sm">Số điện thoại</label>
          </div>
          <TextInput
            className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
            type="text"
            placeholder={"Nhập số điện thoại..."}
            label={steps[1].numPhone as string}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div>
          <div>
            <label className="text-sm">Địa chỉ email</label>
          </div>
          <TextInput
            className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
            type="text"
            placeholder={"Nhập email..."}
            label={steps[1].email as string}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="nation" className="block text-sm">
            Chọn quốc gia
          </label>
          <select
            id="nation"
            {...register("nation")}
            className=" border border-gray-300 text-gray-900 text-sm rounded-md  block w-full py-3 px-4 "
          >
            <option value="" selected>
              Chọn quốc gia
            </option>
            {countries &&
              countries.map((country: string, index: number) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            {/* <option value="FR">France</option>
                <option value="DE">Germany</option> */}
          </select>
          {errors.nation && (
            <p className="text-sm text-red-500">{errors.nation.message}</p>
          )}
        </div>
        <div className="">
          <div>
            <label className="text-sm">Địa chỉ liên lạc</label>
          </div>
          <div></div>
        </div>
        <div className="mt-4">
          <TextInput
            className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
            type="text"
            placeholder={"Nhập địa chỉ"}
            label={steps[1].address as string}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        {/* </div> */}
        {/* <div className="w-2/3">
          <div>
            <label>Số nhà</label>
          </div>

          <input className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1" />
        </div> */}
        <div>
          <Button
            onClick={goNext}
            className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 text-sm font-sans font-normal text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
          >
            Tiếp tục
          </Button>
        </div>
      </main>
    );
  }
);

export default InformationForm;
