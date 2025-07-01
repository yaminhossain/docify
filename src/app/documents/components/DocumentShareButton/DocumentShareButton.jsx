"use client";
import shareDocWithUser from "@/lib/shareDocWithUser";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";
import { RiUserSearchLine } from "react-icons/ri";

const DocumentShareButton = ({ docName, docID }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sharedOwnerEmail, setSharedOwnerEmail] = useState("");
  const [databaseResponseForSharedUser, setDatabaseResponseForSharedUser] =
    useState();
  const [isLoading, setIsLoading] = useState(false);

  const dropDownRef = useRef(null);

  // handling dropdown visibility
  const showDropDown = () => {
    setIsVisible(!isVisible);
  };

  // Closing the dropdown menu while clicking outside
  useEffect(() => {
    const closeDropDown = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", closeDropDown);
    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  // send shared user email to the server for searching
  const sendEmail = async () => {
    setIsLoading(true);
    const result = await shareDocWithUser(sharedOwnerEmail, docID);
    setIsLoading(false);
    setDatabaseResponseForSharedUser(result);
  };
  return (
    <div className="relative" ref={dropDownRef}>
      <button
        className="py-2 px-5 bg-indigo-300 hover:bg-indigo-400 rounded-full flex gap-2 items-center justify-center font-semibold cursor-pointer justify-self-end"
        onClick={showDropDown}
      >
        Share
        <LuShare2 />
      </button>
      <div
        className={`w-96 bg-white shadow-md absolute right-0 z-10 transition-transform rounded-md p-4 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
      >
        <p className="text-2xl">Share '{docName}'</p>
        <input
          type="email"
          className="w-full border border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-4"
          placeholder="Add people by their email "
          onChange={(e) => setSharedOwnerEmail(e.target.value.trim())}
        />
        {isLoading ? (
          <p>Searching...</p>
        ) : databaseResponseForSharedUser ? (
          <>
            {databaseResponseForSharedUser.modifiedCount > 0 ? (
              <p className="text-green-400 flex items-center gap-2">
                <FaRegCircleCheck />
                <span>User added successfully</span>
              </p>
            ) : (
              <p className="text-amber-400 flex items-center gap-2">
                <RiUserSearchLine />
                <span>Already shared with this user</span>
              </p>
            )}
          </>
        ) : (
          <p className="text-red-400 flex items-center gap-2">
            <FaRegCircleXmark />
            <span>User does not exist</span>
          </p>
        )}

        <button
          className="py-2 px-5 mt-4 bg-indigo-300 hover:bg-indigo-400 rounded-full flex gap-2 items-center justify-center font-semibold cursor-pointer justify-self-end"
          onClick={sendEmail}
        >
          Send
          {isLoading ? <FiLoader /> : <IoIosSend />}
        </button>
      </div>
    </div>
  );
};

export default DocumentShareButton;
