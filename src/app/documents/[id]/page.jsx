import connectDB, { collectionNames } from "@/lib/connectDB";
import Image from "next/image";
import docIcon from "@/../public/icons/docs.png";
import TextEditor from "../components/TextEditor/TextEditor";
import DocumentShareButton from "../components/DocumentShareButton/DocumentShareButton";

const SingleDocumentPage = async ({ params }) => {
  const { id } = await params;

  //=======Database Tasks=========
  const collection = connectDB(collectionNames.DOCUMENTS);
  const document = await collection.findOne({ documentId: id });
  console.log(document);

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
          <DocumentShareButton docName={document?.name} docID={id}></DocumentShareButton>
          <p className="text-gray-700 mt-1">Owners:{document?.author}</p>
        </div>
      </div>
      {/* =========document editor========= */}
      <TextEditor documentId={id}></TextEditor>
    </div>
  );
};

export default SingleDocumentPage;
