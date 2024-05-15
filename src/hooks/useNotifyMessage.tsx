import apiChat from "@apis/apiChat";
import { useQuery } from "@tanstack/react-query";
import { pusherClient } from "@utils/pusher";
import { useEffect, useState } from "react";

export const useNotifyMessage = (username) => {
    const [newMessage, setNewMessage] = useState([]);

    const { data } = useQuery({
      queryKey: ["check-new-messages"],
      queryFn: async () => {
        return await apiChat.checkNewMessage();
      },
      refetchOnWindowFocus: false,
    });

    useEffect(() => {
      pusherClient.subscribe(username);

      const handleMessage = (message) => {
        const pathname = window.location.href;
        const regexPath = new RegExp("message");
        if (!regexPath.test(pathname)) {
          let newValue = { chatroomId: message.room };
          newMessage.forEach((element) => {
            if (element.chatroomId === message.room) {
              newValue = undefined;
            }
          });
          if (newValue != undefined) setNewMessage([...newMessage, newValue]);
        }
      };

      pusherClient.bind("incoming-message", handleMessage);

      return () => {
        pusherClient.unsubscribe(username);
      };
    }, []);

    useEffect(() => {
      const pathname = window.location.href;
      const regexPath = new RegExp("message");
      if (!regexPath.test(pathname) && data) {
        const newArray = [...newMessage, ...data];
        setNewMessage(newArray);
      }
    }, [data]);

    return {
        newMessage,
        setNewMessage,
    }
}