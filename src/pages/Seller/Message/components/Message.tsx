import { Avatar } from "@mui/material";
import { formatDate } from "@utils/formatDate";
import { FC, memo } from "react";

interface MessageProps {
  sender: string;
  msg: string;
  createdDate: string;
}

const Message: FC<Partial<MessageProps>> = memo(
  ({ sender, msg, createdDate }) => {
    return (
      <div className="flex items-start mx-2 ">
        <div className="rounded-md p-1 max-w-sm ms-2 flex flex-col items-end bg-blue-100 whitespace-normal">
          <p className=" text-gray-900 overflowWrap">{msg}</p>
          <p>{formatDate("dd-mm-yyyy", new Date(createdDate))}</p>
        </div>
      </div>
    );
  }
);

export default Message;
