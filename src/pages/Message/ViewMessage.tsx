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
    data: chatrooms,
    isPending: isFetchingChatrooms,
    error,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: async () => {
      return await apiChat.getChatrooms();
    },
    refetchOnWindowFocus: false,
  });

  if (isFetchingChatrooms) {
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
        setReceiver={setReceiver}
        receiver={receiver}
      />
      {receiver && <MessageField receiver={receiver} chatrooms={chatrooms} />}
    </div>
  );
});

export default ViewMessage;
