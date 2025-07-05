"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const TextEditor = ({ documentId }) => {
  const wrapperRef = useRef(null);
  const [quillLoaded, setQuillLoaded] = useState(false);
  const [quill, setQuill] = useState(null);
  const [socket, setSocket] = useState(null);

  // ======================socket.io setup======================
  useEffect(() => {
    const socketInstance = io("https://docify-server.onrender.com/");
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  
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
      quillInstance.disable();
      quillInstance.setText("Loading");
      setQuill(quillInstance);
    };
    loadQuill();
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = "";
      }
    };
  }, []);

  // ==============Handling Quill Delta and Sending delta to server=============
  useEffect(() => {
    if (quill === null || socket === null) return;
    const deltaHandler = (delta, oldDelta, source) => {
      // ensures the change are made only by user
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill?.on("text-change", deltaHandler);
    return () => {
      quill?.off("text-change", deltaHandler);
    };
  }, [quill, socket]);

  // ============updating incoming data from server to the editor==============
  useEffect(() => {
    if (quill === null || socket === null) return;
    const updateContentHandler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", updateContentHandler);
    return () => {
      socket.off("receive-changes", updateContentHandler);
    };
  }, [quill, socket]);

  // =====Working with individual document room based on documentId and load individual document=============
  useEffect(() => {
    if (socket === null || quill === null) return;
    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });
    socket.emit("get-document", documentId);
  }, [quill, socket, documentId]);

  // ======================Saving document data to the database=================
  useEffect(() => {
    if (socket === null || quill === null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000); // save the document with every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);
  return (
    <div>
      <div className="editorContainer bg-gray-100" ref={wrapperRef}></div>
      {!quillLoaded && <p>Loading editor...</p>}
    </div>
  );
};

export default TextEditor;

