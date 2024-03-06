import { FC, Fragment, memo, useState } from "react";
import DropdownSelect from "./DropdownSelect";
import TextInput from "./TextInput";

const UserManagement: FC = memo(() => {
  const [dateFilter, setDateFilter] = useState(0);
  const optionDateFilter = ["Mới nhất", "Sớm nhất"];

  const [status, setStatus] = useState(0);
  const optionStatus = ["Toàn bộ", "Bình thường", "Tạm khóa"];

  const foo = (val) => {
    console.log(val);
  };

  return (
    <Fragment>
      <h1 className="text-3xl font-bold py-3">Danh sách người dùng</h1>
      <hr style={{ borderWidth: "0.01rem" }} />
      <div className="py-3 h-4 flex flex-row w-full">
        <div className="flex basis-1/3">
          <div className="text-base">Ngày tạo:</div>
          <DropdownSelect values={optionDateFilter} setValue={setDateFilter} />
        </div>

        <div className="flex basis-1/3">
          <div className="text-base">Tình trạng:</div>
          <DropdownSelect values={optionStatus} setValue={setStatus} />
        </div>

        <TextInput
          placeholder="Nhập tên người dùng"
          ariaLabel="Fooo"
          handleEnter={foo}
        />
      </div>
    </Fragment>
  );
});

export default UserManagement;
