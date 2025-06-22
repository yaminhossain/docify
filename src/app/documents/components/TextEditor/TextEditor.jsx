"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const wrapperRef = useRef(null);
  const [quillLoaded, setQuillLoaded] = useState(false);
  useEffect(() => {
    const loadQuill = async () => {
      const Quill = (await import("quill")).default; //JavaScript Dynamic import
      console.log("Inside useEffect");
      const editor = document.createElement("div");
      wrapperRef.current.innerHTML = ""; 
      wrapperRef.current.append(editor);
      new Quill(editor, { theme: "snow" });
      setQuillLoaded(true);
    };
    loadQuill();

    // useEffect cleanup
    return () => {
      wrapperRef.innerHTML = "";
    };
  }, []);
  return (
    <div>
      <div id="container" ref={wrapperRef}></div>
      {!quillLoaded && <p>Loading editor...</p>}
    </div>
  );
};

export default TextEditor;
