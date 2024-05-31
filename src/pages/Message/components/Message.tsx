import { formatDate } from "@utils/formatDate";
import { FC, memo } from "react";

interface MessageProps {
  isUser: boolean;
  msg: string;
  createdAt: string;
}

const Message: FC<MessageProps> = memo(
  ({ isUser, msg, createdAt }) => {
    const bgColor = isUser ? " bg-gray-200" : " bg-gray-100";
    const align = isUser ? "flex-row-reverse" : ""

    return (
      <div className={"flex items-start mx-2 " + align}>
        <div
          className={
            "rounded-[10px] w-fit p-4 font-sans text-sm font-normal text-gray-900 max-w-sm ms-2 break-all flex flex-col items-end whitespace-normal" +
            bgColor
          }
        >
          <p className=" text-gray-900 font-normal overflowWrap">{msg + ""}</p>
          <p className="font-normal text-xs">
            {formatDate("hh:MM", new Date(createdAt))}
          </p>
        </div>
      </div>
    );
  }
);

export default Message;
