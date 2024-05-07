import { Avatar } from "@mui/material";
import { formatDate } from "@utils/formatDate";
import { FC, memo } from "react";

interface ChatRoomProps {
  avatar: string;
  name: string;
  lastMsg: string;
  lastUpdate: string;
  lastUser: string;
}

const ChatRoom: FC<Partial<ChatRoomProps>> = memo(
  ({ avatar, name, lastMsg, lastUpdate, lastUser }) => {
    return (
      <div className="flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer">
        <div className="flex-shrink-0">
          <Avatar
            src={avatar}
            sx={{ width: "2.5rem", height: "2.5rem" }}
            alt={name}
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className=" font-medium text-gray-900 truncate dark:text-white">
            {name || "undefined"}
          </p>
          <p className=" text-gray-500 truncate dark:text-gray-400">
            {lastUser + " : " + lastMsg}
          </p>
        </div>
        <div className="inline-flex text-base text-gray-900 dark:text-white">
          {!lastUpdate ? "" : formatDate("dd-mm-yyyy", new Date(lastUpdate))}
        </div>
      </div>
    );
  }
);

export default ChatRoom;
