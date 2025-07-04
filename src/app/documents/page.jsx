import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";
import getMyDocuments from "@/lib/getMyDocuments";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getSharedDocuments from "@/lib/getSharedDocuments";

export const metadata = {
  title: "Docify | Documents",
  description: "Best document editor ever",
};

const DocumentsPage = async () => {
  const sessionData = await getServerSession(authOptions);
  const myDocuments = await getMyDocuments(sessionData?.user?.email, 10);
  const sharedDocuments = await getSharedDocuments(
    sessionData?.user?.email,
    10
  );

  return (
    <div className="bg-indigo-100 min-h-screen py-5">
      {/* ==========My Documents========== */}
      <div className="h-[50vh] max-w-7xl mx-auto p-4 mb-4 bg-white rounded-lg shadow relative overflow-hidden">
        <h1 className="font-bold text-gray-700 text-xl mb-4">My Documents</h1>
        <DocumentsTable documentsData={myDocuments}></DocumentsTable>
        {/* -----Show All button----- */}
        {myDocuments.length > 0 && (
          <div className="absolute bottom-0 py-4 bg-linear-to-t from-white to-white/50 w-full flex justify-center">
            <Link href={"/documents/my-documents"}>
              <button className="py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
                Show All
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* ==========Shared Documents========== */}
      <div className="h-[50vh] max-w-7xl mx-auto p-4 bg-white rounded-lg shadow relative overflow-hidden">
        <h1 className="font-bold text-gray-700 text-xl mb-4">
          Shared Documents
        </h1>
        <DocumentsTable documentsData={sharedDocuments}></DocumentsTable>
        {/* -----Show All button----- */}
        {sharedDocuments.length > 0 && (
          <div className="absolute bottom-0 py-4 bg-linear-to-t from-white to-white/50 w-full flex justify-center">
            <Link href={"/documents/shared-documents"}>
              <button className="py-2 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
                Show All
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
