import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEN_URL || "";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    const authToken = localStorage.getItem("authToken");
    socket = io(SOCKET_URL, {
      query: { authToken },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return socket;
};
