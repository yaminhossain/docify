import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";
import getMyDocuments from "@/lib/getMyDocuments";
import { getServerSession } from "next-auth";

const MyDocumentsPage = async() => {
  const sessionData = await getServerSession(authOptions);
  const myDocuments = await getMyDocuments(sessionData?.user?.email, 0);
  return (
     <div className="bg-indigo-100 min-h-screen py-5">
      <div className="min-h-[50vh] max-w-7xl mx-auto p-4 mb-4 bg-white rounded-lg shadow">
        <h1 className="font-bold text-gray-700 text-xl mb-4">My Documents</h1>
        <DocumentsTable documentsData={myDocuments}></DocumentsTable>
      </div>
    </div>
  );
};

export default MyDocumentsPage;