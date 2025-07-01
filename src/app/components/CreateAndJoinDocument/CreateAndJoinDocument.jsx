"use client";

import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CreateAndJoinDocument = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");

  const router = useRouter();
  const userData = useSession();
  const userEmail = userData?.data?.user?.email;

  const documentNameInputHandler = (e) => {
    setDocumentName(e.target.value);
  };

  const newDocumentCreationHandler = () => {
    if (documentName) {
      const documentId = uuidv4();
      const document = {
        name: documentName,
        documentId,
        data: "",
        author: userEmail,
        owners: [],
        created: new Date(),
      };
      // console.log(document);
      axios
        .post("https://docify-server.onrender.com/documents", document)
        .then((data) => {
          if (data?.data?.insertedId) {
            router.push(`/documents/${documentId}`);
          }
        });
    }
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="bg-white w-[600px] p-4 rounded-xl">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="ms-auto block text-xl text-gray-700 cursor-pointer"
          >
            <IoCloseCircleOutline />
          </button>
          <p className="text-xl text-gray-700 font-semibold">
            New document name
          </p>
          <input
            type="text"
            name="documentName"
            className="border border-gray-500 w-full my-4 rounded-md p-2 focus:outline-0"
            onBlur={documentNameInputHandler}
          />
          <div className="flex justify-end gap-2">
            <button
              className="border border-indigo-500 py-2 px-4 rounded-full text-gray-700 cursor-pointer hover:bg-indigo-500 hover:text-white"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Cancel
            </button>
            <button
              className="flex justify-center items-center gap-1 bg-indigo-500 py-2 px-4 rounded-full text-white cursor-pointer hover:bg-indigo-600"
              onClick={newDocumentCreationHandler}
            >
              <IoIosAddCircleOutline /> Create
            </button>
          </div>
        </div>
      </Modal>

      {/* =======================Modal Ends HERE========================== */}

      <div className="max-w-2/4 w-full flex gap-2">
        <Link
          className="border border-indigo-500 bg-white hover:bg-indigo-500 hover:text-white transition p-5 rounded-full cursor-pointer flex-1 text-center"
          href={"/documents"}
        >
          View All Existing Documents
        </Link>
        <button
          className="bg-indigo-500 hover:bg-indigo-400 transition text-white p-5 rounded-full cursor-pointer flex-1"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          New Document
        </button>
      </div>
    </>
  );
};

export default CreateAndJoinDocument;
