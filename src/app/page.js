import CreateAndJoinDocument from "./components/CreateAndJoinDocument/CreateAndJoinDocument";
import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";

export default function Home() {
  return (
    <div className="h-screen">
      {/* =====================Create and Join document section================== */}
      <div className="h-2/5 bg-gray-100 flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl">Start Writing a Document</h1>
        <p className="max-w-1/4 text-center">
          Create fully new document or Open an Existing Document.
        </p>
        <CreateAndJoinDocument></CreateAndJoinDocument>
      </div>
      {/* =====================Recent documents section========================== */}
      <div className="max-w-7xl w-full m-auto">
        <h1 className="mt-3 mb-7 text-xl font-semibold text-gray-800">
          Recent documents
        </h1>
        <DocumentsTable></DocumentsTable>
      </div>
    </div>
  );
}
