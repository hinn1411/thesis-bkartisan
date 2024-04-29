import { FC, memo } from 'react';
import TextInput from '../../../../../components/common/input/TextInput';
import SelectInput from '../../../../../components/common/input/SelectInput';
import { FormComponentProps } from './types';
import { steps } from '../../data';
import Button from '../../../../../components/common/button/Button';
import { useAddress } from '../../hooks/useAddress';
import Spinner from '../../../../../components/common/ui/Spinner';
const InformationForm: FC<FormComponentProps> = memo(
  ({ errors, register, next, watch, getValues }) => {
    const {
      cities,
      districts,
      wards,
      currentCity,
      currentDistrict,
      currentWard,
      setCity,
      setDistrict,
      setWard,
      isFetching,
      error,
    } = useAddress();
    // const { data: cities, isFetching, error } = useCity();
    // const [currentCity, setCurrentCity] = useState();
    // const currentCity = watch('city');
    // console.log(`current city = ${currentCity}`);
    // const { data: districts } = useDistrict(currentCity);
    // console.log(`city`, cities);
    // console.log(`districts = `, districts);

    if (isFetching) {
      return <Spinner />;
    }
    if (error) {
      alert('Co loi xuat hien');
    }
    return (
      <main className="sm:w-full md:w-[35%] mx-auto space-y-2 mt-4 ">
        <div>
          <div>
            <label>Số điện thoại MoMo</label>
          </div>
          <TextInput
            type="text"
            placeholder={'Nhập tên shop của bạn...'}
            label={steps[1].fields[0]}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div>
          <div>
            <label>Họ và tên đệm</label>
          </div>
          <TextInput
            type="text"
            placeholder={'Nhập họ và tên đệm...'}
            label={steps[1].fields[1]}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div>
          <div>
            <label>Tên</label>
          </div>
          <TextInput
            type="text"
            placeholder={'Nhập tên của bạn...'}
            label={steps[1].fields[2]}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div>
          <div>
            <label>Số điện thoại cá nhân</label>
          </div>
          <TextInput
            type="text"
            placeholder={'Nhập số điện thoại...'}
            label={steps[1].fields[3]}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>
        <div>
          <div>
            <label>Địa chỉ email</label>
          </div>
          <TextInput
            type="text"
            placeholder={'Nhập email...'}
            label={steps[1].fields[4]}
            register={register}
            errors={errors}
            validatedObject={{}}
          />
        </div>

        <div className="">
          <div>
            <label>Địa chỉ liên lạc</label>
          </div>
          <div>
            <div className="sm:flex rounded-lg shadow-sm">
              <SelectInput
                currentOption={currentCity}
                setOption={setCity}
                data={cities}
                label={steps[1].fields[5]}
                register={register}
                errors={errors}
                placeholder="Tỉnh/Thành phố"
                className="py-4 px-4 inline-flex items-center min-w-fit w-full border border-gray-200  text-sm  -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg relative focus:z-10  focus:border-blue-500 focus:ring-blue-500"
              />
              <SelectInput
                currentOption={currentDistrict}
                setOption={setDistrict}
                data={districts}
                label={steps[1].fields[6]}
                register={register}
                errors={errors}
                placeholder="Quận/Huyện"
                className="py-4 px-4 pe-11 block w-full border-gray-200  -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              />
              <SelectInput
                currentOption={currentWard}
                setOption={setWard}
                data={wards}
                label={steps[1].fields[7]}
                register={register}
                errors={errors}
                placeholder="Phường/Xã"
                className="py-4 px-4 pe-11 block w-full border-gray-200  -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
              />
            </div>

            <div>
              {(errors[steps[1].fields[5]] ||
                errors[steps[1].fields[6]] ||
                errors[steps[1].fields[7]]) && (
                <p className="text-red-600 text-sm">
                  Vui lòng chọn địa chỉ liên lạc
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <TextInput
              type="text"
              placeholder={'Nhập số nhà và tên đường...'}
              label={steps[1].fields[8]}
              register={register}
              errors={errors}
              validatedObject={{}}
            />
          </div>
        </div>
        {/* <div className="w-2/3">
          <div>
            <label>Số nhà</label>
          </div>

          <input className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1" />
        </div> */}
        <div>
          <Button
            className="w-full md:w-auto md:mx-auto flex justify-center items-center p-3 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
            onClick={next}
          >
            Tiếp tục
          </Button>
        </div>
      </main>
    );
  }
);

export default InformationForm;
