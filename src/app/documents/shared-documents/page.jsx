import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";
import getSharedDocuments from "@/lib/getSharedDocuments";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Docify | Shared Documents",
  description: "Best document editor ever",
};

const SharedDocumentsPage = async () => {
  const sessionData = await getServerSession(authOptions);
  const sharedDocuments = await getSharedDocuments(sessionData?.user?.email, 0);
  return (
    <div className="bg-indigo-100 min-h-screen py-5">
      <div className="min-h-[50vh] max-w-7xl mx-auto p-4 mb-4 bg-white rounded-lg shadow">
        <h1 className="font-bold text-gray-700 text-xl mb-4">
          Shared Documents
        </h1>
        <DocumentsTable documentsData={sharedDocuments}></DocumentsTable>
      </div>
    </div>
  );
};

export default SharedDocumentsPage;
