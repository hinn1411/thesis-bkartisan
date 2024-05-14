import { FC, memo, useEffect, useState } from "react";
import Chatroom from "./Chatroom";
import { useOutletContext } from "react-router-dom";

interface ChatroomListProp {
  chatrooms: any;
  setChatrooms: Function;
  setReceiver: Function;
  receiver: any;
  newMessage: any;
}

const ChatroomList: FC<ChatroomListProp> = memo(
  ({ chatrooms, setChatrooms, receiver, setReceiver, newMessage }) => {
    const [user] = useOutletContext();
    const [reg, setReg] = useState(new RegExp(``));
    const [searchTerm, setSearchTerm] = useState("");

    const onSearch = (event) => {
      event.preventDefault();
      const newReg = new RegExp(`${searchTerm}`);
      setReg(newReg);
    };

    const onChangeValue = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
    };

    useEffect(() => {
      if (newMessage) {
        const newChatroom = {
          avatar: newMessage.senderAvatar,
          chatroomId: newMessage.room,
          isReceiverRead: false,
          lastMsg: newMessage.content,
          lastUpdate: newMessage.createdAt,
          lastUser: newMessage.sender,
          name: newMessage.senderName,
          username: newMessage.sender,
        };

        // Tìm xem trong chatrooms đã có chatroom với người này chưa và xóa nó
        let index = chatrooms.findIndex(
          (chatroom) => chatroom.chatroomId === newMessage.room
        );
        if (index !== -1) {
          newChatroom.avatar = chatrooms[index].avatar;
          newChatroom.name = chatrooms[index].name;
          newChatroom.username = chatrooms[index].username;
          chatrooms.splice(index, 1);
        }
        const newChatrooms = [newChatroom, ...chatrooms];
        setChatrooms(newChatrooms);
      }
    }, [newMessage])

    return (
      <div className="border-r-2 pr-1">
        {/**Thanh tìm kiếm */}
        <div className="max-w-lg mx-auto">
          <div className="flex">
            <div className="relative w-full m-2">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-orange-500 focus:border-orange-500 "
                placeholder="Tìm kiếm..."
                onChange={onChangeValue}
                required
              />
              <button
                type="button"
                className=" absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-600 rounded-e-2xl border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300"
                onClick={onSearch}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[79vh] min-h-[79vh]">
          {/**Danh sách Chat Room */}
          {chatrooms
            .filter((chatroom) => reg.test(chatroom.name))
            .map((chatroom) => {
              return (
                <Chatroom
                  key={chatroom.lastUpdate}
                  receiver={receiver}
                  setReceiver={setReceiver}
                  chatroomInfo={chatroom}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

export default ChatroomList;
