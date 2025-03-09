import {
  FaFileAlt,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import { format } from "date-fns";

const Message = ({
  message,
  currentUserID,
}: {
  message: any;
  currentUserID: string;
}) => {
  const isSentByCurrentUser = message.userID === currentUserID;

  const getFileContent = (file: any) => {
    if (file.fileType.startsWith("image/")) {
      return (
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEN_URL}${file.filePath}`}
          alt={file.filename}
          className="w-80 h-auto rounded-md"
        />
      );
    }
    if (file.fileType.startsWith("audio/")) {
      return (
        <audio controls>
          <source
            src={`${process.env.NEXT_PUBLIC_BACKEN_URL}${file.filePath}`}
            type={file.fileType}
          />
          Your browser does not support the audio element.
        </audio>
      );
    }

    if (file.fileType.startsWith("video/")) {
      return (
        <video controls className="w-80 h-auto rounded-md">
          <source
            src={`${process.env.NEXT_PUBLIC_BACKEN_URL}${file.filePath}`}
            type={file.fileType}
          />
        </video>
      );
    }
    return (
      <a
        href={`${process.env.NEXT_PUBLIC_BACKEN_URL}${file.filePath}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-white"
      >
        <FaFileAlt className="text-white text-xl" />
        <span className="truncate">{file.filename}</span>
      </a>
    );
  };

  return (
    <>
      <div
        className={`flex flex-col ${
          isSentByCurrentUser ? "items-end" : "items-start"
        } mb-2`}
      >
        <div
          className={`p-3 max-w-xs rounded-lg ${
            isSentByCurrentUser
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {message.type === "text" ? (
            <p>{message.text}</p>
          ) : (
            message.files?.map((file: any, index: number) => (
              <div key={index}>{getFileContent(file)}</div>
            ))
          )}
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <span className="text-xs text-gray-500">
            {format(new Date(message?.sendTime), "p")}
          </span>

          {isSentByCurrentUser && (
            <span className="text-xs text-white">
              {message.isSeen === true ? (
                <FaCheckDouble className="text-blue-950" />
              ) : (
                <FaCheck className="text-red-800" />
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
