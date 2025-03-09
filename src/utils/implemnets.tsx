const startRecording = async (
  setShowRecordingContainer: any,
  mediaRecorderRef: any,
  setAudioBlob: any,
  setAudioUrl: any,
  setIsRecording: any,
  setHideInputBox: any,
  setIsPaused: any,
  setErrorMessage: any
) => {
 
  setShowRecordingContainer(true); 
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      const blob = new Blob([event.data], { type: "audio/wav" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setIsRecording(true);
    setHideInputBox(true); //to hide the input box
    setIsPaused(false);
  } catch (error) {
    console.error("Error accessing microphone:", error);
    setErrorMessage(
      "Could not access the microphone. Please check your settings."
    );
  }
};
const stopRecording = (
  mediaRecorderRef: any,
  setIsRecording: any,
  setIsPaused: any
) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsPaused(false);
  }
};

const pauseRecording = (mediaRecorderRef: any, setIsPaused: any) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.pause();
    setIsPaused(true);
  }
};

const resumeRecording = (mediaRecorderRef: any, setIsPaused: any) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.resume();
    setIsPaused(false);
  }
};

const cancelRecording = (
  setShowRecordingContainer: any,
  resetRecording: any
) => {
  setShowRecordingContainer(false);
  resetRecording();
};

const resetRecording = (
  setAudioBlob: any,
  setAudioUrl: any,
  setIsRecording: any,
  setHideInputBox: any,
  setIsPaused: any
) => {
  setAudioBlob(null);
  setAudioUrl("");
  setIsRecording(false);
  setHideInputBox(false); //to hide the input box
  setIsPaused(false);
};

const startNewRecording = (resetRecording: any, startRecording: any) => {
  resetRecording(); // Reset any previous state
  startRecording(); // Start a new recording
};

export {
  startRecording,
  resumeRecording,
  resetRecording,
  startNewRecording,
  cancelRecording,
  stopRecording,
  pauseRecording,
};
