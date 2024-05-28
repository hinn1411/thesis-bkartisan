import apiChat from "@apis/apiChat";
import { Avatar } from "@mui/material";
import { FC, memo, useEffect, useRef, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import { useOutletContext } from "react-router-dom";
import LoadingMessage from "@components/admin/LoadingMessage";
import ErrorMessage from "@components/admin/ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import Message from "./Message";
import { toast } from "react-toastify";

interface MessageFieldProps {
  receiver: any;
  chatrooms: any;
  newMessage: any;
  setNewMessage: Function;
  setReceiver: Function;
}

const MessageField: FC<MessageFieldProps> = memo(
  ({ receiver, chatrooms, newMessage, setNewMessage, setReceiver }) => {
    const inputRef = useRef(null);
    const messagesRef = useRef(null);

    const scrollToBottom = () => {
      if (messagesRef.current != null) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    const [user] = useOutletContext();

    if (!receiver.chatroomId) {
      chatrooms.forEach((chatroom) => {
        if (receiver.username === chatroom.username)
          receiver.chatroomId = chatroom.chatroomId;
      });
    }

    const { mutate, isPending: isSending } = useMutation({
      mutationFn: async (values) => {
        const resultMessage = await apiChat.sendMessage(values);
        return resultMessage;
      },
      onSuccess: (message) => {
        window.document.getElementById("text-field").value = "";
        if (receiver.chatroomId) {
          setNewMessage(message);
        } else {
          setReceiver((prev) => {
            return { chatroomId: message.room, ...prev };
          });
        }
      },
      onError: () => {
        toast.error("Đã có lỗi xảy ra! Vui lòng thử lại.");
      },
    });

    const onSend = async () => {
      const text = inputRef.current.value;
      if (text != undefined && text != "") {
        const message = {
          sender: user.username,
          receiver: receiver.username,
          content: text,
          chatroomId: receiver.chatroomId,
        };
        mutate(message);
      }
    };

    const {
      data: initialMsg,
      isPending,
      error,
    } = useQuery({
      queryKey: ["messages", receiver.chatroomId],
      queryFn: async () => {
        if (receiver.chatroomId) {
          return await apiChat.getMessages(receiver.chatroomId);
        }
        return [];
      },
      refetchOnWindowFocus: false,
    });
    const [incomingMsg, setIncomingMsg] = useState([]);
    const dummy = useRef(null);

    const foo = () => {
      console.log(messagesRef.current);
      if (messagesRef.current) {
        console.log(
          messagesRef.current.scrollTop,
          messagesRef.current.clientHeight,
          messagesRef.current.scrollHeight
        );
      }
    };

    useEffect(() => {
      if (messagesRef.current) {
        if (incomingMsg.length === 0) {
          scrollToBottom();
        } else {
          const shouldScroll =
            messagesRef.current.scrollTop + messages.clientHeight + 387 >=
            messagesRef.current.scrollHeight;
          // dummy.current?.scrollIntoView(r{ behavior: "smooth" });
          if (shouldScroll) {
            scrollToBottom();
          }
        }
      }
    }, [initialMsg, incomingMsg]);

    useEffect(() => {
      if (
        newMessage &&
        (receiver.username === newMessage.sender ||
          user.username === newMessage.sender)
      ) {
        setIncomingMsg((prev) => [...prev, newMessage]);
      }
    }, [newMessage]);

    useEffect(() => {
      setIncomingMsg([]);
      return () => {
        if (receiver.chatroomId) {
          apiChat.read(receiver.chatroomId);
        }
      };
    }, [receiver]);

    useEffect(() => {
      const input = document.getElementById("text-field");
      let handleKeyPress;
      if (input) {
        handleKeyPress = (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("send-msg-btn").click();
          }
        };

        input.addEventListener("keypress", handleKeyPress);
      }

      return () => {
        if (input) {
          input.removeEventListener("keypress", handleKeyPress);
        }
      };
    }, [isPending, error]);

    if (isPending) {
      return <LoadingMessage />;
    }

    if (error) {
      return <ErrorMessage msg={error.message} />;
    }

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
        <div
          onScroll={foo}
          id="messages"
          ref={messagesRef}
          className="relative my-3 overflow-y-auto no-scrollbar max-h-[72vh] min-h-[72vh] flex flex-col space-y-2"
        >
          {receiver.chatroomId && (
            <>
              {initialMsg.map((message) => (
                <Message
                  key={message.msgId}
                  isUser={message.sender === user?.username}
                  msg={message.content}
                  createdAt={message.createdAt}
                />
              ))}
              {incomingMsg.map((message) => (
                <Message
                  key={message.msgId}
                  isUser={message.sender === user?.username}
                  msg={message.content}
                  createdAt={message.createdAt}
                />
              ))}
              <div ref={dummy} />
            </>
          )}
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
            disabled={isSending}
            required
          />
          <button
            type="button"
            id="send-msg-btn"
            onClick={onSend}
            className="absolute inset-y-0 end-0 flex items-center pe-3"
            disabled={isSending}
          >
            <BiSolidSend className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      </div>
    );
  }
);

export default MessageField;
