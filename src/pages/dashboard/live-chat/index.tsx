"use client";
import React, { useState, useEffect } from "react";
import ChatList from "./chatList";
import UserList from "./userList";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import MessageInput from "./components/MessageInput";
import { useSocket } from "@/contexts/socket.context";

type Message = {
  id: number;
  sender: "admin" | "user";
  text: string;
};

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatID, setChatID] = useState<string | null>();
  const router = useRouter();
  const { chatId } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (typeof chatId === "string") {
      setChatID(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    const currentUserID = localStorage.getItem("userID");

    if (!chatID || !currentUserID) {
      console.log("ChatID or UserID is missing:", chatID, currentUserID);
      return;
    }

    const fetchChatData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEN_URL}/chat/get_chat_message?chatID=${chatId}`
        );
        if (!response.ok) throw new Error("Failed to fetch chat");

        const data = await response.json();

        setMessages(
          data.data.map((msg: any, index: number) => ({
            id: msg._id,
            sender: msg.role || "admin",
            text: msg.message,
            userID: msg.userID,
            sendTime: msg.createdAt,
            type: msg.type,
            files: msg.files,
            chatID: msg.chatID,
            isSeen: msg.isSeen,
          }))
        );

        data.data.forEach((msg: any) => {
          if (msg.userID !== currentUserID && msg.isSeen === false) {
            console.log("Marking message as seen:", msg._id);
            socket?.emit("messageSeen", {
              messageID: msg._id,
              chatID: msg.chatID,
              userID: currentUserID,
            });
          }
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatID]);

  useEffect(() => {
    if (!socket) return;

    const currentUserID = localStorage.getItem("userID");

    const handleNewMessage = (data: any) => {
      console.log("Received new message:", data);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.data._id,
          sender: data.data.role,
          text: data.data.message,
          userID: data.data.senderId,
          sendTime: data.data.createdAt,
          type: data.data.type,
          files: data.data.files,
          isSeen: data.data.isSeen,
        },
      ]);
      if (data.data.senderId !== currentUserID) {
        socket.emit("messageSeen", {
          messageID: data.data._id,
          chatID: data.data.chatID,
          userID: currentUserID,
        });
      }
    };

    const handleMessageUpdated = (data: any) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === data.messageID
            ? { ...msg, isSeen: data.isSeen, seenBy: data.seenBy }
            : msg
        )
      );
    };

    const handleNewChat = (data: { data: { chatID: string } }) => {
      console.log("New chat started:", data);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageUpdated", handleMessageUpdated);
    socket.on("newChat", handleNewChat);

    return () => {
      console.log("Cleaning up socket listeners");
      socket.off("newMessage", handleNewMessage);
      socket.off("messageUpdated", handleMessageUpdated);
      socket.off("newChat", handleNewChat);
    };
  }, [socket]);

  const acceptChat = () => {
    console.log("Accepting chat");
    if (chatId && socket) {
      socket.emit("chatAccept", { chatID: chatId });
    }
  };

  const sendMessage = () => {
    console.log("called");
    if (!input.trim() && !selectedFile) {
      console.log("no file or image");
      return;
    }

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = () => {
        let fileData = reader.result;
        if (
          selectedFile.type.startsWith("image/") ||
          selectedFile.type.startsWith("audio/") ||
          selectedFile.type.startsWith("video/")
        ) {
          if (fileData instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(fileData);
            let binaryString = "";
            for (let i = 0; i < uint8Array.length; i += 1024) {
              // Convert Uint8Array to number[] using Array.from
              const chunk = Array.from(uint8Array.slice(i, i + 1024));
              binaryString += String.fromCharCode.apply(null, chunk);
            }
            fileData = `data:${selectedFile.type};base64,` + btoa(binaryString);
          }
        }

        console.log("📝 File Data Sent:", {
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
          fileBufferPreview:
            typeof fileData === "string"
              ? fileData.slice(0, 100) + "..."
              : fileData,
        });

        socket?.emit("message", {
          chatID: chatId,
          type: "file",
          message: input,
          files: [
            {
              fileName: selectedFile.name,
              fileType: selectedFile.type,
              fileBuffer: fileData,
            },
          ],
        });
        setInput("");
        setSelectedFile(null);
      };
    } else {
      console.log("yes text");
      socket?.emit("message", { chatID: chatId, type: "text", message: input });
      setInput("");
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      const fileType = file.type;
      let category = "Unknown";
      if (fileType.startsWith("video/")) {
        category = "Video";
      } else if (fileType.startsWith("audio/")) {
        category = "Audio";
      } else if (
        fileType.startsWith("application/") ||
        fileType.startsWith("text/")
      ) {
        category = "Document";
      }
    }
  };

  useEffect(() => {
    if (selectedFile) {
      sendMessage();
    }
  }, [selectedFile]);

  return (
    <div className="flex h-[82vh] flex-col md:flex-row">
      <div className="w-full md:w-[300px]  md:block hidden">
        <UserList />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 pl-1">
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ChatList messages={messages} chatId={chatId || null} />
          )}
        </div>
        <MessageInput
          sendMessage={sendMessage}
          handleFileChange={handleFileChange}
          setInput={setInput}
          input={input}
          selectedFile={setSelectedFile}
        />
      </div>
    </div>
  );
};

export default LiveChat;
