"use client";
import Image from "next/image";
import docsIcon from "@/../public/icons/docs.png";
import { useRouter } from "next/navigation";

const TableRow = ({ data }) => {
  // console.log("Data from table row",data);
  const router = useRouter();
  return (
    <tr
      className="border-b border-b-gray-500 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        router.push(`documents/${data.documentId}`);
      }}
    >
      <td>
        <Image src={docsIcon} height={20} width={20} alt="doc icon" />
      </td>
      <td className="py-3">{data?.name}</td>
      <td>{data?.author}</td>
      <td>{data?.owners.join(", ")}</td>
    </tr>
  );
};
export default TableRow;
