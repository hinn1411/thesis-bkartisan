import Button from "@components/common/button/Button";
import Spinner from "@components/common/ui/Spinner";
import { useUserProfile } from "@hooks/useUserProfile";
import { FC, memo, useState } from "react";

const Profile: FC = memo(() => {
  const infoTypes = ["Tài khoản", "Mật khẩu", "Email", "Địa chỉ giao hàng"];
  const { user, isPending } = useUserProfile();
  const [currentTab, setCurrentTab] = useState(0);
  // const [avatar, setAvatar] = useState<string>(
  //   "https://preview.redd.it/abd5x9lls4o51.png?auto=webp&s=5b7d0004671483e1d30f458421b03785e0c890e5"
  // );
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    console.log(files[0]);
    // setAvatar(URL.createObjectURL(files[0]));
  };
  if (isPending) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Spinner />
      </main>
    );
  }
  console.log(user);

  return (
    <main className="min-h-screen mx-4 md:mx-20 space-y-6">
      <div className="flex justify-center space-y-4">
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
          <div className="space-y-3">
            {/* Avatar */}
            <div className="flex flex-col space-y-3 items-center mx-auto">
              <img
                className="w-[75px] h-[75px] object-cover rounded"
                src={user.avatar}
              />
              <label
                htmlFor="upload"
                className="flex bg-gray-800 hover:bg-gray-700 text-white text-sm px-6 py-2 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]"
              >
                Chọn file
                <input
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
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                value={user.name}
              />
            </div>
            {/* Gender */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  checked={user.gender == 1}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                />
                <label
                  htmlFor="male"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Name
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={user.gender == 0}
                  id="female"
                  type="radio"
                  
                  name="default-radio"
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
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
                value={user.numPhone}
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans text-sm font-semibold text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật
            </Button>
          </div>
        )}
        {currentTab === 1 && (
          <div className="space-y-3">
            <div>
              <label className="text-sm">Mật khẩu hiện tại</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <div>
              <label className="text-sm">Mật khẩu mới</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <div>
              <label className="text-sm">Nhập lại mật khẩu mới</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật mật khẩu
            </Button>
          </div>
        )}
        {currentTab === 2 && (
          <div className="space-y-3">
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
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <div>
              <label className="text-sm">Xác nhận địa chỉ</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <div>
              <label className="text-sm">Mật khẩu</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Xác nhận
            </Button>
          </div>
        )}
        {currentTab === 3 && (
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="countries" className="block text-sm">
                Chọn quốc gia
              </label>
              <select
                id="countries"
                className=" border border-gray-300 text-gray-900 text-sm rounded-md  block w-full py-3 px-4 "
              >
                <option selected>Chọn quốc gia</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Địa chỉ giao hàng</label>
              <input
                className="w-full text-sm py-3 px-4 border border-gray-300   rounded-md   placeholder:font-sans placeholder:font-light placeholder:text-sm hover:outline hover:outline-black hover:outline-1"
                type="text"
              />
            </div>
            <Button className="w-full md:w-auto md:mx-auto flex justify-center items-center py-3 space-x-2 font-sans font-semibold text-sm text-white rounded-md px-9 bg-black  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border">
              Cập nhật địa chỉ
            </Button>
          </div>
        )}
      </div>
    </main>
  );
});

export default Profile;
