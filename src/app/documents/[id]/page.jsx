import connectDB, { collectionNames } from "@/lib/connectDB";
import Image from "next/image";
import docIcon from "@/../public/icons/docs.png";
import { LuShare2 } from "react-icons/lu";
import TextEditor from "../components/TextEditor/TextEditor";

const SingleDocumentPage = async ({ params }) => {
  const { id } = await params;

  //=======Database Tasks=========
  const collection = connectDB(collectionNames.DOCUMENTS);
  const document = await collection.findOne({ documentId: id });

  return (
    <div>
      {/* ===========document options========== */}
      <div className="bg-white flex justify-between p-3">
        <div className="flex gap-1 justify-center items-center">
          <div className="relative size-9">
            <Image src={docIcon} fill alt="document icon" />
          </div>
          <p className="text-2xl font-medium">{document.name}</p>
        </div>
        <div>
          <button className="py-2 px-5 bg-indigo-300 hover:bg-indigo-400 rounded-full flex gap-2 items-center justify-center font-semibold cursor-pointer justify-self-end">
            Share
            <LuShare2 />
          </button>
          <p className="text-gray-700 mt-1">Owners:{document?.author}</p>
        </div>
      </div>
      {/* =========document editor========= */}
      <div className="bg-indigo-100 min-h-screen">
        <TextEditor></TextEditor>
      </div>
    </div>
  );
};

export default SingleDocumentPage;
