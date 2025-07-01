import Image from "next/image";
import docsIcon from "@/../public/icons/docs.png";
import DocumentsNotFound from "@/app/documents/components/DocumentsNotFound/DocumentsNotFound";

const DocumentsTable = ({ documentsData }) => {
  console.log("Documents table", documentsData);
  return (
    <>
      {documentsData.length>0 ? (
        <table className="w-full table-auto">
          <tbody>
            <tr className="border-b border-b-gray-500">
              <th></th>
              <th className="text-start py-2">Name</th>
              <th className="text-start">Owner</th>
              <th className="text-start">Shared owners</th>
            </tr>
            {documentsData.map((document) => (
              <TableRow key={document._id} data={document}></TableRow>
            ))}
          </tbody>
        </table>
      ) : (
        <DocumentsNotFound></DocumentsNotFound>
      )}
    </>
  );
};
export default DocumentsTable;

// ================================Each Row=======================
const TableRow = ({ data }) => {
  return (
    <tr className="border-b border-b-gray-500 hover:bg-gray-100 cursor-pointer">
      <td>
        <Image src={docsIcon} height={20} width={20} alt="doc icon" />
      </td>
      <td className="py-3">{data?.name}</td>
      <td>{data?.author}</td>
      <td>{data?.owners.join(", ")}</td>
    </tr>
  );
};
