import apiChat from "@apis/apiChat";
import { Avatar } from "@mui/material";
import { FC, memo, useRef } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import MessageList from "./MessageList";
import { useOutletContext } from "react-router-dom";

interface MessageFieldProps {
  receiver: any;
  chatrooms: any;
}

const MessageField: FC<MessageFieldProps> = memo(({ receiver, chatrooms }) => {
  const [user] = useOutletContext();

  if (!receiver.chatroomId) {
    chatrooms.forEach((chatroom) => {
      if (receiver.username === chatroom.username)
        receiver.chatroomId = chatroom.chatroomId;
    });
  }

  const inputRef = useRef(null);

  const onSend = async () => {
    const text = inputRef.current.value;
    if (text != undefined && text != "") {
      const message = {
        sender: user.username,
        receiver: receiver.username,
        content: text,
        chatroomId: receiver.chatroomId,
      };
      console.log(message);
      const res = await apiChat.sendMessage(message);
      window.document.getElementById("text-field").value = "";
    }
  };

  return (
    <div>
      {/**Header của field */}
      <div className="flex my-2 justify-between border-b-1 shadow-sm pb-2">
        <div className="flex space-x-2 items-center px-2">
          <Avatar
            src={receiver.avatar}
            sx={{ width: "2rem", height: "2rem" }}
            alt={receiver.name}
          />
          <p className=" font-medium text-gray-900 truncate dark:text-white">
            {receiver.name}
          </p>
        </div>
        {/* <div className='flex items-center space-x-2  drop-shadow-lg border  w-25 px-3 rounded-xl text-gray-500  hover:bg-gray-200'>
                <PiTrashLight className = 'w-5 h-5'/>
                <p className='pr-4'>Xóa</p>
              </div> */}
      </div>

      {/**Nội dung tin nhắn */}
      <div className="relative my-3 overflow-y-auto no-scrollbar max-h-[72vh] min-h-[72vh] flex flex-col space-y-2">
        {receiver.chatroomId && 
          <MessageList chatroomId={receiver.chatroomId} />
        }
      </div>
      {/**Message Input Field */}
      <div className="relative w-full mx-2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3">
          <AiOutlinePaperClip className="h-5 w-5 cursor-pointer" />
        </div>
        <input
          type="text"
          id="text-field"
          className="bg-gray-50 border focus:border-none focus:ring-gray-300 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full max-w-90 ps-10 p-2.5 "
          style={{ whiteSpace: "pre-wrap" }}
          defaultValue=""
          ref={inputRef}
          placeholder="Nội dung..."
          required
        />
        <button
          type="button"
          onClick={onSend}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BiSolidSend className="h-5 w-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
});

export default MessageField;
