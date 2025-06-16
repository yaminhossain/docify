import CreateAndJoinDocument from "./components/CreateAndJoinDocument/CreateAndJoinDocument";
import docsIcon from "@/../public/icons/docs.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen">
      {/* =====================Create and Join document section================== */}
      <div className="h-2/5 bg-gray-100 flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl">Start Writing a Document</h1>
        <p className="max-w-1/4 text-center">
          Create fully new document or Join in an existing shared document by
          pasting the room key of a document
        </p>
        <CreateAndJoinDocument></CreateAndJoinDocument>
      </div>
      {/* =====================Recent documents section========================== */}
      <div className="max-w-7xl w-full m-auto">
        <h1 className="mt-3 mb-7 text-xl font-semibold text-gray-800">
          Recent documents
        </h1>
        <table className="w-full table-auto">
          <tbody>
            <tr className="border-b border-b-gray-500">
              <th></th>
              <th className="text-start py-2">Name</th>
              <th className="text-start">Owner</th>
              <th className="text-start">Shared owners</th>
            </tr>
            <tr className="border-b border-b-gray-500 hover:bg-gray-100 cursor-pointer">
              <td>
                <Image src={docsIcon} height={20} width={20} alt="doc icon" />
              </td>
              <td className="py-3">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td>Yamin Hossain</td>
              <td>Yamin, Hossain</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
