import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";

const MyDocumentsPage = () => {
  return (
     <div className="bg-indigo-100 min-h-screen py-5">
      <div className="min-h-[50vh] max-w-7xl mx-auto p-4 mb-4 bg-white rounded-lg shadow">
        <h1 className="font-bold text-gray-700 text-xl mb-4">My Documents</h1>
        <DocumentsTable></DocumentsTable>
        <DocumentsTable></DocumentsTable>
        <DocumentsTable></DocumentsTable>
        <DocumentsTable></DocumentsTable>
        <DocumentsTable></DocumentsTable>
      </div>
    </div>
  );
};

export default MyDocumentsPage;