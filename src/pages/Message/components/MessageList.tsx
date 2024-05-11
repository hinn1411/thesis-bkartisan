import apiChat from "@apis/apiChat";
import ErrorMessage from "@components/admin/ErrorMessage";
import LoadingMessage from "@components/admin/LoadingMessage";
import { useQuery } from "@tanstack/react-query";
import { FC, memo, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useOutletContext } from "react-router-dom";
import { pusherClient } from "@utils/pusher";

interface MessageListProps {
  chatroomId: any;
}

const MessageList: FC<MessageListProps> = memo(({ chatroomId }) => {
  const [user] = useOutletContext();
  const {
    data: initialMsg,
    isPending,
    error,
  } = useQuery({
    queryKey: ["messages", chatroomId],
    queryFn: async () => {
      return await apiChat.getMessages(chatroomId);
    },
    refetchOnWindowFocus: false,
  });
  const [incomingMsg, setIncomingMsg] = useState([]);
  const dummy = useRef(null);

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "instant" });
  }, [initialMsg, incomingMsg]);

  useEffect(() => {
    pusherClient.subscribe(user.username);

    pusherClient.bind("incoming-message", (message) => {
      setIncomingMsg(prev => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(user.username);
    };
  }, []);

  if (isPending) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage msg={error.message} />;
  }

  return (
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
  );
});

export default MessageList;
