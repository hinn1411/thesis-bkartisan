import { FC, memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserProfile } from "@hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";
import apiChat from "@apis/apiChat";
import LoadingMessage from "@components/admin/LoadingMessage";
import ErrorMessage from "@components/admin/ErrorMessage";
import ChatroomList from "./components/ChatroomList";
import MessageField from "./components/MessageField";

const ViewMessage: FC = memo(() => {
  //const { user, isPending: isLoadingUser, isAuthenticated } = useUserProfile();
  const state = useLocation().state;

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

  useEffect(() => {
    // Vì một lí do nào đó data useQuery fetch chưa về lại là []
    if (data) {
      setChatrooms(data);
    }
  }, [data])

  if (isFetchingChatrooms || (chatrooms == null)) {
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
      />
      {receiver && <MessageField receiver={receiver} chatrooms={chatrooms} />}
    </div>
  );
});

export default ViewMessage;
