import { FC, memo } from "react";
import { useRouteError, useSearchParams } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { formatDate } from "@utils/formatDate";

const Error: FC = memo(() => {
  const error = useRouteError();
  const lockResponseError = error?.response?.data?.lockResponse;

  const [searchParams, setSearchParams] = useSearchParams();
  const lockResponseString = searchParams.get("lockResponse");

  if (lockResponseString || lockResponseError) {
    let lockResponse;
    if (lockResponseString) {
      const decodedString = decodeURIComponent(lockResponseString);
      lockResponse = JSON.parse(decodedString);
    }
    else {
      lockResponse = lockResponseError;
    }

    return (
      <div className="flex space-y-3 flex-col justify-center items-center w-full h-screen">
        <CiLock size={150} color="#f97316" />
        <div className="text-4xl font-bold text-orange-400">TẠM KHÓA</div>
        <div className="text-lg text-orange-400">
          Tài khoản bạn hiện đang tạm khóa đến ngày{" "}
          {formatDate("dd/mm/yyyy", new Date(lockResponse.lockTime))}.
        </div>
        <div className="text-lg text-orange-400">
          Nếu bạn có khiếu nại gì xin vui lòng gửi email tới {lockResponse.email}.
        </div>
        <div className="text-lg text-orange-400">
          <span className="font-bold">Lí do khóa tài khoản:</span> {lockResponse.response}.
        </div>
      </div>
    );
  }

  return <div>Error Page</div>;
});

export default Error;
