"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const wrapperRef = useRef(null);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [quill, setQuill] = useState();

  // ====================Quill Editor Setup=====================
  useEffect(() => {
    const loadQuill = async () => {
      const Quill = (await import("quill")).default; //Using JavaScript Dynamic import
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
      ];
      const editor = document.createElement("div");
      wrapperRef.current.innerHTML = "";
      wrapperRef.current.append(editor);
      const quillInstance = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
      });
      setQuillLoaded(true);
      setQuill(quillInstance);
    };
    loadQuill();

    // useEffect cleanup
    return () => {
      wrapperRef.innerHTML = "";
    };
  }, []);

  // ==============Quill Delta===============
  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source == "api") {
          console.log("An API call triggered this change.");
        } else if (source == "user") {
          console.log("A user action triggered this change.", delta);
        }
      });
    }
  }, [quill]);
  return (
    <div>
      <div className="editorContainer bg-gray-100" ref={wrapperRef}></div>
      {!quillLoaded && <p>Loading editor...</p>}
    </div>
  );
};

export default TextEditor;
