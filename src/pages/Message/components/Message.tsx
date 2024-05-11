import { formatDate } from "@utils/formatDate";
import { FC, memo } from "react";

interface MessageProps {
  isUser: boolean;
  msg: string;
  createdAt: string;
}

const Message: FC<MessageProps> = memo(
  ({ isUser, msg, createdAt }) => {
    const bgColor = isUser ? " bg-green-100" : " bg-blue-100";
    const align = isUser ? "flex-row-reverse" : ""

    return (
      <div className={"flex items-start mx-2 " + align}>
        <div className={"rounded-md min-w-[10vw] p-1 max-w-sm ms-2 break-all flex flex-col items-end whitespace-normal" + bgColor}>
          <p className=" text-gray-900 overflowWrap">{msg + ""}</p>
          <p className="font-light text-sm">{formatDate("hh:MM", new Date(createdAt))}</p>
        </div>
      </div>
    );
  }
);

export default Message;
