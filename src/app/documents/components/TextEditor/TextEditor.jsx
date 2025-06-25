"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const TextEditor = () => {
  const wrapperRef = useRef(null);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [quill, setQuill] = useState(null);
  const [socket, setSocket] = useState(null);

  // ======================socket.io setup======================
  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // ==============Quill Delta===============
  const deltaHandler = useCallback(
    // using useCallback to avoid unnecessary function re creation
    (delta, oldDelta,source) => {
      if (source === "user") {
        socket.emit("send-changes",delta)
      }
    },
    [socket]
  );

  // ====================Quill Editor Setup=====================
  useEffect(() => {
    // Ensure ref is available
    if (wrapperRef.current === null) {
      return;
    }

    const loadQuill = async () => {
      //Using JavaScript Dynamic import
      const Quill = (await import("quill")).default;

      // toolbar options
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
      // Clear the wrapper before appending the editor
      wrapperRef.current.innerHTML = "";
      const editor = document.createElement("div");
      wrapperRef.current.append(editor);
      const quillInstance = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
      });
      setQuillLoaded(true);
      setQuill(quillInstance);

      // ----------------------Quill text-change event for working with delta-----------------
      quillInstance.on("text-change", deltaHandler);
    };
    loadQuill();

    // useEffect cleanup
    return () => {
      if (quill) {
        quill?.off("text-change", deltaHandler);
      }
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = "";
      }
    };
  }, [deltaHandler]);

  return (
    <div>
      <div className="editorContainer bg-gray-100" ref={wrapperRef}></div>
      {!quillLoaded && <p>Loading editor...</p>}
    </div>
  );
};

export default TextEditor;
