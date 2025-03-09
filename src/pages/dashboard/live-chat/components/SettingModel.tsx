import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "@/components/toggleSwitch";
import { useGetChatList, useUpdateChatStatus } from "@/hooks/Chats";
import { useRouter } from "next/router";

interface SettingModelProps {
  setopenModel: React.Dispatch<React.SetStateAction<boolean>>;
  chatId: string; // Add chatId to the props
}

const SettingModel: React.FC<SettingModelProps> = ({ setopenModel }) => {
  const router = useRouter();
  const { chatId } = router.query;
  const chatID = Array.isArray(chatId) ? chatId[0] : chatId || "";

  const { mutate: updateChatStatus, isPending } = useUpdateChatStatus();
  const { data: chatList, isLoading, isError } = useGetChatList({});

  const currentChat = chatList?.find((chat: any) => chat._id === chatID);
  let existingRestrictions = [];
  if (!isLoading) {
    existingRestrictions = currentChat?.restrictions || [];
  }

  const [toggleStates, setToggleStates] = useState({
    blocked: false,
    cant_message: false,
    cant_call: false,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setToggleStates({
        blocked: existingRestrictions.includes("blocked"),
        cant_message: existingRestrictions.includes("cant_message"),
        cant_call: existingRestrictions.includes("cant_call"),
      });
    }
  }, [existingRestrictions, isLoading, isError]);

  const handleToggleChange = (newState: boolean, restrictionType: string) => {
    if (!chatID) {
      console.error("No chat ID provided");
      return;
    }

    setToggleStates((prev) => ({ ...prev, [restrictionType]: newState }));

    updateChatStatus({
      chatID,
      status: restrictionType,
    });
  };

  if (isLoading) {
    return (
      <div className="absolute z-50 right-16 top-32 p-4">
        <div className="bg-white p-3 rounded-xl shadow-lg w-[350px]">
          <p className="text-center text-gray-500">Loading chat settings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="absolute z-50 right-16 top-32 p-4">
        <div className="bg-white p-3 rounded-xl shadow-lg w-[350px]">
          <p className="text-center text-red-500">
            Failed to load chat settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute z-50 right-16 top-32 p-4">
      <div className="bg-white p-3 rounded-xl shadow-lg w-[350px]">
        <div className="flex justify-end pb-2">
          <button className="text-xl" onClick={() => setopenModel(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <span className="font-medium">Block</span>
            <input
              type="checkbox"
              checked={toggleStates.blocked}
              onChange={(e) => handleToggleChange(e.target.checked, "blocked")}
            />
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <span className="font-medium">Can't Message</span>
            <input
              type="checkbox"
              checked={toggleStates.cant_message}
              onChange={(e) =>
                handleToggleChange(e.target.checked, "cant_message")
              }
            />
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-1 px-2 rounded-full">
            <span className="font-medium">Can't Call</span>
            <input
              type="checkbox"
              checked={toggleStates.cant_call}
              onChange={(e) =>
                handleToggleChange(e.target.checked, "cant_call")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModel;
