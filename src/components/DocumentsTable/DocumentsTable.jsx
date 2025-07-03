import DocumentsNotFound from "@/app/documents/components/DocumentsNotFound/DocumentsNotFound";
import TableRow from "./TableRow";

const DocumentsTable = ({ documentsData }) => {
  console.log("Documents table", documentsData);

  return (
    <>
      {documentsData.length > 0 ? (
        <table className="w-full table-auto">
          <tbody>
            <tr className="border-b border-b-gray-500">
              <th></th>
              <th className="text-start py-2">Name</th>
              <th className="text-start">Owner</th>
              <th className="text-start">Shared owners</th>
            </tr>
            {documentsData.map((document) => {
              document._id = document._id.toString();
              return <TableRow key={document._id} data={document}></TableRow>;
            })}
          </tbody>
        </table>
      ) : (
        <DocumentsNotFound></DocumentsNotFound>
      )}
    </>
  );
};
export default DocumentsTable;
