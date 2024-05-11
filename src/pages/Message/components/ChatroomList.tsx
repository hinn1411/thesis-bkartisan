import { FC, memo, useState } from "react";
import Chatroom from "./Chatroom";

interface ChatroomListProp {
  chatrooms: any;
  setReceiver: Function;
  receiver: number,
}

const ChatroomList: FC<ChatroomListProp> = memo(
  ({ chatrooms, receiver, setReceiver }) => {
    const [chatroom, setChatroom] = useState("");
    const [currentChatroom, setCurrentChatroom] = useState(chatrooms);

    const onSearch = (event) => {
      event.preventDefault();
      const reg = new RegExp(`${chatroom}`);
      const matchedChatrooms = chatrooms.filter((chatroom) =>
        reg.test(chatroom.name)
      );
      setCurrentChatroom(matchedChatrooms);
    };

    const onChangeValue = (event) => {
      const value = event.target.value;
      setChatroom(value);
    };

    //const [selectedChat, setSelectedChat] = useState();

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
          {currentChatroom.map((chatroom) => {
            return (
              <Chatroom
                key={chatroom.chatroomId}
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
