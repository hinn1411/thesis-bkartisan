import Button from "@components/common/button/Button";
import Spinner from "@components/common/ui/Spinner";
import { useUserProfile } from "@hooks/useUserProfile";
import { FC, memo, useState } from "react";
import {
  AccountSchema,
  EmailSchema,
  PasswordSchema,
  ShippingAddressSchema,
} from "./schema/index";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@components/common/input/TextInput";
import { useMutateProfile } from "./hooks/useMutateProfile";
import { useFetchCountries } from "@hooks/useFetchCountries";

export type Account = z.infer<typeof AccountSchema>;
export type Password = z.infer<typeof PasswordSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type ShippingAdress = z.infer<typeof ShippingAddressSchema>;
const Profile: FC = memo(() => {
  const infoTypes = ["Tài khoản", "Mật khẩu", "Email", "Địa chỉ giao hàng"];
  const [currentTab, setCurrentTab] = useState(0);
  const { user, isPending } = useUserProfile();
  const [currentAccountInfo] = useState({
    avatar: user?.avatar,
    name: user?.name,
    numPhone: user?.numPhone,
    gender: user?.gender,
  });
  const { countries } = useFetchCountries();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
  const { updateAccount, updatePassword, updateEmail, updateAddress } =
    useMutateProfile();
  const {
    register: accountRegister,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
    setValue: setAccountValue,
  } = useForm<Account>({
    resolver: zodResolver(AccountSchema),
    defaultValues: currentAccountInfo,
  });
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<Password>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
  });
  const {
    register: emailRegister,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<Email>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      password: "",
      email: "",
      confirmedEmail: "",
    },
  });
  const {
    register: shippingAddressRegister,
    handleSubmit: handleShippingAddressSubmit,
    formState: { errors: shippingAddressErrors },
  } = useForm<ShippingAdress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      nation: "",
      address: "",
    },
  });
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const file = files[0];
    const newAvatarPreview = URL.createObjectURL(file);
    setAccountValue("avatar", file);
    setAvatarPreview(newAvatarPreview);
  };
  const handleUpdateAccount: SubmitHandler<Account> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("numPhone", data.numPhone);
    formData.append("gender", data.gender);

    if (data.avatar instanceof File) {
      formData.append("images", data.avatar); // Changed key to "avatar"
    } else {
      console.error("Avatar is not a file instance");
    }

    console.log(`formData entries:`);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    updateAccount(formData);
  };
  const handleUpdatePassword: SubmitHandler<Password> = async (data) => {
    console.log(data);
    updatePassword({
      password: data.currentPassword,
      newPassword: data.newPassword,
    });
  };
  const handleUpdateEmail: SubmitHandler<Email> = async (data) => {
    console.log(data);
    updateEmail({
      email: data.email,
      password: data.password,
    });
  };
  const handleUpdateShippingAddress: SubmitHandler<ShippingAdress> = async (
    data
  ) => {
    console.log(data);
    updateAddress(data);
  };
  console.log(user);
  if (!user || isPending) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="min-h-screen mx-4 md:mx-20 space-y-6">
      <div className="flex justify-center mt-4 space-y-4">
        {/* Tabs header  */}
        <div className="text-sm font-medium text-center text-black b border-gray-300">
          <ul className="flex flex-wrap">
            {infoTypes.map((info: string, index: number) => (
              <li
                key={index}
                onClick={() => setCurrentTab(index)}
                className="me-2"
              >
                <p
                  className={
                    currentTab == index
                      ? `inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active`
                      : `inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300`
                  }
                >
                  {info}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-md mx-auto">
        {currentTab === 0 && (
          <form
            onSubmit={handleAccountSubmit(handleUpdateAccount)}
            className="space-y-3"
            method="POST"
            encType="multipart/form-data"
          >
            {/* Avatar */}
            <div className="flex flex-col space-y-3 items-center mx-auto">
              <img
                className="w-[75px] h-[75px] object-cover rounded"
                src={avatarPreview || user.avatar}
              />
              <label
                htmlFor="upload"
                className="flex bg-gray-800 hover:bg-gray-700 text-white text-sm px-6 py-2 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
              >
                Chọn file
                <input
                  {...accountRegister("avatar")}
                  onChange={handleChangeAvatar}
                  type="file"
                  id="upload"
                  className="hidden"
                />
              </label>
            </div>
            {/* Username */}
            <div>
              <label className="text-sm">Tên tài khoản</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 bg-gray-100  rounded-md   placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                value={user.username}
                disabled
                readOnly
              />
            </div>
            {/* Full Name */}
            <div>
              <label className="text-sm">Tên người dùng</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                placeholder="Nhập tên người dùng"
                label="name"
      
                register={accountRegister}
                errors={accountErrors}
                validatedObject={{}}
              />
              {/* <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                value={user.name}
              /> */}
            </div>
            {/* Gender */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  {...accountRegister("gender")}
                  id="male"
                  type="radio"
                  value="1"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />
                <label
                  htmlFor="male"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nam
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...accountRegister("gender")}
                  id="female"
                  type="radio"
                  value="0"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />
                <label
                  htmlFor="female"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Nữ
                </label>
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="text-sm">Số điện thoại</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                placeholder="Nhập số điện thoại"
                label="numPhone"
                register={accountRegister}
                errors={accountErrors}
                validatedObject={{}}
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans text-sm font-semibold text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật
            </Button>
          </form>
        )}
        {currentTab === 1 && (
          <form
            onSubmit={handlePasswordSubmit(handleUpdatePassword)}
            className="space-y-3"
          >
            <div>
              <label className="text-sm">Mật khẩu hiện tại</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="password"
                placeholder="Nhập mật khẩu hiện tại"
                label="currentPassword"
                register={passwordRegister}
                errors={passwordErrors}
                validatedObject={{}}
              />
            </div>
            <div>
              <label className="text-sm">Mật khẩu mới</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="password"
                placeholder="Nhập mật khẩu hiện mới"
                label="newPassword"
                register={passwordRegister}
                errors={passwordErrors}
                validatedObject={{}}
              />
            </div>
            <div>
              <label className="text-sm">Nhập lại mật khẩu mới</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="password"
                placeholder="Xác nhận mật khẩu hiện tại"
                label="confirmedPassword"
                register={passwordRegister}
                errors={passwordErrors}
                validatedObject={{}}
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật mật khẩu
            </Button>
          </form>
        )}
        {currentTab === 2 && (
          <form
            onSubmit={handleEmailSubmit(handleUpdateEmail)}
            className="space-y-3"
          >
            <div>
              <label className="text-sm">Địa chỉ email hiện tại</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 bg-gray-100  rounded-md   placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                value={user.email}
                disabled
                readOnly
              />
            </div>
            <div>
              <label className="text-sm">Địa chỉ email mới</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="email"
                placeholder="Nhập email mới"
                label="email"
                register={emailRegister}
                errors={emailErrors}
                validatedObject={{}}
              />
            </div>
            <div>
              <label className="text-sm">Xác nhận địa chỉ email</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="email"
                placeholder="Nhập lại email"
                label="confirmedEmail"
                register={emailRegister}
                errors={emailErrors}
                validatedObject={{}}
              />
            </div>
            <div>
              <label className="text-sm">Mật khẩu</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="password"
                placeholder="Nhập mật khẩu"
                label="password"
                register={emailRegister}
                errors={emailErrors}
                validatedObject={{}}
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Xác nhận
            </Button>
          </form>
        )}
        {currentTab === 3 && (
          <form
            onSubmit={handleShippingAddressSubmit(handleUpdateShippingAddress)}
            className="space-y-3"
          >
            <div className="space-y-2">
              <label htmlFor="countries" className="block text-sm">
                Chọn quốc gia
              </label>
              <select
                id="countries"
                {...shippingAddressRegister("nation")}
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
              {shippingAddressErrors.nation && (
                <p className="text-sm text-red-500">
                  {shippingAddressErrors.nation.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm">Địa chỉ giao hàng</label>
              <TextInput
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                placeholder="Nhập địa chỉ cá nhân"
                label="address"
                register={shippingAddressRegister}
                errors={shippingAddressErrors}
                validatedObject={{}}
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật địa chỉ
            </Button>
          </form>
        )}
      </div>
    </main>
  );
});

export default Profile;
