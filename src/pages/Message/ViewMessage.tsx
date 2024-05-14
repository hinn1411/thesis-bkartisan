import { FC, memo, useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiChat from "@apis/apiChat";
import LoadingMessage from "@components/admin/LoadingMessage";
import ErrorMessage from "@components/admin/ErrorMessage";
import ChatroomList from "./components/ChatroomList";
import MessageField from "./components/MessageField";
import { pusherClient } from "@utils/pusher";

const ViewMessage: FC = memo(() => {
  //const { user, isPending: isLoadingUser, isAuthenticated } = useUserProfile();
  const state = useLocation().state;
  const [user] = useOutletContext();

  /**
   * receiver:
   * {
   *  chatroomId?: int,
   *  avatar: string,
   *  name: string,
   *  username: string,
   * }
   */

  const [receiver, setReceiver] = useState(state);

  const {
    data,
    isPending: isFetchingChatrooms,
    error,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      const res = await apiChat.getChatrooms();
      return res;
    },
    refetchOnWindowFocus: false,
  });

  const [chatrooms, setChatrooms] = useState(null);
  const [newMessage, setNewMessage] = useState();

  useEffect(() => {
    pusherClient.subscribe(user.username);

    pusherClient.bind("incoming-message", (message) => {
      setNewMessage(message);
    });

    return () => {
      pusherClient.unsubscribe(user.username);
    };
  }, []);

  useEffect(() => {
    // Vì một lí do nào đó data useQuery fetch chưa về lại là []
    if (data) {
      setChatrooms(data);
    }
  }, [data]);

  if (isFetchingChatrooms || chatrooms == null) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage msg={error.message} />;
  }

  return (
    <div
      className="grid grid-cols-2"
      style={{ gridTemplateColumns: "30% 70%" }}
    >
      <ChatroomList
        chatrooms={chatrooms}
        setChatrooms={setChatrooms}
        setReceiver={setReceiver}
        receiver={receiver}
        newMessage={newMessage}
      />
      {receiver && (
        <MessageField
          receiver={receiver}
          setReceiver={setReceiver}
          chatrooms={chatrooms}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      )}
    </div>
  );
});

export default ViewMessage;
