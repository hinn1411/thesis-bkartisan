import { axiosClient } from './axiosClient';

const apiChat = {
  getChatrooms: async () => {
    const { data } = await axiosClient.get("/chatrooms");
    return data;
  },
  getMessages: async (chatroomId) => {
    const { data } = await axiosClient.get(`/messages/${chatroomId}`);
    return data;
  },
  sendMessage: async (message) => {
    const { data } = await axiosClient.post(`/messages`, message);
    return data;
  },
  checkNewMessage: async () => {
    const { data } = await axiosClient.get(`/check-new-messages`);
    return data;
  },
  read: async (chatroomId) => {
    const { data } = await axiosClient.patch(`/chatrooms/${chatroomId}/read`);
    return data;
  }
};

export default apiChat;
