import {
  faEllipsisV,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import SettingModel from "./components/SettingModel";
import ForwardModel from "./components/Forward";
import CallModal from "./components/CallingUI";
import Message from "./components/Message";
import { useSocket } from "@/contexts/socket.context";
import { useRouter } from "next/router";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  userID: string;
};

const ChatList = ({ messages, chatId }: { messages: any; chatId: any }) => {
  const [currentUserID, setCurrentUserID] = useState<string | any>(null);
  const [forwardModel, setopenForwardModel] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [callModel, setOpenCallModel] = useState(false);
  const [status, setStatus] = useState("idle");
  const [callingTime, setCallingTime] = useState("00:00");
  const [incomingCall, setIncomingCall] = useState<{
    from: string;
    chatId: string;
  } | null>(null);
  const [toUserId, setToUserId] = useState("67b3dbb06930d840bdec33cf");
  const [user, setUserData] = useState<any>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const userID = localStorage.getItem("userID");
    setCurrentUserID(userID);

    const handleIncomingCall = ({
      from,
      chatId,
    }: {
      from: string;
      chatId: string;
    }) => {
      console.log("Incoming call from:", from);
      setIncomingCall({ from, chatId });
      setOpenCallModel(true);
      setStatus("incoming");
    };

    const handleCallEnded = () => {
      console.log("Call ended.");
      endCall();
    };

    socket.on("incomingCall", handleIncomingCall);
    socket.on("callEnded", handleCallEnded);

    return () => {
      socket.off("incomingCall", handleIncomingCall);
      socket.off("callEnded", handleCallEnded);
    };
  }, [socket]);

  const startCall = async () => {
    console.log("Calling user:", toUserId);
    setOpenCallModel(true);
    setStatus("calling");

    socket?.emit("callRequest", { chatId, toUserId });

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("webrtcCandidate", {
          toUserId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      console.log("Receiving remote track:", event.streams[0]);
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStreamRef.current = stream;
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    peerConnectionRef.current = peerConnection;
  };

  const acceptCall = async () => {
    if (!incomingCall) return;
    console.log("Call accepted from:", incomingCall.from);
    setStatus("connected");

    socket?.emit("callAccept", {
      chatId: incomingCall.chatId,
      toUserId: incomingCall.from,
    });

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("webrtcCandidate", {
          toUserId: incomingCall.from,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      console.log("Receiving remote track:", event.streams[0]);
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStreamRef.current = stream;
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));

    peerConnectionRef.current = peerConnection;
    setIncomingCall(null);
  };

  const rejectCall = () => {
    if (!incomingCall) return;
    console.log("Call rejected from:", incomingCall.from);
    socket?.emit("callReject", {
      chatId: incomingCall.chatId,
      toUserId: incomingCall.from,
    });

    setIncomingCall(null);
    setOpenCallModel(false);
    setStatus("idle");
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    setIncomingCall(null);
    setOpenCallModel(false);
    setStatus("idle");
    socket?.emit("callEnd", { chatId, toUserId });
  };
  const router = useRouter();
  const { userId } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEN_URL}/user/retrive/personalinfo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: userId }),
          }
        );

        const data = await response.json();

        if (isMounted) {
          setUserData(data);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <>
      <div className="flex justify-between items-center bg-white py-1 px-2">
        <div className="flex gap-2 items-center">
          <Image
            src={`${user?.data?.profilePhoto || "/user.png"}`}
            height={50}
            width={50}
            alt="Profile"
          />
          <h3 className="font-bold ml-0.5">
            {user?.data?.fullname || "Unknow user"}
          </h3>
        </div>
        <div className="flex">
          <button type="button" className="p-2 m-1 text-xl" onClick={startCall}>
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button
            type="button"
            className="p-2 m-1 text-xl"
            onClick={() => setopenForwardModel(true)}
          >
            <FontAwesomeIcon icon={faShare} />
          </button>
          <button
            type="button"
            className="p-2 m-1 text-xl"
            onClick={() => setOpenModel(true)}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 h-[64vh] overflow-auto p-4 space-y-3 rounded-lg shadow-inner">
          {messages.map((message: any, index: number) => (
            <Message
              key={index}
              message={message}
              currentUserID={currentUserID}
            />
          ))}
        </div>
      </div>
      {openModel && (
        <SettingModel setopenModel={setOpenModel} chatId={chatId} />
      )}
      {forwardModel && (
        <ForwardModel setopenForwardModel={setopenForwardModel} />
      )}
      {callModel && (
        <CallModal
          status={status}
          userName="John Doe"
          userProfession="ppp"
          onToggleMic={() => this}
          onToggleSpeaker={() => this}
          onStartCall={() => console.log("")}
          userImage="/user.png"
          callingTime={callingTime}
          onAcceptCall={acceptCall}
          onRejectCall={rejectCall}
          onEndCall={endCall}
        />
      )}
    </>
  );
};

export default ChatList;
