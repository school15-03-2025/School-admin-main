import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import AudioRecorder from "./AudioRecorder";
import {
  startRecording,
  resumeRecording,
  pauseRecording,
  stopRecording,
  startNewRecording,
  cancelRecording,
  resetRecording,
} from "../../../../utils/implemnets";

function MessageInput({
  handleFileChange,
  setInput,
  sendMessage,
  input,
  setSelectedFile,
}: any) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showRecordingContainer, setShowRecordingContainer] = useState(false);
  const [hideInput, setHideInputBox] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const resetTheRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current = null;
    }
    resetRecording(
      setAudioBlob,
      setAudioUrl,
      setIsRecording,
      setHideInputBox,
      setIsPaused
    );
    setShowRecordingContainer(false);
  };

  return (
    <>
      {!hideInput && (
        <div className="flex items-center">
          <label className="p-2 px-3 ml-2 text-gray-600 cursor-pointer">
            <input
              type="file"
              accept="audio/*,video/*,image/*,.pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
            <FontAwesomeIcon icon={faPaperclip} />
          </label>
          <button
            className="p-2 px-3 ml-2 text-gray-600"
            onClick={() =>
              startRecording(
                setShowRecordingContainer,
                mediaRecorderRef,
                setAudioBlob,
                setAudioUrl,
                setIsRecording,
                setHideInputBox,
                setIsPaused,
                setErrorMessage
              )
            }
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>

          <input
            type="text"
            className="flex-1 py-2 px-4 border rounded-full outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="p-2 px-3 ml-2 text-white bg-blue-500 rounded-full"
            onClick={sendMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}

      {showRecordingContainer && (
        <AudioRecorder
          isRecording={isRecording}
          isPaused={isPaused}
          resumeRecording={() => resumeRecording(mediaRecorderRef, setIsPaused)}
          pauseRecording={() => pauseRecording(mediaRecorderRef, setIsPaused)}
          stopRecording={() =>
            stopRecording(mediaRecorderRef, setIsRecording, setIsPaused)
          }
          audioUrl={audioUrl}
          audioBlob={audioBlob}
          startNewRecording={() =>
            startNewRecording(resetRecording, startRecording)
          }
          cancelRecording={() =>
            cancelRecording(setShowRecordingContainer, resetTheRecording)
          }
          errorMessage={errorMessage}
          startRecording={() =>
            startRecording(
              setShowRecordingContainer,
              mediaRecorderRef,
              setAudioBlob,
              setAudioUrl,
              setIsRecording,
              setHideInputBox,
              setIsPaused,
              setErrorMessage
            )
          }
          resetRecording={resetTheRecording}
          setSelectedFile={setSelectedFile}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
}

export default MessageInput;
