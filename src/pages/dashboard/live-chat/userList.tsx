import { useEffect, useState } from "react";
import { useGetChatList, useGetSingleAdmin } from "@/hooks/Chats";
import { useRouter } from "next/router";
import { useSocket } from "@/contexts/socket.context";
import Image from "next/image";
import Loader from "@/components/Loader";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";

const UserList: React.FC = () => {
  const { data: chatList, isLoading, isError, error } = useGetChatList({});
  const {
    data: admin,
    isLoading: loadingAdmin,
    isError: adminError,
    error: amdinErrorMessage,
  } = useGetSingleAdmin();
  const [chats, setChats] = useState<Array<any>>([]);
  const [filteredChats, setFilteredChats] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    if (Array.isArray(chatList)) {
      const sortedChats = chatList.sort(
        (a, b) =>
          new Date(b.lastMessageTime || b.createdAt).getTime() -
          new Date(a.lastMessageTime || a.createdAt).getTime()
      );
      setChats(sortedChats);
      setFilteredChats(sortedChats);
    }
  }, [chatList]);

  useEffect(() => {
    if (!socket) return;

    const handleChatListUpdate = (updatedChat: any) => {
      setChats((prevChats) => {
        const chatExists = prevChats.some(
          (chat) => chat._id === updatedChat._id
        );

        const updatedChats = chatExists
          ? prevChats.map((chat) =>
              chat._id === updatedChat._id
                ? {
                    ...chat,
                    lastMessage: updatedChat.lastMessage,
                    lastMessageTime: updatedChat.lastMessageTime,
                  }
                : chat
            )
          : [updatedChat, ...prevChats];

        return updatedChats.sort(
          (a, b) =>
            new Date(b.lastMessageTime || b.createdAt).getTime() -
            new Date(a.lastMessageTime || a.createdAt).getTime()
        );
      });
    };

    socket.on("chatListUpdate", handleChatListUpdate);

    return () => {
      socket.off("chatListUpdate", handleChatListUpdate);
    };
  }, [socket]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter((chat) =>
        chat.userID?.fullname?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [search, chats]);

  const navigateToChat = (chatId: number, userId: number) => {
    router.push(
      `/dashboard/live-chat?chatId=${chatId}&userId=${userId}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="w-72 bg-white p-3 ">
      <div className="flex justify-between items-center">
        {loadingAdmin ? (
          <Loader />
        ) : adminError ? (
          <div className="flex gap-2 items-center mx-5">
            <Image
              src={"/user.png"}
              height={50}
              width={50}
              alt={"Profile"}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold ml-0.5">David Peter</h3>
              <p className="text-xs ml-0.5">admin</p>
            </div>
          </div>
        ) : admin ? (
          <div className="flex gap-2 items-center mx-5">
            <Image
              src={
                `${process.env.NEXT_PUBLIC_BACKEN_URL}/uploads/${admin?.photo}` ||
                "/user.png"
              }
              height={50}
              width={50}
              alt={admin?.name || "Profile"}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold ml-0.5">{admin?.name || "N/A"}</h3>
              <p className="text-xs ml-0.5">
                {admin?.username || "No Role Assigned"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No admin data available</p>
        )}

        <div className="flex flex-col gap-3">
          <FontAwesomeIcon icon={faEdit} />
        </div>
      </div>

      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 my-4 border outline-none border-gray-300 rounded-lg"
      />

      <hr className="my-4" />

      <ul className="space-y-3 h-[58vh] overflow-y-auto">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p className="text-center text-red-500">
            Error: {error?.message || "Failed to load chats"}
          </p>
        ) : filteredChats.length > 0 ? (
          filteredChats.map((chat: any) => {
            const user = chat.userID || {};
            return (
              <li
                key={chat._id}
                className="flex gap-2 items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigateToChat(chat._id, chat.userID?._id)}
              >
                <Image
                  src={user.profilePhoto || "/user.png"}
                  height={50}
                  width={50}
                  alt={user.fullname || "User"}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {user.fullname || "Unknown user"}
                  </p>
                  <div className="flex w-full justify-between">
                    <p className="text-xs text-gray-700">
                      {chat.lastMessage || "Start Chat"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {chat.lastMessageTime
                        ? format(new Date(chat.lastMessageTime), "p")
                        : ""}
                    </p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No chats available</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
