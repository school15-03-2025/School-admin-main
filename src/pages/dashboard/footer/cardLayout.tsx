import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CardLayouts = ({ title }: any) => {
  const [htmlData, setHtmlData] = useState("");

  const handleContentChange = (value: any) => {
    setHtmlData(value);
  };

  return (
    <div className="card py-5 pt-0">
      <h2 className="text-2xl text-center font-medium mb-8 poppins-bold text-black-700">
        {title}
      </h2>
      <div className="w-full inline-block">
        <label htmlFor="description" className="w-full block">
          Description
        </label>
        {typeof window !== "undefined" && ReactQuill ? (
          <ReactQuill
            value={htmlData}
            onChange={handleContentChange}
            theme="snow"
            style={{ height: "500px" }}
            placeholder="Start typing here..."
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                [{ color: [] }, { background: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "bold",
              "italic",
              "underline",
              "list",
              "bullet",
              "link",
              "image",
              "color",
              "background",
            ]}
          />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
    </div>
  );
};

export default CardLayouts;
