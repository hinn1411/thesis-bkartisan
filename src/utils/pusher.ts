import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: "ap1",
});