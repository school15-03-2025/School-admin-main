import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMicrophone,
  faVolumeUp,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface CallModalProps {
  status: string;
  userName: string;
  userProfession: string;
  userImage: string;
  callingTime: string;
  onEndCall: () => void;
  onToggleMic: () => void;
  onToggleSpeaker: () => void;
  onStartCall: () => void;
  onAcceptCall: () => void; // Added prop for Accept Call
  onRejectCall: () => void; // Added prop for Reject Call
}

const CallModal: React.FC<CallModalProps> = ({
  status,
  userName,
  userProfession,
  userImage,
  callingTime,
  onEndCall,
  onToggleMic,
  onToggleSpeaker,
  onStartCall,
  onAcceptCall,
  onRejectCall,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const toggleMic = () => {
    setIsMuted(!isMuted);
    onToggleMic();
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    onToggleSpeaker();
  };

  useEffect(() => {
    console.log(`Call status: ${status}`);
  }, [status]);

  return (
    <div className="absolute z-50 top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-8 w-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center pb-6">
        <div className="text-sm font-semibold">
          {status === "calling"
            ? "Calling..."
            : status === "incoming"
            ? "Incoming Call..."
            : status === "connected"
            ? "Call Connected"
            : "Call Ended"}
        </div>
        {status === "connected" && (
          <button
            className="text-white bg-gray-800 px-2 h-8 w-8 rounded-full transition"
            onClick={onEndCall}
          >
            <FontAwesomeIcon icon={faPhone} size="sm" />
          </button>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Image
          src={userImage}
          alt="User Image"
          width={100}
          height={100}
          className="rounded-full border-2 border-gray-300 shadow-sm"
        />
        <div className="text-center">
          <div className="text-xl font-semibold">{userName}</div>
          {status !== "incoming" && (
            <div className="text-sm text-gray-600">{userProfession}</div>
          )}
        </div>
        {status !== "incoming" && (
          <div className="text-sm text-gray-500">{callingTime}</div>
        )}
      </div>

      <div className="flex justify-center gap-4 items-center">
        {status === "incoming" ? (
          <>
            <button
              onClick={onAcceptCall}
              className="p-2 w-10 h-10 rounded-full bg-green-500 text-white flex justify-center items-center shadow-lg hover:bg-green-600 transition"
            >
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </button>
            <button
              onClick={onRejectCall}
              className="p-2 w-10 h-10 rounded-full bg-red-500 text-white flex justify-center items-center shadow-lg hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faPhoneFlip} size="lg" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleMic}
              className={`p-2 w-10 h-10 rounded-full ${
                isMuted ? "bg-gray-400" : "bg-blue-500"
              } text-white flex justify-center items-center shadow-lg hover:bg-blue-600 transition`}
            >
              <FontAwesomeIcon icon={faMicrophone} size="lg" />
            </button>
            <button
              onClick={onEndCall}
              className="p-2 w-10 h-10 rounded-full bg-red-500 text-white flex justify-center items-center shadow-lg hover:bg-red-600 transition"
            >
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </button>
            <button
              onClick={toggleSpeaker}
              className={`p-2 w-10 h-10 rounded-full ${
                isSpeakerOn ? "bg-green-500" : "bg-gray-400"
              } text-white flex justify-center items-center shadow-lg hover:bg-green-600 transition`}
            >
              <FontAwesomeIcon icon={faVolumeUp} size="lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CallModal;
