"use client"
import { useEffect} from "react";

const Modal = ({ isModalOpen, children, setIsModalOpen }) => {
  //   console.log(isModalOpen);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling again
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup function in case modal unmounts
    };
  }, [isModalOpen]);
  return (
    <div
      onClick={setIsModalOpen}
      className={`${
        isModalOpen
          ? "h-dvh w-full fixed inset-0 z-50 bg-black/50 flex flex-col justify-center items-center"
          : "hidden"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
