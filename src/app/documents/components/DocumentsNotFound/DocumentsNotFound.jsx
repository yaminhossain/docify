import documentsNotFound from "@/../public/images/documentsNotFound.jpg";
import Image from "next/image";

const DocumentsNotFound = () => {
  return (
    <div>
      <h6 className="text-center text-3xl">
        No documents Found. Add some documents!
      </h6>
      <div className="relative mx-auto w-1/3 h-96">
        <Image
          src={documentsNotFound}
          fill
          alt="Now documents found"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-center object-contain"
        ></Image>
      </div>
    </div>
  );
};

export default DocumentsNotFound;
