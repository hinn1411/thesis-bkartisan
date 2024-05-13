import { Avatar } from "@mui/material";
import { formatDate } from "@utils/formatDate";
import { FC, memo } from "react";
import { useOutletContext } from "react-router-dom";

interface ChatRoomProps {
  receiver: any;
  setReceiver: Function;
  // chatroomId: number;
  // avatar: string;
  // name: string;
  // lastMsg: string;
  // lastUpdate: string;
  // lastUser: string;   // Username của sender cuối cùng trong phòng chat
  chatroomInfo: any;
}

const Chatroom: FC<ChatRoomProps> = memo(
  ({ receiver, setReceiver, chatroomInfo }) => {
    const [user] = useOutletContext();
    let isSelected = "";
    if (receiver) {
      isSelected =
        receiver.username === chatroomInfo.username ? "bg-gray-100" : "";
    }
    const lastName =
      chatroomInfo.lastUser === user.username ? user.name : chatroomInfo.name;

    const onChangeChatroom = () => {
      if (window.document.getElementById("text-field")) {
        window.document.getElementById("text-field").value = "";
      }
      setReceiver(chatroomInfo);
    };

    const isRead =
      !chatroomInfo.isReceiverRead && chatroomInfo.lastUser !== user.username
        ? false
        : true;

    return (
      <div
        className={
          "flex items-center hover:bg-gray-100 p-1 rounded-md cursor-pointer " +
          isSelected
        }
        onClick={onChangeChatroom}
      >
        <div className="flex-shrink-0">
          <Avatar
            src={chatroomInfo.avatar}
            sx={{ width: "2.5rem", height: "2.5rem" }}
            alt={chatroomInfo.name}
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="font-medium text-gray-900 truncate dark:text-white">
            {chatroomInfo.name || "Chưa xác định"}
          </p>
          <p
            className={
              "truncate dark:text-gray-400" +
              (isRead ? " text-gray-500" : " text-black font-medium")
            }
          >
            {lastName + " : " + chatroomInfo.lastMsg}
          </p>
        </div>
        <div className="inline-flex text-base text-gray-900 dark:text-white">
          {!chatroomInfo.lastUpdate
            ? "Chưa xác định"
            : formatDate("hh:MM", new Date(chatroomInfo.lastUpdate))}
        </div>
      </div>
    );
  }
);

export default Chatroom;
