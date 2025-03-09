import React, { memo, useState, useCallback, useEffect } from "react";
import { FaStop, FaPause, FaPlay, FaTrash } from "react-icons/fa";
const AudioRecorder = memo(
  ({
    isRecording,
    isPaused,
    resumeRecording,
    pauseRecording,
    stopRecording,
    audioUrl,
    audioBlob,
    cancelRecording,
    resetRecording,
    setSelectedFile,
    sendMessage,
  }: any) => {
    const [isUploading, setIsUploading] = useState(false);
    const handleSendAudio = useCallback(() => {
      if (!audioBlob) {
        resetRecording();
        return;
      }
      const audioFile = new File([audioBlob], `voice_${Date.now()}.wav`, {
        type: "audio/wav",
      });

      setSelectedFile(audioFile);
      resetRecording();
      // sendMessage();
    }, [audioBlob, sendMessage, setSelectedFile]);

    return (
      <div className="recorder-container">
        {isRecording ? (
          <div className="recording-indicator">
            <span className="recording-animation">Recording...</span>
            <button
              onClick={isPaused ? resumeRecording : pauseRecording}
              className="audio-button startResume"
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>
            <button
              onClick={stopRecording}
              className="audio-button"
              style={{ color: "#861c23dc" }}
            >
              <FaStop />
            </button>
          </div>
        ) : (
          <>
            <div className="recordingCheck">
              <div className="recordingPlayer">
                {audioUrl && <audio controls src={audioUrl} />}
              </div>
              <div className="sendButtons">
                <button
                  onClick={handleSendAudio}
                  className="audio-button sendRecording"
                  disabled={!audioBlob || isUploading} // Disable while uploading
                >
                  Send
                </button>
                <button
                  onClick={cancelRecording}
                  className="audio-button"
                  style={{ color: "#861c23dc" }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default AudioRecorder;
